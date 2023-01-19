import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTagService } from './challenge_tag.service';

describe('ChallengeTagService', () => {
  let service: ChallengeTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeTagService],
    }).compile();

    service = module.get<ChallengeTagService>(ChallengeTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
