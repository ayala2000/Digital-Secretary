import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTurnDto } from 'src/turns/create-turn.dto';
import { CreateTurnTypeDto } from 'src/typesOfTurn/createTurnTypeDto';
import { CreateActivityTimeDto } from '../ActivityTime.dto';
import { ActivityTimeService } from './activity-time.service';

@Controller('activity-time')
export class ActivityTimeController {
    constructor(private readonly activityTimeService: ActivityTimeService) {}
    @Get()
    async getAllUsers() {
      const users = await this.activityTimeService.getAll();
      return users;
    }
    @Get('/:day')
    async getByDay(@Param('day') day:number) {
      const activity = await this.activityTimeService.getByDay(day);
      return activity;
    }
    
    @Post()
    async create(@Body() createActivityTimeDto: CreateActivityTimeDto) {
  
      const turnsType = await this.activityTimeService.create(createActivityTimeDto );
  
      return turnsType;
    }
    @Put('put/:id')
    async update(@Param('id')id:string,@Body()newTurn: CreateTurnDto) {
     // const { id, name, date, typeOfTurn } = createTurnDto;
      const turn = await this.activityTimeService.update(id, newTurn);
  
      return turn;
    }
}
