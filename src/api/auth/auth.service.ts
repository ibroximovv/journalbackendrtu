import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SendOtpAuthDto } from './dto/sendOtp-auth.dto';
import { totp } from 'otplib';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpAuthDto } from './dto/verifyOtp.auth.dto';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgotPassword-auth.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

totp.options = {
  step: 300,
  digits: 4,
}

@Injectable()
export class AuthService extends BaseService<PrismaService['user'], RegisterAuthDto, UpdateAuthDto> {
  constructor(readonly prisma: PrismaService, private readonly mail: MailService, private readonly sms: SmsService, private readonly jwt: JwtService, ) { // @Inject(CACHE_MANAGER) private readonly cache: Cache
    super(prisma, 'user')
  }

  async sendOtp(sendOtpAuthDto: SendOtpAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: sendOtpAuthDto.email },
            { phoneNumber: sendOtpAuthDto.phoneNumber }
          ]
        }
      });
      if (findone) throw new BadRequestException('User already exists');

      let key: string;
      if (sendOtpAuthDto.email && sendOtpAuthDto.phoneNumber) {
        key = sendOtpAuthDto.email + sendOtpAuthDto.phoneNumber + 'otp';
      } else if (sendOtpAuthDto.email) {
        key = sendOtpAuthDto.email + 'otp';
      } else if (sendOtpAuthDto.phoneNumber) {
        key = sendOtpAuthDto.phoneNumber + 'otp';
      } else {
        throw new BadRequestException('Either email or phoneNumber must be provided');
      }

      const otp = totp.generate(key);

      if (sendOtpAuthDto.email) {
        await this.mail.sendSmsToMail(
          sendOtpAuthDto.email,
          'Your OTP code',
          `Sizning tasdiqlash kodingiz: ${otp}, iltimos bu kodni hech kimga bermang!`
        );
      }

      // if (sendOtpAuthDto.phoneNumber) {
      //   await this.sms.sendSmsToPhone(sendOtpAuthDto.phoneNumber, otp);
      // }

      return {
        email: sendOtpAuthDto.email,
        phoneNumber: sendOtpAuthDto.phoneNumber,
        statusCode: 200,
        message: 'OTP sent successfully',
        otp
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'OTP sending failed');
    }
  }

  async verifyOtp(verifyOtpAuthDto: VerifyOtpAuthDto) {
    const { email, phoneNumber, otp } = verifyOtpAuthDto;

    try {
      if (!email && !phoneNumber) {
        throw new BadRequestException('Either email or phoneNumber must be provided');
      }

      const secret = (email ?? '') + (phoneNumber ?? '') + 'otp';
      const isValid = totp.verify({ token: otp, secret });

      if (!isValid) {
        throw new BadRequestException('Invalid OTP');
      }

      return { success: true, message: 'OTP verified' };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'OTP verification failed');
    }
  }


  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: registerAuthDto.email
            },
            {
              phoneNumber: registerAuthDto.phoneNumber
            },
            {
              username: registerAuthDto.username
            }
          ]
        }
      })

      if (findone) throw new BadRequestException('User already exists')

      const hashedPassword = BcryptEncryption.encrypt(registerAuthDto.password)

      const user = await this.prisma.user.create({
        data: {
          ...registerAuthDto,
          password: hashedPassword
        }
      })

      return {
        statusCode: 200,
        message: 'User registered successfully',
        data: user,
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { username: loginAuthDto.username } })
      if (!findone) throw new BadRequestException('User not found')
      const isMatchPassword = BcryptEncryption.compare(loginAuthDto.password, findone.password)
      if (!isMatchPassword) throw new BadRequestException('Invalid password')
      const token = this.jwt.sign({ id: findone.id, role: findone.role })
      return {
        token
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const findone = await this.prisma.user.findFirst({
        where: {
          AND: [
            {
              email: forgotPasswordDto.email
            },
            {
              phoneNumber: forgotPasswordDto.phoneNumber
            }
          ]
        }
      })
      if (!findone) throw new BadRequestException('User not found')
      const hashedPassword = BcryptEncryption.encrypt(forgotPasswordDto.password)
      const user = await this.prisma.user.update({
        where: { id: findone.id },
        data: {
          password: hashedPassword
        }
      })
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
    }
  }
}