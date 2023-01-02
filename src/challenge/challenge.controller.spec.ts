import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import {IsDateString} from "class-validator";

describe('ChallengeController', () => {
  let controller: ChallengeController;
  let mockChallengeService = {
    createChallenge: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    getChallengeFromId: jest.fn(id => {
      return {
        id: id,
        name: 'Test challenge',
        groupId: 2,
        typeId: 1,
        deadline: undefined,
        start_data: undefined,
      };
    }),

    removeChallenge: jest.fn(id => {
      return {
        id: id,
        name: 'Test challenge',
        groupId: 2,
        typeId: 1,
        deadline: undefined,
        start_data: undefined,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [ChallengeService],
    }).overrideProvider(ChallengeService).useValue(mockChallengeService).compile();

    controller = module.get<ChallengeController>(ChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create challenge',  async () => {
    const currDate = Date.now().toString();
    expect(await controller.createChallenge({
      name: 'Test challenge',
      groupId: 2,
      typeId: 1,
      deadline: currDate,
      start_data: currDate,
    })).toEqual({
      challenge: {
        id: expect.any(Number),
        name: 'Test challenge',
        groupId: 2,
        typeId: 1,
        deadline: currDate,
        start_data: currDate,
      }
    });
    expect(mockChallengeService.createChallenge).toHaveBeenCalled();
  });

  it('should get challenge with given id', async  () => {
    expect(await controller.getChallengeFromId(2))
        .toEqual({
          challenge: {
            id: 2,
            name: expect.any(String),
            groupId: expect.any(Number),
            typeId: expect.any(Number),
          },
        });
     expect(mockChallengeService.getChallengeFromId).toHaveBeenCalled();
  });

  it('should delete challenge with given id', async () => {
    expect(await controller.removeChallenge(2))
        .toEqual({
          challenge: {
            id: 2,
            name: expect.any(String),
            groupId: expect.any(Number),
            typeId: expect.any(Number),
          },
        });
  });
});
