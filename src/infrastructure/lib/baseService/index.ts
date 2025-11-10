import { NotFoundException } from '@nestjs/common';
import { IDatabaseService } from 'src/common/interfaces/database.interface';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';

interface BaseOptions {
  where?: Record<string, any>;
  include?: Record<string, any>;
  select?: Record<string, any>;
  defaultSearchFields?: string[];
  orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface BaseResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
}

export abstract class BaseService<
  ModelType extends {
    create: any;
    findMany: any;
    findFirst: any;
    update: any;
    delete: any;
    count: any;
  },
  CreateDto = any,
  UpdateDto = any
> {
  constructor(
    protected readonly db: IDatabaseService,
    protected readonly modelName: string,
  ) { }

  protected get model(): ModelType {
    return this.db.getModel<ModelType>(this.modelName);
  }

  protected async beforeCreate?(data: CreateDto): Promise<void>;
  protected async afterCreate?(data: any): Promise<void>;

  async create(data: CreateDto): Promise<BaseResponse> {
    await this.beforeCreate?.(data);
    const created = await this.model.create({ data });
    await this.afterCreate?.(created);
    return { statusCode: 201, message: 'success', data: created };
  }

  async findAll(query: Record<string, any>, options?: BaseOptions): Promise<BaseResponse> {
    try {
      const cleanedQuery = new PaginationQueryDto();
      Object.assign(cleanedQuery, query);

      const finalQuery = cleanedQuery.clean();
      const page = Number(finalQuery.page) || 1;
      const limit = Number(finalQuery.limit) || 10;
      const skip = (page - 1) * limit;

      const where: Record<string, any> = { ...(options?.where || {}) };

      if (finalQuery.search) {
        const fields =
          finalQuery.searchFields?.split(',').map(f => f.trim()).filter(Boolean) ||
          options?.defaultSearchFields ||
          [];

        if (fields.length > 0) {
          where.OR = fields.map(field => ({
            [field]: { contains: finalQuery.search, mode: 'insensitive' },
          }));
        }
      }

      if (finalQuery.searchById) {
        Object.entries(finalQuery.searchById).forEach(([key, value]) => {
          const numValue = Number(value);
          if (!isNaN(numValue)) where[key] = numValue;
        });
      }

      let orderBy: Array<Record<string, 'asc' | 'desc'>> | Record<string, 'asc' | 'desc'>;
      const sortBy = finalQuery.sortBy || 'createdAt';
      const sortOrder = finalQuery.sortOrder || 'desc';

      if (sortBy.includes(',')) {
        const fields = sortBy.split(',');
        const orders = (sortOrder as string).split(',');
        orderBy = fields.map((f, i) => ({
          [f]: (orders[i] as 'asc' | 'desc') || 'desc',
        }));
      } else {
        orderBy = { [sortBy]: sortOrder };
      }

      const [data, total] = await this.db.$transaction<[any[], number]>([
        this.model.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: options?.include,
          select: options?.select,
        }),
        this.model.count({ where }),
      ]);

      return { statusCode: 200, message: 'success', total, page, limit, data };
    } catch (error: any) {
      throw new Error(`Error fetching ${this.modelName}: ${error.message}`);
    }
  }


  async findOne(id: number): Promise<BaseResponse> {
    const data = await this.model.findFirst({ where: { id } });
    if (!data) throw new NotFoundException(`${this.modelName} not found`);
    return { statusCode: 200, message: 'success', data };
  }

  async update(id: number, data: UpdateDto): Promise<BaseResponse> {
    const exists = await this.model.findFirst({ where: { id } });
    if (!exists) throw new NotFoundException(`${this.modelName} not found`);
    const updated = await this.model.update({ where: { id }, data });
    return { statusCode: 200, message: 'success', data: updated };
  }

  async remove(id: number): Promise<BaseResponse> {
    const exists = await this.model.findFirst({ where: { id } });
    if (!exists) throw new NotFoundException(`${this.modelName} not found`);
    const deleted = await this.model.delete({ where: { id } });
    return { statusCode: 200, message: 'deleted', data: deleted };
  }
}
