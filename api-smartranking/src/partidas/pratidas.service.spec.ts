import { Test, TestingModule } from '@nestjs/testing';
import { PratidasService } from './pratidas.service';

describe('PratidasService', () => {
  let service: PratidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PratidasService],
    }).compile();

    service = module.get<PratidasService>(PratidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
