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
/**
 * Service for managing turns in the application.
 */


@Injectable()
export class TurnsService {
  /**
   * Constructor to inject necessary models.
   *
   * @param turnModel - Mongoose model for Turn.
   * @param activityTimeModel - Mongoose model for ActivityTime.
   * @param turnTypeModel - Mongoose model for TurnType.
   */


  constructor(@InjectModel('Turn') private readonly turnModel: Model<Turn>,
    @InjectModel('ActivityTime') private readonly activityTimeModel: Model<ActivityTime>,
    @InjectModel('TurnType') private readonly turnTypeModel: Model<TurnType>) { }


 /**
   * Format a given date to a string in "dd/mm/yyyy" format.
   *
   * @param date - The date to format.
   * @returns A formatted date string.
   */
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
  
  /**
   * Retrieve turns for a specific date.
   *
   * @param date - The date for which turns are retrieved.
   * @returns A promise with an array of turns or undefined.
   */

  async getByDate(date: string): Promise<Turn[] | undefined> {
    const m = this.turnModel.find({ date }).exec();
    return m;
  }
   /**
   * Retrieve turns for a specific email.
   *
   * @param email - The email for which turns are retrieved.
   * @returns A promise with an array of turns or undefined.
   */
  async getByEmail(email: String): Promise<Turn[] | undefined> {
    const m = this.turnModel.find({ email }).exec();
    return m;
  }
 /**
   * Retrieve all turns in the system.
   *
   * @returns A promise with an array of all turns or undefined.
   */
  async getAll(): Promise<Turn[] | undefined> {
    const arr = this.turnModel.find().exec();
    return arr;
  }

    /**
   * Retrieve the duration of a specified turn type.
   *
   * @param typeOfTurn - The type of turn for which duration is retrieved.
   * @returns A promise with the duration of the turn type.
   */

  async getDuration(typeOfTurn: string): Promise<number> {
    const typeTurn = await this.turnTypeModel.findOne({ typeOfTurn });

    const duration = typeTurn.duration;
    console.log(duration, 'duration');

    return await duration;
  }
  /**
   * Retrieve opening and closing times for a specific day.
   *
   * @param day - The day for which times are retrieved.
   * @returns A promise with an object containing open and close times.
   * @throws Error if no active time is found for the specified day.
   */

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
  
   /**
   * Create a new turn using the provided DTO.
   *
   * @param createTurnDto - The DTO for creating a new turn.
   * @returns A promise with the created turn.
   */
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



  /**
   * Calculate and return available turn times for a given date and duration.
   *
   * @param getdate - The date for which available turns are calculated.
   * @param duration - The duration of each turn.
   * @returns A promise with an array of available turn times.
   */

  async fillOccupiedMinutes(getdate: Date, duration: number): Promise<any[]> {
    // Calculate the opening time in minutes (assuming it's a whole hour)
    const dayFromDate = getdate.getDay()+1;
    const time= await this.getTimeByDay(dayFromDate);
    const openingTime = time.open ;
    // Calculate the closing time in minutes (6 hours after opening time)
    const closingTime = time.close;
    const difference=this.getTimeDifference(openingTime,closingTime);
    const [hours, minutes] = openingTime.split(':').map(Number);
    const open = hours *60+minutes;
    // Create an array of minutes for the entire operating time
    const minutesArray = Array(Math.ceil(60 * difference)).fill(0);
    const availableTurns = [];
    // Get the occupied queues for the given date
    const date = await this.formatDate(getdate);
    const occupiedQueues = await this.turnModel.find({ date });
    // Iterate through the occupied queues and mark the corresponding minutes as occupied
    const promises = occupiedQueues.map(async (queue) => {
      if (queue.time) {
        const startTime: number = this.getMinutesFromTime(queue.time.split('-')[0]);
        const openingTime: number = this.getMinutesFromTime(time.open);
        const closingTime: number = this.getMinutesFromTime(time.close);
        const turnDuration = await this.getDuration(queue.name);
        const endTime = parseInt(startTime.toString()) + parseInt(turnDuration.toString());        
        // Mark the occupied minutes in the array
        if (startTime >= openingTime && endTime <= closingTime) {
          for (let i = startTime; i < endTime; i++) {
            const index = i - openingTime;
            minutesArray[index] = -1; // Mark as occupied
              }  }  } });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // check if the turn is available
    const isAvailable = (i: number) => {
      const range: number = parseInt(i.toString()) + parseInt(duration.toString());
      for (let k: number = i; k < range && k < minutesArray.length; k++) {
        if (minutesArray[k] === -1)
          return false;
      }
      return true; }
    for (let i = 0; i < minutesArray.length-parseInt(duration.toString()); i += parseInt(duration.toString())) {
      if (isAvailable(i)) {
        let newTime = this.getTimeFromMinutes(parseInt(i.toString()) + parseInt(open.toString()));
        availableTurns.push(newTime);

      }
    }
    return availableTurns;
  }

 /**
   * Convert a time string to minutes.
   *
   * @param time - The time string to convert.
   * @returns The time in minutes.
   */
  private getMinutesFromTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + parseInt(minutes.toString());
  }

 /**
   * Convert minutes to a time string.
   *
   * @param minute - The minutes to convert.
   * @returns The time string.
   */

  private getTimeFromMinutes(minute: number): string {
    const hour: IntegerType = minute / 60;
    return parseInt(hour.toString()) + ':' + minute % 60;
  }
  /**
   * Calculate the time difference in hours between two time strings.
   *
   * @param openTime - The opening time string.
   * @param closingTime - The closing time string.
   * @returns The time difference in hours.
   */
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


