import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { JournalVersionService } from './journal-version.service';
import { CreateJournalVersionDto } from './dto/create-journal-version.dto';
import { UpdateJournalVersionDto } from './dto/update-journal-version.dto';
import { Request } from 'express';
import { GetJournalVersionDto } from './dto/get-journal-version.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { UserRoleEnum } from '@prisma/client';
import { RolesGuard } from 'src/guard/roles/roles.guard';

@Controller('journal-version')
export class JournalVersionController {
  constructor(private readonly journalVersionService: JournalVersionService) {}

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJournalVersionDto: CreateJournalVersionDto, @Req() req: Request) {
    return this.journalVersionService.createWithUser(createJournalVersionDto, req);
  }

  @Get()
  findAll(@Query() query: GetJournalVersionDto) {
    const dto  = Object.assign(new GetJournalVersionDto, query)
    return this.journalVersionService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.journalVersionService.findOne(id);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateJournalVersionDto: UpdateJournalVersionDto) {
    return this.journalVersionService.update(id, updateJournalVersionDto);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.journalVersionService.remove(id);
  }
}
