import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class SendOtpAuthDto {
    @ApiProperty({ example: 'email@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '+998999999999', required: false })
    @IsOptional()
    @IsPhoneNumber()
    @IsString()
    phoneNumber?: string;
}