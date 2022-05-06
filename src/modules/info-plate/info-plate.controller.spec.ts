import { Test, TestingModule } from '@nestjs/testing';
import { InfoPlateController } from './info-plate.controller';

describe('InfoPlateController', () => {
  let controller: InfoPlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoPlateController],
    }).compile();

    controller = module.get<InfoPlateController>(InfoPlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
