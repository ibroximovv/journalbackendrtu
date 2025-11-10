import { PartialType } from '@nestjs/swagger';
import { CreateAdminAuthDto } from 'src/api/auth/dto/createAdmin-auth.dto';

export class UpdateUserDto extends PartialType(CreateAdminAuthDto) {}
