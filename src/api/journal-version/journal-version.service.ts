import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJournalVersionDto } from './dto/create-journal-version.dto';
import { UpdateJournalVersionDto } from './dto/update-journal-version.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JournalVersionService extends BaseService<PrismaService['journalVersion'], CreateJournalVersionDto, UpdateJournalVersionDto> {
  constructor(readonly prsima: PrismaService) {
    super(prsima, 'journalVersion')
  }
  async createWithUser(createJournalVersionDto: CreateJournalVersionDto, req: Request) {
    try {
      const findone = await this.prsima.journalVersion.findFirst({
        where: {
          journalId: createJournalVersionDto.journalId,
          articleId: createJournalVersionDto.articleId
        }
      })

      if (findone) throw new BadRequestException('Journal version already exists')
      const create = await this.prsima.journalVersion.create({
        data: {
          ...createJournalVersionDto,
          userId: req['user'].id
        }
      })

      await this.prsima.article.update({
        where: {
          id: createJournalVersionDto.articleId
        },
        data: {
          status: 'PUBLISHED'
        }
      })

      return {
        statusCode: 201,
        message: 'Journal version created successfully',
        data: create
      }
    } catch (error) {
      if(error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error!')
    }
  }
}
