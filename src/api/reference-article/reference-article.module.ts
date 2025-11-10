import { Module } from '@nestjs/common';
import { ReferenceArticleService } from './reference-article.service';
import { ReferenceArticleController } from './reference-article.controller';

@Module({
  controllers: [ReferenceArticleController],
  providers: [ReferenceArticleService],
})
export class ReferenceArticleModule {}
