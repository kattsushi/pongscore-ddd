import { Test, TestingModule } from '@nestjs/testing';
import { Translations } from './translations.service';

describe('Translations', () => {
  let service: Translations;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Translations],
    }).compile();

    service = module.get<Translations>(Translations);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
