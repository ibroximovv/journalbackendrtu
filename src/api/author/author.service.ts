import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthorService extends BaseService<PrismaService['author'], CreateAuthorDto, UpdateAuthorDto>{
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'author')
  }
}
