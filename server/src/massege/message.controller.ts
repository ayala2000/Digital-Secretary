import { Body, Controller, Post,Header, Req, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.inteface';
import { AppointmentService } from './Appointment.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService, private readonly appointmentService: AppointmentService) { }

    @Post('/sucsses-invite' )
    async creatMessage(
        @Query('user') user: any,
        @Body() req,
    ): Promise<Message> {
        console.log(req.params.body, "body🏚️", "header🐾");
        console.log(req.params.user, "hiiii");

        return this.messageService.CreateMessage(req.params.body,req.params.user);
    }

    @Post( )
    async creatMessageReminder(
        @Body() req,
    ): Promise<Message> {
        console.log(req, "body🏚️", "header🐾");

        return this.appointmentService.scheduleReminderEmails(req.body);

    }
}
