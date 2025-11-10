import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetArticleAuthorDto extends OmitType(PaginationQueryDto, ['search', 'role',]) {}