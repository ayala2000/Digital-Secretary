import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        pool:true,
        secure: true,
        
        auth: {
          user: 'mydigitalsecretary@gmail.com',
          pass: 'cobmbuwhwcesjdaw',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"Digital Secretary" <mydigitalsecretary@gmail.com>',
      },
      preview: true,
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class mailModule { }