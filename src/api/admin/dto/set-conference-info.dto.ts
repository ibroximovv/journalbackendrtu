import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SetConferenceInfoDto {
  @ApiProperty({ example: '11:00-11:20', description: 'Konferensiya vaqti (masalan 11:00-11:20)' })
  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}-\d{2}:\d{2}$/, { message: 'Vaqt formati noto‘g‘ri. Masalan: 11:00-11:20' })
  time: string;

  @ApiProperty({ example: 'https://zoom.us/j/123456789', description: 'Zoom linki' })
  @IsString()
  @IsNotEmpty()
  zoomUrl: string;
}
