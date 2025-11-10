import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ArticleService extends BaseService<PrismaService['article'], CreateArticleDto, UpdateArticleDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'article')
  }

  async createWithUser(createArticleDto: CreateArticleDto, req: Request) {
    try {
      const findone = await this.prisma.article.findFirst({
        where: {
          AND: [
            {
              title: createArticleDto.title,
              abstract: createArticleDto.abstract,
              description: createArticleDto.description,
            }
          ]
        }
      })
      if (findone) throw new BadRequestException('Article already exists')
      const data = await this.prisma.article.create({
        data: {
          ...createArticleDto,
          userId: req['user'].id
        }
      })
      return {
        data,
        message: 'Article created successfully',
        status: 201
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
