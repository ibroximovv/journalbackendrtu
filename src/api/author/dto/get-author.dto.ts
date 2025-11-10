import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetAuthorDto extends OmitType(PaginationQueryDto, ['searchById', 'articleStatus', 'role']) {}