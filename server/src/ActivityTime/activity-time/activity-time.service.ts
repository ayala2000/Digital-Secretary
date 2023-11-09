import { Injectable } from '@nestjs/common';
import { CreateActivityTimeDto } from '../ActivityTime.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { Turn } from 'src/turns/Turn.inerface';
import { ActivityTime } from '../ActivityTime.interface';

@Injectable()
export class ActivityTimeService {
    
  constructor(@InjectModel('ActivityTime') private readonly activityTimeModel: Model<ActivityTime>) {}

  async getAll(): Promise<ActivityTime[] | undefined> {
    const arr = this.activityTimeModel.find().exec();
    return arr;
  }

  async getByDay(daysOfWeek:number): Promise<ActivityTime[] | undefined> {
    const activity = this.activityTimeModel.find({daysOfWeek}).exec();
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
  async update(id: string, updateUserDto: any): Promise<ActivityTime> {
    return this.activityTimeModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }
}
