
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/login-user.dto';
import { AuthGuard } from './aut.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 // @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.login(signInDto);
  }

  //@UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}