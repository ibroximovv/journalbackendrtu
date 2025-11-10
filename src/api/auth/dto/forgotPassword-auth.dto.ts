import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty({ example: 'email@example.com' })
    @IsEmail()
    email: string   

    @ApiProperty({ example: '+998999999999' })
    @IsPhoneNumber()
    phoneNumber: string

    @ApiProperty({ example: 'newPassword' })
    @IsString()
    password: string
}