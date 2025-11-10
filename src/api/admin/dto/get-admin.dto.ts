import { OmitType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";

export class GetAdminDto extends OmitType(PaginationQueryDto, ['articleStatus', 'searchById']){}