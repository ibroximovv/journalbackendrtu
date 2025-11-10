import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticleAuthorService } from './article-author.service';
import { CreateArticleAuthorDto } from './dto/create-article-author.dto';
import { UpdateArticleAuthorDto } from './dto/update-article-author.dto';
import { GetArticleAuthorDto } from './dto/get-article-author.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('article-author')
export class ArticleAuthorController {
  constructor(private readonly articleAuthorService: ArticleAuthorService) { }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleAuthorDto: CreateArticleAuthorDto) {
    return this.articleAuthorService.create(createArticleAuthorDto);
  }

  @Get()
  findAll(@Query() query: GetArticleAuthorDto) {
    const dto = Object.assign(new GetArticleAuthorDto(), query);
    return this.articleAuthorService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleAuthorService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleAuthorDto: UpdateArticleAuthorDto) {
    return this.articleAuthorService.update(id, updateArticleAuthorDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleAuthorService.remove(id);
  }
}
