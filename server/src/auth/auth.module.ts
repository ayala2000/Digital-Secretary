import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
//import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthGuard } from './aut.guard';
import { APP_GUARD } from '@nestjs/core';
//import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
     }),
  ],
  providers: [AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}