import { Test, TestingModule } from '@nestjs/testing';
import { TurnController } from './turn-controller.controller';

describe('TurnControllerController', () => {
  let controller: TurnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnController],
    }).compile();

    controller = module.get<TurnController>(TurnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
