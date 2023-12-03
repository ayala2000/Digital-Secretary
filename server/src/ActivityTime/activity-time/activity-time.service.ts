import { Injectable } from '@nestjs/common';
import { CreateActivityTimeDto } from '../ActivityTime.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { Turn } from 'src/turns/Turn.inerface';
import { ActivityTime } from '../ActivityTime.interface';
import { UpdateActivityTimeDto } from './updateActivityTime.dto';

@Injectable()
export class ActivityTimeService {
    
  constructor(@InjectModel('ActivityTime') private readonly activityTimeModel: Model<ActivityTime>) {}
  
  async seedDefaultActivityTimes(): Promise<void> {
    const existingRecords = await this.activityTimeModel.find().exec();

    if (existingRecords.length === 0) {
      // Insert default records if the table is empty
      const defaultRecords = [
        { day: 1, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 2, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 3, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 4, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 5, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 6, openingHours: ['00:00'], closingHours: ['00:00'] },
        { day: 7, openingHours: ['00:00'], closingHours: ['00:00'] },
        // ... continue for days 3 to 6
      ];

      await this.activityTimeModel.create(defaultRecords);
    }
  }

  async getAll(): Promise<ActivityTime[] | undefined> {
    const arr = this.activityTimeModel.find().exec();
    return arr;
  }

  async getByDay(day:number): Promise<ActivityTime[] | undefined> {
    const activity = this.activityTimeModel.find({day}).exec();
    return activity;
  }
//   async getByDate():Promise<ActivityTime[] | undefined>{


//   }
  //
  //async function that creating object- new record of turns tables.


  async create(createActivityTimeDto: CreateActivityTimeDto): Promise<ActivityTime> {
    const createdTurn = new this.activityTimeModel(createActivityTimeDto);
    return createdTurn.save();
  }

  async remove(id: string): Promise<ActivityTime> {
    return this.activityTimeModel.findByIdAndRemove(id).exec();
  }
  async update(id: string, updateActivityTimeDto: UpdateActivityTimeDto): Promise<ActivityTime | null> {
    const updatedActivity = await this.activityTimeModel.findByIdAndUpdate(id, updateActivityTimeDto, { new: true }).exec();
    return updatedActivity;
  }
  async updateByDay(day: number, updateActivityTimeDto: UpdateActivityTimeDto): Promise<ActivityTime | null> {
    const updatedActivity = await this.activityTimeModel.findOneAndUpdate({ day }, updateActivityTimeDto, { new: true }).exec();
    return updatedActivity;
  }
  
}
