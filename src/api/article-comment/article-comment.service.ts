import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ArticleCommentService extends BaseService<PrismaService['articleComment'], CreateArticleCommentDto, UpdateArticleCommentDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'articleComment')
  }
  async createWithUser(createArticleCommentDto: CreateArticleCommentDto, req: Request) {
    try {
      const comment = await this.prisma.articleComment.create({
        data: {
          ...createArticleCommentDto,
          userId: req['user'].id
        }
      })
      
      return {
        statusCode: 201,
        message: 'Comment created successfully',
        data: comment
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal Server Error')
    }
  }

}
