import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetReferenceArticleDto extends OmitType(PaginationQueryDto, ['role', 'articleStatus']) {}