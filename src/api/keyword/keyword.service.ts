import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class KeywordService extends BaseService<PrismaService['keyword'], CreateKeywordDto, UpdateKeywordDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'keyword')
  }
}
