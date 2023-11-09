import { Test, TestingModule } from '@nestjs/testing';
import { TurnsTypeService } from './turns-type.service';

describe('TurnsTypeService', () => {
  let service: TurnsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnsTypeService],
    }).compile();

    service = module.get<TurnsTypeService>(TurnsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
