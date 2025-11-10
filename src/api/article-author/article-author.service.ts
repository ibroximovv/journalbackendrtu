import { Injectable } from '@nestjs/common';
import { CreateArticleAuthorDto } from './dto/create-article-author.dto';
import { UpdateArticleAuthorDto } from './dto/update-article-author.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ArticleAuthorService extends BaseService<PrismaService['articleAuthor'], CreateArticleAuthorDto, UpdateArticleAuthorDto>{
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'articleAuthor')
  }
}
