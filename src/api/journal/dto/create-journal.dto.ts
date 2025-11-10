import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateJournalDto {
    @ApiProperty({ example: 'title' })
    @IsString()
    title: string

    @ApiProperty({ example: 'description' })
    @IsString()
    description: string

    @ApiProperty({ example: 'imageUrl', required: false })
    @IsOptional()
    @IsString()
    imageUrl?: string

    @ApiProperty({ example: 'abstract', required: false })
    @IsOptional()
    @IsString()
    abstract?: string

    @ApiProperty({ example: '2025-02-01T00:00:00Z', required: false })
    @IsOptional()
    @IsString()
    publishedDate?: string

    @ApiProperty({ example: 'issn', required: false })
    @IsOptional()
    @IsString()
    issn?: string

    @ApiProperty({ example: 'doi', required: false })
    @IsOptional()
    @IsString()
    doi?: string

    @ApiProperty({ example: 'webSiteUrl', required: false })
    @IsOptional()
    @IsString()
    webSiteUrl?: string

    @ApiProperty({ example: 'journalFileUrl', required: false })
    @IsOptional()
    @IsString()
    journalFileUrl?: string

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean
}
