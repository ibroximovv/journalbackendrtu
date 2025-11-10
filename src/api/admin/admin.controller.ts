import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { ApiBody } from '@nestjs/swagger';
import { SetConferenceInfoDto } from './dto/set-conference-info.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('download-accepted-articles')
  @ApiBody({ type: SetConferenceInfoDto })
  async downloadAcceptedArticles(@Body() dto: SetConferenceInfoDto, @Res() res: Response) {
    return this.adminService.downloadAcceptedArticlesExcel(res, dto);
  }

  @Get('get-all-admins')
  async getAllAdmins() {
    return this.adminService.getAllAdmins()
  }

  @Get('get-all-data')
  async getAllData() {
    return this.adminService.getAllData()
  }

  @Get('get-pending-articles') 
  async getPendingArticles() {
    return this.adminService.getPendingArticles()
  }
}