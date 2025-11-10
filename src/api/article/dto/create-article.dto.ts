import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsEnum, IsDateString } from 'class-validator';
import { ArticleStatusEnum } from '@prisma/client';

export class CreateArticleDto {
  @ApiProperty({ example: 'Artificial Intelligence in Education' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '1234-5678', required: false })
  @IsOptional()
  @IsString()
  issn?: string;

  @ApiPropertyOptional({ example: 'This article explores AI impacts in education.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'AI transforms education by personalizing learning.', required: false })
  @IsOptional()
  @IsString()
  abstract?: string;

  @ApiPropertyOptional({ example: 'https://example.com/article-image.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/file.pdf', required: false })
  @IsOptional()
  @IsString()
  articleFileUrl?: string;

  @ApiPropertyOptional({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ enum: ArticleStatusEnum, example: ArticleStatusEnum.PENDING, required: false })
  @IsOptional()
  @IsEnum(ArticleStatusEnum)
  status?: ArticleStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  categoryId: number;
}
