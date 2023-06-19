import { Injectable , UnauthorizedException  } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user.dto';
import { LoginUserDto } from '../users/login-user.dto';
import * as jwt from 'jwt-simple';
import * as jwtweb from 'jsonwebtoken';
@Injectable()
export class AuthService {
private readonly JWT_SECRET = 'secret';

   validateToken(token: string): any {
    try {
      return jwtweb.verify(token, this.JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const { id,email, password,name } = createUserDto;
    const user = await this.usersService.create(email, password,id,name);
    return { message: 'User registered successfully' };
  }

  async login(loginUserDto: LoginUserDto) {
    const {id,name, email, password } = loginUserDto;
    const user = await this.usersService.validatePassword(id,email, password,name);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id };
    const token = jwt.encode(payload, 'secret');
    return { token };
  }
}