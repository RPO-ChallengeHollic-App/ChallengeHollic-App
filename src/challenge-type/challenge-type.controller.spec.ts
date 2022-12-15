import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeTypeController } from './challenge-type.controller';
import { ChallengeTypeService } from './challenge-type.service';

describe('ChallengeTypeController', () => {
  let controller: ChallengeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeTypeController],
      providers: [ChallengeTypeService],
    }).compile();

    controller = module.get<ChallengeTypeController>(ChallengeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
