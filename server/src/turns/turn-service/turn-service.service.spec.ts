import { Test, TestingModule } from '@nestjs/testing';
import { TurnServiceService } from './turn-service.service';

describe('TurnServiceService', () => {
  let service: TurnServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnServiceService],
    }).compile();

    service = module.get<TurnServiceService>(TurnServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
