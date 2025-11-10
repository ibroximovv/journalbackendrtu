import { Module } from '@nestjs/common';
import { ArticleUserChatSwaggerController } from './article-user-chat.swagger';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { ArticleUserChatMessageGateway } from './article-user-chat-message.gateway';
import { ArticleUserChatMessageService } from './article-user-chat-message.service';


@Module({
  controllers: [ArticleUserChatSwaggerController],
  providers: [ArticleUserChatMessageService, ArticleUserChatMessageGateway, PrismaService],
})
export class ArticleUserChatMessageModule {}
