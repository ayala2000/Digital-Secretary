import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user.dto';
import { LoginUserDto } from '../users/login-user.dto';
import * as jwt from 'jwt-simple';
import * as jwtweb from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'SECRET';

  validateToken(token: string): any {
    try {
      return jwtweb.verify(token, this.JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService) { }

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    if (!await this.usersService.findByEmail(email)) {
      await this.usersService.create(createUserDto);
      return { message: 'User registered successfully' };
    }
    else
      throw new UnauthorizedException();
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.validatePassword(email, password).catch((respons:any)=>
    {console.log(respons);
    });
    if (!user) {
      console.log("not user");
      
      throw new UnauthorizedException('no user');
    }
    console.log("yes user");

    const payload = { email: user.email,name:user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async decodeToken(token: string): Promise<any> {
    try {

      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
      
    } catch (error) {
      // Handle token verification/validation errors
      throw new Error('Invalid token');
    }}
}