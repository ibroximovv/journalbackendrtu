
import { PartialType } from '@nestjs/swagger';
import { CreateReferenceArticleDto } from './create-reference-article.dto';

export class UpdateReferenceArticleDto extends PartialType(CreateReferenceArticleDto) {}
