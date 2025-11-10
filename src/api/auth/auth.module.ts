import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { SmsService } from '../sms/sms.service';

@Module({
  imports: [MailModule, JwtModule.register({
    global: true,
    secret: config.JWT_SECRET || 'secretKey',
    signOptions: { expiresIn: '4h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, SmsService],
})
export class AuthModule {}
