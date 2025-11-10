import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class RegisterAuthDto {
    @ApiProperty({ example: 'username' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'email@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'firstName' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'lastName' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: '+998999999999' })
    @IsPhoneNumber()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    courseNumber?: number;

    @ApiProperty({ example: 'groupName', required: false })
    @IsOptional()
    @IsString()
    groupName?: string;

    @ApiProperty({ example: '@telegramUsername', required: false })
    @IsOptional()
    @IsString()
    telegramUsername?: string;

    @ApiProperty({ example: 'image', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}
