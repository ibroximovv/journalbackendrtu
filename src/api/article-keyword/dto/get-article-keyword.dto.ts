import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetArticleKeywordDto extends OmitType(PaginationQueryDto, ['role', 'articleStatus', 'search', 'searchFields']) {}