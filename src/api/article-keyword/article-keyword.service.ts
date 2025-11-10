import { Injectable } from '@nestjs/common';
import { CreateArticleKeywordDto } from './dto/create-article-keyword.dto';
import { UpdateArticleKeywordDto } from './dto/update-article-keyword.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ArticleKeywordService extends BaseService<PrismaService['articleKeyword'], CreateArticleKeywordDto, UpdateArticleKeywordDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'articleKeyword')
  }
}
