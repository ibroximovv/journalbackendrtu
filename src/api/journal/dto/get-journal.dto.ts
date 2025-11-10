import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetJournalDto extends OmitType(PaginationQueryDto, ['articleStatus', 'role'] as const) {}
