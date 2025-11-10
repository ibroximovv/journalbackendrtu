import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateJournalVersionDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    journalId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    articleId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    pageStart: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    pageEnd: number;

    @ApiProperty({ example: "https://example.com/image.jpg", required: false })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({ example: "https://example.com/doi", required: false })
    @IsOptional()
    @IsString()
    doi?: string;

    @ApiProperty({ example: "https://example.com/website", required: false })
    @IsOptional()
    @IsString()
    webSiteUrl?: string;

    @ApiProperty({ example: new Date(), required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    publishedDate?: Date;
}
