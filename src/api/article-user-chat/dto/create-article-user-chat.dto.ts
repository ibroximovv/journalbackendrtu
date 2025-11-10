import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateArticleUserChatDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    toId: number
}
