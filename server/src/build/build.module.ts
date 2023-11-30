import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildSchema } from './build.schema';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
@Module({
    imports: [
      MongooseModule.forFeature([
        { name:'Build', schema: BuildSchema },
      ]),
    ],
    providers: [BuildService],
    controllers: [BuildController],
    exports: [BuildService],
  })
export class BuildModule {}
