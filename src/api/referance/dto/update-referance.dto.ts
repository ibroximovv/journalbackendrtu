
import { PartialType } from '@nestjs/swagger';
import { CreateReferenceDto } from './create-referance.dto';

export class UpdateReferanceDto extends PartialType(CreateReferenceDto) {}
