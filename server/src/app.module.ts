import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TurnModule } from './turns/turn-controller/turn-module.module';
import { TurnTypeModule } from './typesOfTurn/turns-type/turns-type.module';
import cookieParser from 'cookie-parser';
//import { addTurnModule } from './addTurn/addTurn.module';
import { ActivityTimeModule } from './ActivityTime/activity-time/activity-time.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { InitializerService } from './initializer.service';
import { BuildModule } from './build/build.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Users'),
    UsersModule,
    TurnModule,
    AuthModule,
    PassportModule,
    TurnTypeModule,
    // ActivityTimeSeedService,
    // InitializerService,
    //addTurnModule,
    ActivityTimeModule,
    BuildModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    
  ],
  
  controllers: [AppController],
  providers: [AppService, InitializerService ,{
    provide: APP_GUARD,
    useClass: RolesGuard,
    
  }],
})
export class AppModule {}