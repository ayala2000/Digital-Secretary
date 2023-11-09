import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurnSchema } from '../turn.schema';
import { TurnsService } from '../turn-service/turn-service.service';
import { TurnController } from './turn-controller.controller';
import { ActivityTimeService } from 'src/ActivityTime/activity-time/activity-time.service';
import { ActivityTimeSchema } from 'src/ActivityTime/ActivityTime.schema';
import { TurnsTypeService } from 'src/typesOfTurn/turns-type/turns-type.service';
import { TurnTypeSchema } from 'src/typesOfTurn/turnType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Turn', schema: TurnSchema },{name:'ActivityTime', schema:ActivityTimeSchema},{ name: 'TurnType', schema: TurnTypeSchema }]),
  ],
  providers: [TurnsService,ActivityTimeService,TurnsTypeService],
  controllers: [TurnController],
  exports: [TurnsService],
})
export class TurnModule {}
