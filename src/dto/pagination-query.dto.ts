import { ApiPropertyOptional } from "@nestjs/swagger";
import { ArticleStatusEnum, UserRoleEnum } from "@prisma/client";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsIn, IsEnum, IsInt, IsObject } from "class-validator";

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (default 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page (default 10)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Search keyword', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Comma separated searchable fields, e.g. firstName,lastName,email',
    required: false
  })
  @IsOptional()
  @IsString()
  searchFields?: string;

  @ApiPropertyOptional({ example: 'createdAt', description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort order, asc or desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    enum: ArticleStatusEnum,
    description: 'Filter by article status',
    required: false
  })
  @IsOptional()
  @IsEnum(ArticleStatusEnum)
  articleStatus?: ArticleStatusEnum;

  @ApiPropertyOptional({
    enum: UserRoleEnum,
    description: 'Filter by user role',
    required: false
  })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @ApiPropertyOptional({
    description: '{ articleId: 3, journalId: 5 } -> Dynamic ID filters, e.g. ?searchById[articleId]=3&searchById[journalId]=5',
    type: 'object',
    additionalProperties: { type: 'number' },
    example: {},
  })
  @IsOptional()
  @IsObject()
  searchById?: Record<string, number>;

  /**
   * Clean and normalize query parameters
   */
  clean() {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(this)) {
      if (value !== undefined && value !== null && value !== '') {
        if (['page', 'limit'].includes(key)) {
          result[key] = Number(value);
        } 
        else if (key === 'searchById' && typeof value === 'object') {
          const parsedIds: Record<string, number> = {};
          for (const [idKey, idValue] of Object.entries(value)) {
            const num = Number(idValue);
            if (!isNaN(num)) parsedIds[idKey] = num;
          }
          result[key] = parsedIds;
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  }
}
