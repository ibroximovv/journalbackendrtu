import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateJournalAuthorDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    journalId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    authorId: number;

    @ApiProperty({ example: "1" })
    @IsString()
    authorLevel: string;
}
