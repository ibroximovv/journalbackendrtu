
import { PartialType } from '@nestjs/swagger';
import { CreateArticleKeywordDto } from './create-article-keyword.dto';

export class UpdateArticleKeywordDto extends PartialType(CreateArticleKeywordDto) {}
