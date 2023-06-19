import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService,private readonly userService:UsersService) {}
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    return users;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}