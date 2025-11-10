import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetCategoryDto extends OmitType(PaginationQueryDto, ['articleStatus', 'role', 'searchById',]) {}