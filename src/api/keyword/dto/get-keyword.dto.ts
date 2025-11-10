import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetKeywordDto extends OmitType(PaginationQueryDto, ['articleStatus', 'role', 'searchById']) {}