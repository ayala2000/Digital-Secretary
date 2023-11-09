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


  // async connectToDatabase(): Promise<MongoClient> {
  //   const client = await MongoClient.connect('mongodb://127.0.0.1:27017/Users');
  //   this.db = client.db('Users');
  //   console.log('Connected to turn');

  //   return client;
  // }
  async formatDate(date):Promise<string> {
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
  async getDuration(typeOfTurn:string): Promise<number>{
    const typeTurn= await this.turnTypeModel.findOne({typeOfTurn});
    
    const duration=typeTurn.duration;   
     console.log(duration,'duration');

    return await duration;
  }
  //async function that creating object- new record of turns tables.
  // async addTreatment(createTreatmentDto: CreateTurnDto): Promise<Turn> {
  //   const createdTreatment = new this.turnModel(createTreatmentDto);
  //   return createdTreatment.save();
  // }

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



  
  async fillOccupiedMinutes(getdate: Date,duration: number): Promise<any[]> {
    // Calculate the opening time in minutes (assuming it's a whole hour)
    // getActivityHouers();
   const openingTime = 10 * 60;

    // Calculate the closing time in minutes (6 hours after opening time)
   const closingTime = openingTime + 6 * 60;

    // Create an array of minutes for the entire operating time
    const minutesArray = Array(60 * 6).fill(0);
    const availableTurns=[];
    // console.log(minutesArray);
    
    // Get the occupied queues for the given date
    console.log(getdate);
    const date = await this.formatDate(getdate);
    console.log(date,'get\n date');
    
    const occupiedQueues = await this.turnModel.find({ date });
    console.log(occupiedQueues,'occupiedQueues');
    
    // Iterate through the occupied queues and mark the corresponding minutes as occupied
    const promises = occupiedQueues.map( async (queue) => {
      if(queue.time){
      const startTime:number = this.getMinutesFromTime(queue.time.split('-')[0]);
      const openingTime:number = this.getMinutesFromTime('10:00');
      const closingTime:number = this.getMinutesFromTime('16:00');
      const turnDuration =   await this.getDuration(queue.name);
      console.log(turnDuration,'hftyuubr67yxzazsedrftgyhujikolkijuhygtfrdeswaqw\nhufufu');
      
      const endTime =  parseInt(startTime.toString()) +  parseInt(turnDuration.toString());
      console.log("arry",getdate.getDay());
      // console.log("minutesArray");
      // console.log("start",startTime);
      // console.log("end",endTime);
      // //console.log("func",this.getTimeFromMinutes(886));
      
      // Mark the occupied minutes in the array
      if(startTime>=openingTime&&endTime<= closingTime){
          for (let i = startTime; i < endTime; i++) {
            const index = i - openingTime;
            minutesArray[index] = -1; // Mark as occupied
          }}
    }});
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // check if the turn is available
    const isAvailable=(i:number)=> {
      // console.log("isAvailable",i+duration);
      
      const range:number=parseInt(i.toString())+parseInt(duration.toString());
      for(let k:number = i; k<range&&k<minutesArray.length; k++){
        //  console.log(k,i);
        if(minutesArray[k]===-1)
         return false;
      }
      return true;
    }
   


    for(let i =0; i<minutesArray.length; i+=parseInt(duration.toString())){
      // console.log("isFor");
      // console.log(i,"iiiiiiiiii")
      if(isAvailable(i)){
        let newTime = this.getTimeFromMinutes(parseInt(i.toString())+parseInt(openingTime.toString()));
        // console.log("newTime",newTime);
        availableTurns.push(newTime);
        // console.log("availableTurns",availableTurns);
        
    }
  }


   // console.log(minutesArray);

    // Remove the occupied minutes from the array if the queue duration is less than the total duration
    // if ( duration < minutesArray.length ) {
    //   const availableMinutesArray = minutesArray.filter(minute => minute !== -1);
    //   return availableMinutesArray.slice(0, duration);
    // }
    console.log(minutesArray);
    console.log(availableTurns);
    
    return availableTurns;
  }
 

  private getMinutesFromTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + parseInt(minutes.toString());
  }
  private getTimeFromMinutes(minute: number): string {
    const hour:IntegerType = minute / 60;
    return parseInt(hour.toString(), 10)+':'+ minute % 60;
  }
  private getActivityHouers(date:Date):string {
    const daysOfWeek= date.getDay();

    return 'fff';

  }


  async getAvailableDates(duration: any): Promise<Date[]> {
    const currentDate = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(currentDate.getMonth() + 1);

    const datesInTable = await this.turnModel.distinct('date', {
      date: {
        $gte: currentDate,
        $lt: sixMonthsFromNow,
      },
    });
    console.log("datesInTable", datesInTable)

    const allDates = [];
    const allTimes = [];

    for (
      let date = new Date(currentDate);
      date < sixMonthsFromNow;
      date.setDate(date.getDate() + 1)) {

      const isInTable = datesInTable.some(
        (tableDate) => tableDate.getDate() === date.getDate(),
      );

      if (!isInTable) {
        allDates.push(new Date(date));
      }

      else {
        allTimes.push(new Date(date))
      }
    }
    console.log("allDates", allDates)
    return allDates;
  }

  async getFreeQueues(date: Date, queueDuration: number): Promise<any[]> {
    console.log("arry",date.getDay());

    const openingTime = new Date(date).setUTCHours(10, 0, 0); // Set the opening time to 10:00
    const closingTime = new Date(date).setUTCHours(16, 0, 0); // Set the closing time to 16:00
    const closingDate = new Date(closingTime);
    console.log("closingDate", closingDate)
    const duration = new Date().setMinutes(queueDuration);

    console.log(duration);
    console.log("arry" ,date.getDay());
    //מערך המכיל את כל התורים שבתאריך הנוכחי
    const occupiedQueues = await this.turnModel.find({
      date: { $eq: date },
    });
    console.log(occupiedQueues);



    const freeQueues = [];
    let currentTime = new Date(openingTime);//check if time empty
    const localOffset = currentTime.getTimezoneOffset();

    // Calculate the local date by adding the offset to the UTC date
    const localDate = new Date(currentTime.getTime() + (localOffset * 60 * 1000));

    // Now you can work with the local date
    console.log(localDate);
    console.log("currentTime", currentTime)
    console.log("queueDuration", queueDuration);//duration
    while (currentTime < closingDate) {
      console.log("cur", currentTime, currentTime.getMinutes());
      let endTime2 = new Date(currentTime);
      console.log("endTime2", endTime2);
      let Duration = parseInt(queueDuration.toString());
      endTime2.setMinutes(
        currentTime.getMinutes() + Duration);
      console.log("endTime2", endTime2);

      const endTime = new Date(endTime2);
      console.log(endTime, 'endTime');

      //console.log(closingTime, 'endTime');



      // if (!occupiedQueues.some((queue) =>
      //   new Date(queue.time).getTime() <= currentTime.getTime() &&
      //   new Date(queue.time).getTime() >= endTime2.getTime(),
      // )) {

      //   freeQueues.push(currentTime);


      // }
      console.log(freeQueues, 'freeQueues');

      currentTime = endTime2;
    }

    return freeQueues;
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


