import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateArticleCommentDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    articleId: number;

    @ApiProperty({ example: "comment" })
    @IsString()
    comment: string;
}
