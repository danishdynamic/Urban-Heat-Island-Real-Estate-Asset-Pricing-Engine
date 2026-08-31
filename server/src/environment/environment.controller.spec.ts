import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentController } from './environment.controller.js';

describe('EnvironmentController', () => {
  let controller: EnvironmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentController],
    }).compile();

    controller = module.get<EnvironmentController>(EnvironmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
