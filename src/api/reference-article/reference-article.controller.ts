import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReferenceArticleService } from './reference-article.service';
import { CreateReferenceArticleDto } from './dto/create-reference-article.dto';
import { UpdateReferenceArticleDto } from './dto/update-reference-article.dto';
import { GetReferenceArticleDto } from './dto/get-reference-article.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('reference-article')
export class ReferenceArticleController {
  constructor(private readonly referenceArticleService: ReferenceArticleService) {}

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReferenceArticleDto: CreateReferenceArticleDto) {
    return this.referenceArticleService.create(createReferenceArticleDto);
  }

  @Get()
  findAll(@Query() query: GetReferenceArticleDto) {
    const dto = Object.assign(new GetReferenceArticleDto(), query);
    return this.referenceArticleService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.referenceArticleService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReferenceArticleDto: UpdateReferenceArticleDto) {
    return this.referenceArticleService.update(id, updateReferenceArticleDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.referenceArticleService.remove(id);
  }
}
