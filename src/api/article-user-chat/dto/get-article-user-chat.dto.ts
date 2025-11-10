import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetArticleUserChatDto extends OmitType(PaginationQueryDto, ['articleStatus', 'role']){}