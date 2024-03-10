import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { CreateTurnDto } from '../turns/create-turn.dto';
import { MassegeModule } from './message.module';
import { Message } from './message.inteface';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel('Turn') private readonly turnModel: Model<CreateTurnDto>,
        private readonly mailService: MailService,
        @InjectModel('Message') private readonly MessageModel: Model<Message>
    ) { }
    async formatDate(date): Promise<string> {
        if (!(date instanceof Date)) {
          // If the input is not a Date object, you can try to parse it
          date = new Date(date);
        }
        if (isNaN(date.getTime())) {
          // Invalid date
          return 'Invalid Date';
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

    async scheduleReminderEmails(message: Message): Promise<Message> {
         
        const createMessage = new this.MessageModel(message);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        try {
            const date = await this.formatDate(tomorrow);

            const appointmentsTomorrow = await this.turnModel.find({
                date, // Get the date in the same format as in the database
                reminderSent: false, // Check if reminder has not been sent
 
            });
            console.log(createMessage, 'createMessage');
            console.log(appointmentsTomorrow, 'appointmentsTomorrow');
           
               

            for (const appointment of appointmentsTomorrow) {
                const reminderSubject = 'Reminder: Your Appointment Tomorrow';
                const reminderContent = `Hi ,
                \n This is a reminder that you have an appointment scheduled for tomorrow at ${appointment.time}.`;
                this.mailService.sendEmail(appointment.email, reminderSubject, reminderContent);

                appointment.reminderSent = true;
                await appointment.save();
            }
            
            return createMessage.save();

        } catch (error) {
            console.error('Error scheduling reminder emails:', error);
            console.log(error);

            throw new Error("error - - -")
        }
    }
}
