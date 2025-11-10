import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateArticleUserChatDto } from './dto/create-article-user-chat.dto';
import { UpdateArticleUserChatDto } from './dto/update-article-user-chat.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ArticleUserChatService extends BaseService<PrismaService['articleUserChat'], CreateArticleUserChatDto, UpdateArticleUserChatDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, 'articleUserChat')
  }

  async createWithUser(createArticleUserChatDto: CreateArticleUserChatDto, req: Request) {
    try {
      const fromUser = await this.prisma.user.findFirst({ where: { id: req['user'].id } });
      if (!fromUser) throw new BadRequestException('FromUser not found');

      const toUser = await this.prisma.user.findFirst({ where: { id: createArticleUserChatDto.toId } });
      if (!toUser) throw new BadRequestException('ToUser not found');

      const chat = await this.prisma.articleUserChat.findFirst({
        where: {
          OR: [
            { fromId: fromUser.id, toId: toUser.id },
            { fromId: toUser.id, toId: fromUser.id }
          ]
        }
      });
      if (chat) throw new BadRequestException('Chat already exists');

      const newChat = await this.prisma.articleUserChat.create({
        data: {
          fromId: fromUser.id,
          toId: toUser.id,
        }
      });

      return newChat;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal Server Error');
    }
  }
}
