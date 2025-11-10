import { Module } from '@nestjs/common';
import { ArticleAuthorService } from './article-author.service';
import { ArticleAuthorController } from './article-author.controller';

@Module({
  controllers: [ArticleAuthorController],
  providers: [ArticleAuthorService],
})
export class ArticleAuthorModule {}
