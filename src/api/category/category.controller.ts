import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { UserRoleEnum } from '@prisma/client';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: GetCategoryDto) {
    const dto = Object.assign(new GetCategoryDto, query)
    return this.categoryService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
