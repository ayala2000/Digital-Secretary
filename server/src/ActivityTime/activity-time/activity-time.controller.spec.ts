import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTimeController } from './activity-time.controller';

describe('ActivityTimeController', () => {
  let controller: ActivityTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityTimeController],
    }).compile();

    controller = module.get<ActivityTimeController>(ActivityTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
