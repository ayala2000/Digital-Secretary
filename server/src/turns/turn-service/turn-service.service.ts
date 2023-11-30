import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Db, IntegerType, MongoClient } from 'mongodb';
import { Turn } from '../Turn.inerface';
//import * as bcrypt from 'bcrypt';
//import { turnType } from '../../typesOfTurn/turnType';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTurnDto } from '../create-turn.dto';
import { ActivityTime } from 'src/ActivityTime/ActivityTime.interface';
import { TurnType } from 'src/typesOfTurn/turnType.interface';



@Injectable()
export class TurnsService {


  constructor(@InjectModel('Turn') private readonly turnModel: Model<Turn>,
    @InjectModel('ActivityTime') private readonly activityTimeModel: Model<ActivityTime>,
    @InjectModel('TurnType') private readonly turnTypeModel: Model<TurnType>) { }



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

  async getByDate(date: string): Promise<Turn[] | undefined> {
    const m = this.turnModel.find({ date }).exec();
    return m;
  }
  async getByEmail(email: String): Promise<Turn[] | undefined> {
    const m = this.turnModel.find({ email }).exec();
    return m;
  }

  async getAll(): Promise<Turn[] | undefined> {
    const arr = this.turnModel.find().exec();
    return arr;
  }
  async getDuration(typeOfTurn: string): Promise<number> {
    const typeTurn = await this.turnTypeModel.findOne({ typeOfTurn });

    const duration = typeTurn.duration;
    console.log(duration, 'duration');

    return await duration;
  }
  async getTimeByDay(day: number): Promise<{ open:string, close:string }> {
    const activeTime = await this.activityTimeModel.findOne({ day }).exec();
    
  if (!activeTime) {
    // Handle the case where no active time is found for the specified dayOfWeek
    throw new Error('No active time found for the specified dayOfWeek');
  }

    const open=activeTime.openingHours[0];
    console.log('in getTime open day',open);
    
    const close = activeTime.closingHours[0];
    console.log('in getTime open day',close);

    
    return { open, close };
  }
  
 
  async create(createTurnDto: CreateTurnDto): Promise<Turn> {
    const createdTurn = new this.turnModel(createTurnDto);
    return createdTurn.save();
  }

  async remove(id: string): Promise<Turn> {
    return this.turnModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<Turn> {
    return this.turnModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }




  async fillOccupiedMinutes(getdate: Date, duration: number): Promise<any[]> {
    // Calculate the opening time in minutes (assuming it's a whole hour)
    const dayFromDate = getdate.getDay()+1;
    const time= await this.getTimeByDay(dayFromDate);
    const openingTime = time.open ;
    
    // Calculate the closing time in minutes (6 hours after opening time)
    const closingTime = time.close;
    console.log("opening tiime",closingTime);

    const difference=this.getTimeDifference(openingTime,closingTime);
    console.log(difference,'difffffffffff');
    
    const [hours, minutes] = openingTime.split(':').map(Number);
    const open = hours *60+minutes;
    // Create an array of minutes for the entire operating time
    const minutesArray = Array(Math.ceil(60 * difference)).fill(0);
    const availableTurns = [];
    // console.log(minutesArray);

    // Get the occupied queues for the given date
    const date = await this.formatDate(getdate);
    console.log(date, 'get\n date');
    const occupiedQueues = await this.turnModel.find({ date });
    console.log(occupiedQueues, 'occupiedQueues');

    // Iterate through the occupied queues and mark the corresponding minutes as occupied
    const promises = occupiedQueues.map(async (queue) => {
      if (queue.time) {
        const startTime: number = this.getMinutesFromTime(queue.time.split('-')[0]);
        console.log(startTime, "start timeeeeeeeeee");
        
        const openingTime: number = this.getMinutesFromTime(time.open);
        console.log(openingTime, "openind timeeeeeeeeee");

        const closingTime: number = this.getMinutesFromTime(time.close);
        const turnDuration = await this.getDuration(queue.name);
        // console.log(turnDuration, 'hftyuubr67yxzazsedrftgyhujikolkijuhygtfrdeswaqw\nhufufu');

        const endTime = parseInt(startTime.toString()) + parseInt(turnDuration.toString());
        console.log("arry", getdate.getDay());
        

        // Mark the occupied minutes in the array
        if (startTime >= openingTime && endTime <= closingTime) {
          for (let i = startTime; i < endTime; i++) {
            const index = i - openingTime;
            console.log('indeeeeeeeeex', index);
            
            minutesArray[index] = -1; // Mark as occupied
          }
        }
      }
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // check if the turn is available
    const isAvailable = (i: number) => {
      // console.log("isAvailable",i+duration);

      const range: number = parseInt(i.toString()) + parseInt(duration.toString());
      for (let k: number = i; k < range && k < minutesArray.length; k++) {
        //  console.log(k,i);
        if (minutesArray[k] === -1)
          return false;
      }
      return true;
    }

    for (let i = 0; i < minutesArray.length-parseInt(duration.toString()); i += parseInt(duration.toString())) {
      // console.log("isFor");
      // console.log(i,"iiiiiiiiii")
      if (isAvailable(i)) {
        let newTime = this.getTimeFromMinutes(parseInt(i.toString()) + parseInt(open.toString()));
        // console.log("newTime",newTime);
        availableTurns.push(newTime);
        // console.log("availableTurns",availableTurns);

      }
    }

    console.log(availableTurns);

    return availableTurns;
  }


  private getMinutesFromTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + parseInt(minutes.toString());
  }
  private getTimeFromMinutes(minute: number): string {
    const hour: IntegerType = minute / 60;
    return parseInt(hour.toString()) + ':' + minute % 60;
  }

  private getTimeDifference(openTime: string, closingTime: string): number {
  
    
    const openTimeParts = openTime.split(':').map(Number);
    const closingTimeParts = closingTime.split(':').map(Number);
  
    const openMinutes = openTimeParts[0] * 60 + openTimeParts[1];
    const closingMinutes = closingTimeParts[0] * 60 + closingTimeParts[1];
  
    const timeDifferenceInMinutes = closingMinutes - openMinutes;
  
    // Convert the time difference to hours
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
  
    return timeDifferenceInHours;
  }
  
  
  


  

  
}







// async update(_id: object, newturn: any) {
//   try {
//     const df = await this.findById(_id);
//     console.log(df);
//     await this.db.collection<Turn>('Turn').findOneAndUpdate({ _id }, {$set: newturn});
//     console.log('sucsses update turn');
//   } catch (error){
//     console.error('error update turn', error);
//   }
// }


