import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateArticleKeywordDto {
    @ApiProperty({example: 1})
    @IsInt()
    articleId: number;

    @ApiProperty({example: 1})
    @IsInt()
    keywordId: number;
}
