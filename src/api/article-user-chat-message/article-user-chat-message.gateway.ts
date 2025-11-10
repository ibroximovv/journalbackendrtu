import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ArticleUserChatMessageService } from './article-user-chat-message.service';

interface ConnectedUser {
  userId: number;
  socketId: string;
}
@WebSocketGateway({ cors: { origin: '*' } })
export class ArticleUserChatMessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers: ConnectedUser[] = [];

  constructor(private readonly chatService: ArticleUserChatMessageService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.connectedUsers = this.connectedUsers.filter(u => u.socketId !== client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_user')
  async handleJoinUser(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
    const { userId } = data;
    client.join(`user_${userId}`);
    this.connectedUsers.push({ userId, socketId: client.id });

    const messages = await this.chatService.getUserMessages(userId);
    client.emit('load_previous_messages', messages);

    console.log(`User ${userId} joined room user_${userId}`);
    return { success: true, userId };
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: { fromId: number; toId: number; message: string },
    @ConnectedSocket() client: Socket
  ) {
    const chat = await this.chatService.ensureChat(data.fromId, data.toId);

    const savedMessage = await this.chatService.createMessage({
      fromId: data.fromId,
      toId: data.toId,
      message: data.message,
      articleUserChatId: chat.id,
    });

    // Qabul qiluvchiga yuborish
    this.server.to(`user_${data.toId}`).emit('new_message', savedMessage);

    // Yuborgan foydalanuvchiga ham
    client.emit('message_sent', savedMessage);

    return savedMessage;
  }

  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(@MessageBody() data: { messageId: number; toId: number }) {
    const updated = await this.chatService.markAsRead(data.messageId);
    this.server.to(`user_${data.toId}`).emit('message_read', updated);
    return updated;
  }

  @SubscribeMessage('get_online_users')
  handleGetOnlineUsers() {
    const onlineUsers = this.connectedUsers.map(u => u.userId);
    return { onlineUsers };
  }
}
