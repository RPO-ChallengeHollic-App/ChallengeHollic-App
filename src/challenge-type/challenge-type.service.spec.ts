import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTypeService } from './challenge-type.service';

describe('ChallengeTypeService', () => {
  let service: ChallengeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeTypeService],
    }).compile();

    service = module.get<ChallengeTypeService>(ChallengeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
