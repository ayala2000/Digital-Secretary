import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityTimeSchema } from '../ActivityTime.schema';
import { ActivityTimeController } from './activity-time.controller';
import { ActivityTimeService } from './activity-time.service';

@Module({
    imports: [
        // MongooseModule.forRoot('mongodb://127.0.0.1:27017/Users'),
         MongooseModule.forFeature([{ name: 'ActivityTime', schema: ActivityTimeSchema }]),
        ActivityTimeModule,
       ],
       controllers: [ ActivityTimeController],
       providers: [ ActivityTimeService],
       exports:[ActivityTimeService]
})
export class ActivityTimeModule {}
