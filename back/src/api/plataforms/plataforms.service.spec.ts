import { Test, TestingModule } from '@nestjs/testing';
import { PlataformsService } from './plataforms.service';

describe('PlataformsService', () => {
  let service: PlataformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlataformsService],
    }).compile();

    service = module.get<PlataformsService>(PlataformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
