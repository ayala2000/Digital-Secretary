import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { AuthService } from 'src/auth/auth.service';
import { MessageController } from './message.controller';
import { MessageSchema } from './message.schema';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
      providers: [MessageService,AuthService,MailService],
      controllers: [MessageController],
      exports: [MessageService,AuthService],
})
export class MassegeModule {}
