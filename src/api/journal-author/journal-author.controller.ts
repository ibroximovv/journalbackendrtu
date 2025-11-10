import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JournalAuthorService } from './journal-author.service';
import { CreateJournalAuthorDto } from './dto/create-journal-author.dto';
import { UpdateJournalAuthorDto } from './dto/update-journal-author.dto';
import { GetJournalAuthorDto } from './dto/get-journal-author.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { UserRoleEnum } from '@prisma/client';
import { RolesGuard } from 'src/guard/roles/roles.guard';

@Controller('journal-author')
export class JournalAuthorController {
  constructor(private readonly journalAuthorService: JournalAuthorService) {}

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJournalAuthorDto: CreateJournalAuthorDto) {
    return this.journalAuthorService.create(createJournalAuthorDto);
  }

  @Get()
  findAll(@Query() query: GetJournalAuthorDto) {
    const dto = Object.assign(new GetJournalAuthorDto(), query)
    return this.journalAuthorService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.journalAuthorService.findOne(id);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateJournalAuthorDto: UpdateJournalAuthorDto) {
    return this.journalAuthorService.update(id, updateJournalAuthorDto);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.journalAuthorService.remove(id);
  }
}
