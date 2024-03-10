import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TurnsTypeService } from './turns-type.service';

import { CreateTurnDto } from 'src/turns/create-turn.dto';
import { CreateTurnTypeDto } from '../createTurnTypeDto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('turns-type')
export class TurnsTypeController {
  turnService: any;
  constructor(private readonly turnsTypeService: TurnsTypeService) {}
  @Get()
  async getAll(){
    const turnsType= await this.turnsTypeService.getAll();
    return turnsType;
  }
  // @Roles(Role.Admin)
  @Post()
  async create(@Body() createTurnTypeDto: CreateTurnTypeDto) {
    const turnsType = await this.turnsTypeService.create(createTurnTypeDto );
    return turnsType;
  }

  @Put('put/:id')
  async update(@Param('id')id:string,@Body()newTurn: CreateTurnDto) {
   // const { id, name, date, typeOfTurn } = createTurnDto;
    const turn = await this.turnService.update(id, newTurn);

    return turn;
  }

  @Delete('/:name')
  async deleteTurnByName(@Param('name') name: string) {
    const deletedTurn = await this.turnsTypeService.deleteTurnByName(name);
    if (!deletedTurn) {
      throw new NotFoundException(`Turn type with name ${name} not found`);
    }
    return { message: 'Turn deleted successfully' };
  }
}
