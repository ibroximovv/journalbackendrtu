import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { GetKeywordDto } from './dto/get-keyword.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) { }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  findAll(@Query() query: GetKeywordDto) {
    const dto = Object.assign(new GetKeywordDto(), query);
    return this.keywordService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keywordService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordService.update(id, updateKeywordDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.keywordService.remove(id);
  }
}
