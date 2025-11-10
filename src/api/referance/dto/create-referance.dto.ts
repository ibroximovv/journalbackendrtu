import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsUrl } from 'class-validator';

export class CreateReferenceDto {
    @ApiProperty({
        example: 'Deep Learning for Natural Language Processing',
        description: 'Manba matni (unique bo‘lishi kerak)',
    })
    @IsString()
    referenceText: string;

    @ApiPropertyOptional({
        example: 'https://example.com',
        description: 'Agar mavjud bo‘lsa, manba veb-sayti URL manzili',
        required: false
    })
    @IsOptional()
    @IsUrl()
    webSiteUrl?: string;

    @ApiPropertyOptional({
        example: 'https://example.com/reference.pdf',
        description: 'Agar mavjud bo‘lsa, manba faylining URL manzili',
        required: false
    })
    @IsOptional()
    @IsUrl()
    fileUrl?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Manba faolligini bildiradi (default: true)',
        required: false
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        example: '10.1000/xyz456',
        description: 'DOI (Digital Object Identifier)',
        required: false
    })
    @IsOptional()
    @IsString()
    doi?: string;
}
