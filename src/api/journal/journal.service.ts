import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { GetJournalDto } from './dto/get-journal.dto';

@Injectable()
export class JournalService extends BaseService<PrismaService['journal'], CreateJournalDto, UpdateJournalDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'journal')
  }

  async createJournal(data: CreateJournalDto, req: Request) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: req['user'].id } })
      if (!user) throw new BadRequestException('User not found')

      const findone = await this.prisma.journal.findFirst({
        where: {
          AND: [
            { title: data.title },
            { issn: data.issn },
            { description: data.description }
          ]
        }
      })

      if (findone) throw new BadRequestException('Journal already exists')

      const journal = await this.prisma.journal.create({
        data: {
          ...data,
          userId: user.id
        }
      })

      await this.prisma.journal.update({ where: { id: journal.id }, data: { quantity: journal.quantity ? journal.quantity + 1 : 1 } })

      return {
        statusCode: 201,
        message: 'Journal created successfully',
        data: journal
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal Server Error')
    }
  }

  async findMany(query: GetJournalDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder = 'asc',
    } = query;

    try {
      const skip = (page - 1) * limit;
      const take = limit;

      const where: any = search
        ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }
        : {};

      const total = await this.prisma.journal.count({ where });

      const orderBy: any = sortBy
        ? { [sortBy as string]: sortOrder }
        : { id: sortOrder };

      const data = await this.prisma.journal.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          journalVersions: { include: {
            journal: true,
            article: true,

          }},
          journalAuthors: true,
          user: true
        }
      });

      return {
        statusCode: 200,
        message: 'Journals fetched successfully',
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data,
      };
    } catch (error) {
      throw error
    }
  }

  async updateJournal(id: number, data: UpdateJournalDto, req: Request) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: req['user'].id } })
      if (!user) throw new BadRequestException('User not found')

      const findone = await this.prisma.journal.findFirst({ where: { id } })
      if (!findone) throw new BadRequestException('Journal not found')

      const journal = await this.prisma.journal.update({ where: { id }, data })

      return {
        statusCode: 200,
        message: 'Journal updated successfully',
        data: journal
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal Server Error')
    }
  }

  
}
