import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAdminAuthDto } from '../auth/dto/createAdmin-auth.dto';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService extends BaseService<PrismaService['user'], CreateAdminAuthDto, UpdateUserDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'user')
  }
  async createAdmin(createAdminDto: CreateAdminAuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: createAdminDto.email },
            { phoneNumber: createAdminDto.phoneNumber },
            { username: createAdminDto.username }
          ]
        }
      })
      if (user) throw new BadRequestException('User already exists')
      const hashedPassword = BcryptEncryption.encrypt(createAdminDto.password)
      const admin = await this.prisma.user.create({
        data: {
          ...createAdminDto,
          password: hashedPassword
        }
      })
      return admin
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Something went wrong')
    }
  }

  async updateUser(id: number, updateAdminDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } })
      if (!user) throw new NotFoundException('User not found')
      let hashedPassword = user.password
      if (updateAdminDto.password) {
        hashedPassword = BcryptEncryption.encrypt(updateAdminDto.password)
      }
      const admin = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateAdminDto,
          password: hashedPassword
        }
      })
      return admin
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Something went wrong')
    }
  }

  async getMe(req: Request) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: req['user'].id }, include: {articleComments: true, articles: true, journals: true, journalVersions: true, references: true, receivedChatMessages: true, receivedChats: true, sentChatMessages: true, sentChats: true} })
      if (!user) throw new NotFoundException('User not found')
      return user
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Something went wrong')
    }
  }

  
}
