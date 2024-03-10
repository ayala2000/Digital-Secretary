import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { log } from 'console';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) { }

    public sendEmail(to: string, subject: string, text: string): void {
        console.log(to+'to');
        
        this.mailerService
            .sendMail({
                to:to, // list of receivers
                from: '"Digital Secretary" <mydigitalsecretary@gmail.com>', // sender address
                subject:subject, // Subject line
                text:text, // plaintext body
                html: '<b>' + text + '</b> '
            })
            .then(() => {
                console.log('Sent email successfully');
            })
            .catch((e) => {
                console.log('Failed to send email:', e);
            });
    }
}