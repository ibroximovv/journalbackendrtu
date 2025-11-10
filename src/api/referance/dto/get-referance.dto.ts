import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetReferenceDto extends OmitType(PaginationQueryDto, ['role', 'articleStatus']){}