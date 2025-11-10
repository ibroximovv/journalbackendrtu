import { Module } from '@nestjs/common';
import { ArticleKeywordService } from './article-keyword.service';
import { ArticleKeywordController } from './article-keyword.controller';

@Module({
  controllers: [ArticleKeywordController],
  providers: [ArticleKeywordService],
})
export class ArticleKeywordModule {}
