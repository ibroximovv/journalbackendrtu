
import { PartialType } from '@nestjs/swagger';
import { CreateArticleAuthorDto } from './create-article-author.dto';

export class UpdateArticleAuthorDto extends PartialType(CreateArticleAuthorDto) {}
