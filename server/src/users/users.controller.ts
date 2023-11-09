import { Controller, Post, Body, Get, Res, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { request } from 'http';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
//import { Public } from 'src/auth/aut.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService,private readonly userService:UsersService) {}
  //@Public()
  @Get()
  async getAllUsers(@Res({ passthrough: true }) response: Response,@Req() request:Request) {
    const users = await this.userService.getAll();
    console.log(response.cookie);
    return users;
  }

  @Post('register')
  //@Roles(Role.Admin)

  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

