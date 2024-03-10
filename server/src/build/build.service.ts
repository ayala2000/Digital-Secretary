import { Injectable } from '@nestjs/common';

import { Build } from './build.interface';
import { CreateBuildDto } from './createBuild.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTurnDto } from 'src/turns/create-turn.dto';

@Injectable()
export class BuildService {
  constructor(@InjectModel('Build') private readonly buildModel: Model<Build>) { }


  async create(createBuildDto: CreateBuildDto): Promise<Build> {

    const createdTurn = new this.buildModel(createBuildDto);
    return createdTurn.save();
  }
  getAll() {
    const arr = this.buildModel.find().exec();
    console.log(arr);

    return arr
  }
  get() {
    const build = this.buildModel.findOne();
    return build
  }
  async update(id: string, CreateBuildDto: CreateBuildDto): Promise<Build | null> {
    const updatedActivity = await this.buildModel.findByIdAndUpdate(id, CreateBuildDto, { new: true }).exec();
    return updatedActivity;
  }
}
