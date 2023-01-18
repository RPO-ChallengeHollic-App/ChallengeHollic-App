import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTagController } from './challenge_tag.controller';

describe('ChallengeTagController', () => {
  let controller: ChallengeTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeTagController],
    }).compile();

    controller = module.get<ChallengeTagController>(ChallengeTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
