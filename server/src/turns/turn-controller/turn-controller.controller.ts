import { Controller, Post, Body, Delete, Param, Put, Get, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateTurnDto } from '../create-turn.dto';
import { TurnsService } from '../turn-service/turn-service.service';
import { AuthGuard } from 'src/auth/aut.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { ActivityTimeService } from 'src/ActivityTime/activity-time/activity-time.service';
//import { Public } from 'src/auth/aut.guard';

@Controller('turns')
export class TurnController {
  constructor(private readonly turnService: TurnsService, private readonly activityTimeService: ActivityTimeService) { }
  
  // @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    const turns = await this.turnService.getAll();
    return turns;
  }
  
 // @UseGuards(AuthGuard)



  @Get('free-queues')
  async getFreeQueues(
    //@Headers() headers: Record<string, any>,
    @Query('date') date: string,
    @Query('duration') duration: number,
  ): Promise<any[]> {
    console.log(duration,'durationv');
    const newDate= new Date(date).getDay();
    console.log(date);
    
    console.log(newDate,'newDate');
    
    const active = await this.activityTimeService.getByDay(newDate);
    console.log(active,'active\nactive');
    
    return this.turnService.fillOccupiedMinutes(new Date(date), duration,);
  }
 @UseGuards(AuthGuard)

  @Get('/:email')
  async getByEmail(@Param('email') email:string) {
    const turns = await this.turnService.getByEmail(email);
    return turns;
  }

  @Get('/:date')
  async getByDate(@Param('date') date:string) {
    const users = await this.turnService.getByDate(date);
    return users;
   
    
  }
  
  // @Post('addTreatment')
  // async addTreatment(@Body() createTreatmentDto: CreateTurnDto) {
    
  //   return this.turnService.addTreatment(createTreatmentDto);
  // }

  //@Public()
  // @UseGuards(AuthGuard)
  @Post('addTreatment')
  async create(@Body() createTurnDto: CreateTurnDto) {
     const {date} = createTurnDto;
    const castDate = await this.turnService.formatDate(date);// //const {time} = createTurnDto;

    // console.log(date)
    // const castDate= new Date(date);
    // console.log(date,'date')
    // //const castTime= new Date(time);

    // console.log(castDate,'castttt')
    createTurnDto['date']=castDate;
   // createTurnDto['time']=castTime;
    console.log('dgxrdfhhdfhd');
    

    const turn = await this.turnService.create(createTurnDto);
    return turn;
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  deleteturn(@Param('id') id: string) {
    return this.turnService.remove(id);
  }
  // @Put('put/:id')
  // async update(@Param('id') id: number, @Body() newTurn: any) {
  //   const turn = await this.turnService.update(id, newTurn);
  //   return turn;
  // }
}
