import { Test, TestingModule } from '@nestjs/testing';
import { PratidasController } from './pratidas.controller';

describe('PratidasController', () => {
  let controller: PratidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PratidasController],
    }).compile();

    controller = module.get<PratidasController>(PratidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
