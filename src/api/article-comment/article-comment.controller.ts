import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { GetArticleCommentDto } from './dto/get-article-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('article-comment')
export class ArticleCommentController {
  constructor(private readonly articleCommentService: ArticleCommentService) { }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleCommentDto: CreateArticleCommentDto) {
    return this.articleCommentService.create(createArticleCommentDto);
  }

  @Get()
  findAll(@Query() query: GetArticleCommentDto) {
    const dto = Object.assign(new GetArticleCommentDto, query)
    return this.articleCommentService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleCommentService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleCommentDto: UpdateArticleCommentDto) {
    return this.articleCommentService.update(id, updateArticleCommentDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleCommentService.remove(id);
  }
}
