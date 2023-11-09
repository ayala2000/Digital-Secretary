import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {TurnTypeSchema } from '../turnType.schema';
import { TurnsTypeService } from './turns-type.service';
import { TurnsTypeController } from './turns-type.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TurnType', schema: TurnTypeSchema },
    ]),
  ],
  providers: [TurnsTypeService],
  controllers: [TurnsTypeController],
  exports: [TurnsTypeService],
})
export class TurnTypeModule {}
