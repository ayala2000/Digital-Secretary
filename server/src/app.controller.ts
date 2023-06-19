import { Controller, Get,Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Post()
  // register(): string {
  //   return this.usersController.register();
  // }
  // @Post()
  // login(): string {
  //   return this.appService.getHello();
  // }
}
