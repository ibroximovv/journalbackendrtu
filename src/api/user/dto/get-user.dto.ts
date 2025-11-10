import { OmitType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';

export class GetUserDto extends OmitType(PaginationQueryDto, ['searchById', 'articleStatus'] as const) {}
