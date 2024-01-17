import { Test, TestingModule } from '@nestjs/testing';
import { PlataformsController } from './plataforms.controller';

describe('PlataformsController', () => {
  let controller: PlataformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlataformsController],
    }).compile();

    controller = module.get<PlataformsController>(PlataformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
