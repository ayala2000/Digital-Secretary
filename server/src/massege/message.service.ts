import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import {Message} from './message.inteface';
import { User } from 'src/users/User.inteface';
@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly MessageModel: Model<Message>, private auth: AuthService, private sendMail: MailService) { }

   async CreateMessage(message: Message,user:any): Promise<Message> {
      try {
         // create message
         const createMessage =  new this.MessageModel(message);
         console.log(createMessage.title,'createMessage');
         this.sendMail.sendEmail(user.email,createMessage.title, createMessage.content);
         return createMessage.save();
      }
      catch(error) {
         console.log(error);
         
         throw new Error("error - - -")
      }

   }}
