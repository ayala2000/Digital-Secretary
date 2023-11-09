import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTimeService } from './activity-time.service';

describe('ActivityTimeService', () => {
  let service: ActivityTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityTimeService],
    }).compile();

    service = module.get<ActivityTimeService>(ActivityTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
