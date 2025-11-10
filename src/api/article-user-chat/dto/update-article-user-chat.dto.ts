
import { PartialType } from '@nestjs/swagger';
import { CreateArticleUserChatDto } from './create-article-user-chat.dto';

export class UpdateArticleUserChatDto extends PartialType(CreateArticleUserChatDto) {}
