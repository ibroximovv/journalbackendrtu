import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ArticleUserChatService } from './article-user-chat.service';
import { CreateArticleUserChatDto } from './dto/create-article-user-chat.dto';
import { UpdateArticleUserChatDto } from './dto/update-article-user-chat.dto';
import { GetArticleUserChatDto } from './dto/get-article-user-chat.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('article-user-chat')
export class ArticleUserChatController {
  constructor(private readonly articleUserChatService: ArticleUserChatService) {}

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleUserChatDto: CreateArticleUserChatDto, @Req() req: Request) {
    return this.articleUserChatService.createWithUser(createArticleUserChatDto, req);
  }

  @Get()
  findAll(@Query() query: GetArticleUserChatDto) {
    const dto = Object.assign(new GetArticleUserChatDto(), query)
    return this.articleUserChatService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleUserChatService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleUserChatDto: UpdateArticleUserChatDto) {
    return this.articleUserChatService.update(id, updateArticleUserChatDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleUserChatService.remove(id);
  }
}
