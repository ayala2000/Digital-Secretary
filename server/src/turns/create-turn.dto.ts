
import { TurnType } from "../typesOfTurn/turnType.interface";
//import moment from 'moment';
export class CreateTurnDto {
    email: string;
    name: string;
    date: string;
    time:string;
    typeOfTurn: String;
    reminderSent: boolean;
}
 
//moment().set({ hours: 10, minutes: 30 })