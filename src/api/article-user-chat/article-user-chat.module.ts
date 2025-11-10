import { Module } from '@nestjs/common';
import { ArticleUserChatService } from './article-user-chat.service';
import { ArticleUserChatController } from './article-user-chat.controller';

@Module({
  controllers: [ArticleUserChatController],
  providers: [ArticleUserChatService],
})
export class ArticleUserChatModule {}
