import { Test, TestingModule } from '@nestjs/testing';
import { InfoPlateService } from './info-plate.service';

describe('InfoPlateService', () => {
  let service: InfoPlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoPlateService],
    }).compile();

    service = module.get<InfoPlateService>(InfoPlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
