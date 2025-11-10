import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpAuthDto } from './dto/sendOtp-auth.dto';
import { VerifyOtpAuthDto } from './dto/verifyOtp.auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgotPassword-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('send-otp')
  sendOtp(@Body() sendOtpAuthDto: SendOtpAuthDto) {
    return this.authService.sendOtp(sendOtpAuthDto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpAuthDto: VerifyOtpAuthDto) {
    return this.authService.verifyOtp(verifyOtpAuthDto);
  }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
