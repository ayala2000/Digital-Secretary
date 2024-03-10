import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateTurnDto } from 'src/turns/create-turn.dto';
import { CreateTurnTypeDto } from 'src/typesOfTurn/createTurnTypeDto';
import { CreateActivityTimeDto } from '../ActivityTime.dto';
import { ActivityTimeService } from './activity-time.service';
import { UpdateActivityTimeDto } from './updateActivityTime.dto';

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
    @Put('/:day')
    async updateByDay(@Param('day') day: number, @Body() updateActivityTimeDto: UpdateActivityTimeDto) {
      const updatedActivity = await this.activityTimeService.updateByDay(day, updateActivityTimeDto);
      if (!updatedActivity) {
        throw new NotFoundException(`ActivityTime with day ${day} not found`);
      }
      return updatedActivity;
    }
    
}
