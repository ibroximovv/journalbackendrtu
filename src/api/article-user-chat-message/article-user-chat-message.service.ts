import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class ArticleUserChatMessageService {
  constructor(private readonly prisma: PrismaService) { }

  // 📝 Chat borligini tekshirish yoki yaratish
  async ensureChat(fromId: number, toId: number) {
    let chat = await this.prisma.articleUserChat.findFirst({
      where: {
        OR: [
          { fromId, toId },
          { fromId: toId, toId: fromId }, // qarama-qarshi holat
        ],
      },
    });

    if (!chat) {
      chat = await this.prisma.articleUserChat.create({
        data: { fromId, toId },
      });
    }

    return chat;
  }

  // 📝 Xabar yaratish
  async createMessage(data: {
    fromId: number;
    toId: number;
    message: string;
    articleUserChatId: number;
  }) {
    return this.prisma.articleUserChatMessage.create({
      data: {
        fromId: data.fromId,
        toId: data.toId,
        message: data.message,
        articleUserChatId: data.articleUserChatId,
      },
      include: { from: true, to: true },
    });
  }

  // 📝 Foydalanuvchining barcha xabarlarini olish
  async getUserMessages(userId: number) {
    return this.prisma.articleUserChatMessage.findMany({
      where: {
        OR: [
          { fromId: userId },
          { toId: userId }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        from: true,
        to: true
      }
    });
  }

  // 📝 Xabarni o'qilgan deb belgilash
  async markAsRead(messageId: number) {
    return this.prisma.articleUserChatMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });
  }
}
