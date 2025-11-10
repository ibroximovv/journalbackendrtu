import { Injectable } from '@nestjs/common';
import { CreateReferenceArticleDto } from './dto/create-reference-article.dto';
import { UpdateReferenceArticleDto } from './dto/update-reference-article.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReferenceArticleService extends BaseService<PrismaService['referenceArticle'], CreateReferenceArticleDto, UpdateReferenceArticleDto> {
  constructor(readonly prsima: PrismaService) {
    super(prsima, 'referenceArticle')
  }
}
