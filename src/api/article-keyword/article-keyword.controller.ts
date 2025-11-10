import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleKeywordService } from './article-keyword.service';
import { CreateArticleKeywordDto } from './dto/create-article-keyword.dto';
import { UpdateArticleKeywordDto } from './dto/update-article-keyword.dto';
import { GetArticleKeywordDto } from './dto/get-article-keyword.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('article-keyword')
export class ArticleKeywordController {
  constructor(private readonly articleKeywordService: ArticleKeywordService) {}

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleKeywordDto: CreateArticleKeywordDto) {
    return this.articleKeywordService.create(createArticleKeywordDto);
  }

  @Get()
  findAll(@Query() query: GetArticleKeywordDto) {
    const dto = Object.assign(new GetArticleKeywordDto(), query);
    return this.articleKeywordService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleKeywordService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleKeywordDto: UpdateArticleKeywordDto) {
    return this.articleKeywordService.update(id, updateArticleKeywordDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleKeywordService.remove(id);
  }
}
