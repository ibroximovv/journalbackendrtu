import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ReferanceService } from './referance.service';
import { UpdateReferanceDto } from './dto/update-referance.dto';
import { CreateReferenceDto } from './dto/create-referance.dto';
import { Request } from 'express';
import { GetReferenceDto } from './dto/get-referance.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('referance')
export class ReferanceController {
  constructor(private readonly referanceService: ReferanceService) {}

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReferanceDto: CreateReferenceDto, @Req() req: Request) {
    return this.referanceService.createWithUser(createReferanceDto, req);
  }

  @Get()
  findAll(@Query() query: GetReferenceDto) {
    const dto = Object.assign(new GetReferenceDto(), query)
    return this.referanceService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.referanceService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReferanceDto: UpdateReferanceDto) {
    return this.referanceService.update(id, updateReferanceDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.referanceService.remove(id);
  }
}
