import { BullModule } from '@nestjs/bull';
import { BullModuleOptions } from '@nestjs/bull/dist/interfaces/bull-module-options.interface';

export const  BullModules: BullModuleOptions = {
  name: 'mailQueue',
  limiter: {
    max: 10,
    duration: 1000,
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};
