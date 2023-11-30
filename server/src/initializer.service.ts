// initializer.service.ts

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ActivityTimeService } from './ActivityTime/activity-time/activity-time.service';

@Injectable()
export class InitializerService implements OnApplicationBootstrap {
  constructor(private readonly activityTimeSeedService: ActivityTimeService) {}

  async onApplicationBootstrap() {
    // Trigger the seeding process on application startup
    await this.activityTimeSeedService.seedDefaultActivityTimes();
  }
}
