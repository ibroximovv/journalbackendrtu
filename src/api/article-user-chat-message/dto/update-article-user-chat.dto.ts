import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleUserChatDto } from './create-article-user-chat.dto';

export class UpdateArticleUserChatDto extends PartialType(CreateArticleUserChatDto) {
  id: number;
}
