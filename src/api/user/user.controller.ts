import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAdminAuthDto } from '../auth/dto/createAdmin-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { UserRoleEnum } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post('create-admin')
  create(@Body() createUserDto: CreateAdminAuthDto) {
    return this.userService.createAdmin(createUserDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return this.userService.getMe(req);
  }

  @Get()
  findAll(@Query() query: GetUserDto) {
    const dto = Object.assign(new GetUserDto(), query);
    return this.userService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
