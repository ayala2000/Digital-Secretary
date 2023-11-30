import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTurnDto } from 'src/turns/create-turn.dto';
import { CreateTurnTypeDto } from 'src/typesOfTurn/createTurnTypeDto';
import { BuildService } from './build.service';
import { CreateBuildDto } from './createBuild.dto';

@Controller('build')
export class BuildController {
    constructor(private readonly buildService: BuildService) {}
    @Get()
    async get(){
      const turnsType= await this.buildService.get();
      return turnsType;
    }
  
    @Post()
    async create(@Body() createBuildDto: CreateBuildDto) {
  
      const turnsType = await this.buildService.create(createBuildDto );
  
      return turnsType;
    }
    @Put('/:id')
    async update(@Param('id')id:string,@Body()newBuild: CreateBuildDto) {
     // const { id, name, date, typeOfTurn } = createTurnDto;
      const turn = await this.buildService.update(id, newBuild);
      return turn;
    }
}
