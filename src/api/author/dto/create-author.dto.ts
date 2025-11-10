import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    fullName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;
}