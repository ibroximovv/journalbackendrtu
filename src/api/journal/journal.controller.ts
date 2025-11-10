import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { Request } from 'express';
import { GetJournalDto } from './dto/get-journal.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { UserRoleEnum } from '@prisma/client';
import { RolesGuard } from 'src/guard/roles/roles.guard';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJournalDto: CreateJournalDto, @Req() req: Request) {
    return this.journalService.createJournal(createJournalDto, req);
  }

  @Get()
  findAll(@Query() query: GetJournalDto) {
    const dto = Object.assign(new GetJournalDto(), query)
    return this.journalService.findAll(dto);
  }

  @Get('include-journal')
  findIncludeJournal(@Query() query: GetJournalDto) {
    const dto = Object.assign(new GetJournalDto(), query)
    return this.journalService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.journalService.findOne(id);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(id, updateJournalDto);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.journalService.remove(id);
  }
}
