import { Test, TestingModule } from '@nestjs/testing';
import { TurnsTypeController } from './turns-type.controller';

describe('TurnsTypeController', () => {
  let controller: TurnsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnsTypeController],
    }).compile();

    controller = module.get<TurnsTypeController>(TurnsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
