import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateKeywordDto {
    @ApiProperty({ example: 'keyword text' })
    @IsString()
    keywordText: string;
}
