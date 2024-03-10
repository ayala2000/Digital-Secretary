import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { AuthService } from 'src/auth/auth.service';
import { MessageController } from './message.controller';
import { MessageSchema } from './message.schema';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/users/users.module';
import { AppointmentService } from './Appointment.service';
import { TurnSchema } from 'src/turns/turn.schema';
import { TurnTypeModule } from 'src/typesOfTurn/turns-type/turns-type.module';
import { TurnModule } from 'src/turns/turn-controller/turn-module.module';
import { TurnsService } from 'src/turns/turn-service/turn-service.service';
import { ActivityTimeSchema } from 'src/ActivityTime/ActivityTime.schema';
import { TurnTypeSchema } from 'src/typesOfTurn/turnType.schema';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema },{name:'ActivityTime', schema:ActivityTimeSchema},{ name: 'Turn', schema: TurnSchema },{name:'TurnType',schema:TurnTypeSchema}])],
      providers: [MessageService,AuthService,MailService,AppointmentService,TurnsService],
      controllers: [MessageController],
      exports: [MessageService,AuthService,AppointmentService],
})
export class MassegeModule {}
