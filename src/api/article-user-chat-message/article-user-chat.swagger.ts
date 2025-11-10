import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SendMessageSocketDto } from './dto/socket-event.dto';


@ApiTags('Socket Events (Real-time Chat)')
@Controller('socket-docs')
export class ArticleUserChatSwaggerController {
  @Post('send-message')
  @ApiOperation({
    summary: 'Socket.io hodisa: send_message',
    description: `
Bu hodisa orqali foydalanuvchi real vaqt rejimida xabar yuboradi.
Socket event nomi: **send_message**

Emit payload:
\`\`\`json
{
  "fromId": 1,
  "toId": 2,
  "chatId": 5,
  "message": "Salom!"
}
\`\`\`
Server emit qiladigan event:
\`\`\`json
{
  "event": "new_message",
  "data": { "id": 12, "message": "Salom!" }
}
\`\`\`
    `,
  })
  async fakeSendMessage(@Body() dto: SendMessageSocketDto) {
    return {
      note: 'Bu faqat Swagger hujjatlash uchun. Real ishlash socket orqali amalga oshadi.',
      example: dto,
    };
  }
}