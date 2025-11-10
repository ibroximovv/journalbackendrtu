import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class SendMessageSocketDto {
  @ApiProperty({ example: 1, description: 'Xabar yuboruvchi foydalanuvchi IDsi' })
  @IsInt()
  fromId: number;

  @ApiProperty({ example: 2, description: 'Qabul qiluvchi foydalanuvchi IDsi' })
  @IsInt()
  toId: number;

  @ApiProperty({ example: 5, description: 'Chat ID' })
  @IsInt()
  chatId: number;

  @ApiProperty({ example: 'Salom, yaxshimisiz?', description: 'Xabar matni' })
  @IsString()
  message: string;
}