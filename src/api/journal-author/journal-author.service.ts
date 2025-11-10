import { Injectable } from '@nestjs/common';
import { CreateJournalAuthorDto } from './dto/create-journal-author.dto';
import { UpdateJournalAuthorDto } from './dto/update-journal-author.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class JournalAuthorService extends BaseService<PrismaService['journalAuthor'], CreateJournalAuthorDto, UpdateJournalAuthorDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'journalAuthor')
  }
}
