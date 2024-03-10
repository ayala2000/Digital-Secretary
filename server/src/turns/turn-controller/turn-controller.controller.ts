import { Controller, Post, Body, Delete, Param, Put, Get, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateTurnDto } from '../create-turn.dto';
import { TurnsService } from '../turn-service/turn-service.service';
import { ActivityTimeService } from 'src/ActivityTime/activity-time/activity-time.service';
@Controller('turns')
export class TurnController {
  constructor(private readonly turnService: TurnsService, private readonly activityTimeService: ActivityTimeService) { }

  @Get()
  async getAll() {
    const turns = await this.turnService.getAll();
    return turns;
  }
  @Get('free-queues')
  async getFreeQueues(
    //@Headers() headers: Record<string, any>,
    @Query('date') date: string,
    @Query('duration') duration: number,
  ): Promise<any[]> {
    return this.turnService.fillOccupiedMinutes(new Date(date), duration,);
  }

  @Get('date/')
  async getByDate(@Query('date') date: string) {
    const users = await this.turnService.getByDate(date);
    return users;

  }
  @Get('/:email')


  async getByEmail(@Param('email') email: string) {
    console.log('gkgkjgkjgkjg');
    const turns = await this.turnService.getByEmail(email);
    return turns;
  }

  @Post('addTreatment')
  async create(@Body() createTurnDto: CreateTurnDto) {
    const { date } = createTurnDto;
    const castDate = await this.turnService.formatDate(date);
    createTurnDto['date'] = castDate;
    const turn = await this.turnService.create(createTurnDto);
    return turn;
  }

  @Delete('delete/:id')
  // @Roles(Role.Admin)
  deleteturn(@Param('id') id: string) {
    return this.turnService.remove(id);
  }
  // @Put('put/:id')
  // async update(@Param('id') id: number, @Body() newTurn: any) {
  //   const turn = await this.turnService.update(id, newTurn);
  //   return turn;
  // }
}
