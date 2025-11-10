import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CategoryService extends BaseService<PrismaService['category'], CreateCategoryDto, UpdateCategoryDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'category')
  }
}
