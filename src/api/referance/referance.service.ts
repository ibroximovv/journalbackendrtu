import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateReferanceDto } from './dto/update-referance.dto';
import { CreateReferenceDto } from './dto/create-referance.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ReferanceService extends BaseService<PrismaService['reference'], CreateReferenceDto, UpdateReferanceDto>{
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'reference')
  }
  async createWithUser(createReferanceDto: CreateReferenceDto, req: Request) {    
    try {
      const referance = await this.prisma.reference.create({
        data: {
          ...createReferanceDto,
          userId: req['user'].id
        }
      })
      return {
        data: referance,
        message: 'Reference created successfully',
        statusCode: 201
      }
    } catch (error) {
      if(error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
