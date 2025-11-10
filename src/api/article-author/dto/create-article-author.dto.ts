import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateArticleAuthorDto {
    @ApiProperty()
    @IsInt()
    articleId: number;

    @ApiProperty()
    @IsInt()
    authorId: number;

    @ApiProperty()
    @IsString()
    authorLevel: string;
}
