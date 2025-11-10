import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { SetConferenceInfoDto } from './dto/set-conference-info.dto'; // yangi DTO

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ ADMIN va SUPERADMIN foydalanuvchilar
  async getAllAdmins() {
    try {
      const admins = await this.prisma.user.findMany({
        where: { role: 'ADMIN' },
      });
      const superAdmins = await this.prisma.user.findMany({
        where: { role: 'SUPERADMIN' },
      });
      return { admins, superAdmins };
    } catch (error) {
      throw error;
    }
  }

  // ✅ PENDING maqolalar
  async getPendingArticles() {
    try {
      const articles = await this.prisma.article.findMany({
        where: { status: 'PENDING' },
        include: {
          articleAuthors: {
            include: { author: true },
          },
          articleComments: true,
          articleKeywords: true,
          category: true,
          journalVersions: {
            include: {
              journal: true,
            },
          },
          referenceArticles: true,
          reviews: true,
          user: true,
        },
      });
      return { articles };
    } catch (error) {
      throw error;
    }
  }

  // ✅ Barcha ma’lumotlarni olish
  async getAllData() {
    const users = await this.prisma.user.findMany();
    const articles = await this.prisma.article.findMany({
      include: {
        category: true,
        articleAuthors: {
          include: { author: true },
        },
        journalVersions: {
          include: { journal: true },
        },
      },
    });
    const journals = await this.prisma.journal.findMany();
    const journalVersions = await this.prisma.journalVersion.findMany();

    return { users, articles, journals, journalVersions };
  }

  // ✅ ACCEPTED maqolalar uchun konferensiya jadvali Excel fayl
  async downloadAcceptedArticlesExcel(res: Response, dto: SetConferenceInfoDto) {
    try {
      const { time, zoomUrl } = dto;

      // 13:00–14:00 oralig‘ini taqiqlash
      const [start] = time.split('-');
      if (start >= '13:00' && start < '14:00') {
        throw new BadRequestException('13:00–14:00 oralig‘ida konferensiya o‘tkazish mumkin emas!');
      }

      const acceptedArticles = await this.prisma.article.findMany({
        where: { status: 'ACCEPTED' },
        include: {
          category: true,
          articleAuthors: {
            include: { author: true },
          },
        },
      });

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Konferensiya Jadvali');

      sheet.columns = [
        { header: 'Kategoriya', key: 'category', width: 25 },
        { header: 'Maqola sarlavhasi', key: 'title', width: 40 },
        { header: 'Muallif(lar)', key: 'authors', width: 40 },
        { header: 'Email(lar)', key: 'emails', width: 40 },
        { header: 'Vaqt oralig‘i', key: 'time', width: 15 },
        { header: 'Zoom havola', key: 'zoomUrl', width: 40 },
      ];

      acceptedArticles.forEach((article) => {
        const authors = article.articleAuthors.map((a) => `${a.author.fullName}`).join(', ');
        const emails = article.articleAuthors.map((a) => a.author.email).join(', ');

        sheet.addRow({
          category: article.category?.name || 'No category',
          title: article.title,
          authors,
          emails,
          time,
          zoomUrl,
        });
      });

      // ✅ Sarlavha formatlash (bold + fon rangi)
      sheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF007ACC' } };
        cell.alignment = { horizontal: 'center' };
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="conference_schedule.xlsx"');

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      throw error;
    }
  }
}