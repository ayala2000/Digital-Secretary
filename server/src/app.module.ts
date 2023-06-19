import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Users'),
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}

