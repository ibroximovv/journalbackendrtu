import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class getArticleDto extends OmitType(PaginationQueryDto, ['role']) {}