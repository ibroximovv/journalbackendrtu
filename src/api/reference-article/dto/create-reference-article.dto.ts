import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateReferenceArticleDto {
    @ApiProperty({ example: 1})
    @IsInt()
    referenceId: number;

    @ApiProperty({ example: 1})
    @IsInt()
    articleId: number;
}
