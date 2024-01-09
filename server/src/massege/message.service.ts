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

   async CreateMessage(message: Message): Promise<Message> {
      try {
         // get details from token
         // const user = this.auth.decodeToken(token);
         // set name to message
         // message.name = 'user.toString()';
         // create message
         const createMessage =  new this.MessageModel(message);

         console.log(createMessage,'createMessage');
         
         // Goes through each message and in it the list of classesToMessag and
         // collects all the users that the teacher chose to send a message to
         // get students
         // According to each student goes through the list of users in order to
         //  find the parent - to get the email address that is updated with the parent
         // const parent = await Promise.all(users.map(async (user: any) => {
         //    const parent_ = await this.userModel.findById({id:user.id}).exec()
         //    return parent_;
         // }));
         // send email to the parent
         // parent.map((parent: any) => {
         //    // validation
         //    if (parent?.email != null && /\S+@\S+\.\S+/.test(parent?.email)) {
         //       this.sendMail.sendEmail(parent.email, message.title, message.content);
         //    }
         // })
         this.sendMail.sendEmail('ayala42185@gmail.com',createMessage.title, createMessage.content);
         return createMessage.save();
      }
      catch(error) {
         console.log(error);
         
         throw new Error("error - - -")
      }

   }}
