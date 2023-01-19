import {ChallengeTypeController} from "./challenge-type.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {ChallengeTypeService} from "./challenge-type.service";

describe('ChallengeTypeController', () => {
    let controller: ChallengeTypeController;
    let mockChallengeTypeService = {
        createChallengeType: jest.fn(dto => {
            return {
                id: Date.now(),
                ...dto,
            }
        }),

        getChallengeTypeFromId: jest.fn(id => {
            return {
                id: id,
                type: 'Some type',
            }
        }),

        removeChallengeType: jest.fn(id => {
            return {
                id: id,
                type: 'Some type',
            }
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChallengeTypeController],
            providers: [ChallengeTypeService],
        }).overrideProvider(ChallengeTypeService).useValue(mockChallengeTypeService).compile();

        controller = module.get<ChallengeTypeController>(ChallengeTypeController);
    });

    it('should be defined', () => {
       expect(controller).toBeDefined();
    });

    it('should create challenge type', async () => {
        const result = await controller.createChallengeType({
           type: 'Test challenge type',
        });
        expect(result).toEqual({
            challengeType: {
                id: expect.any(Number),
                type: 'Test challenge type',
            }
        });
        expect(mockChallengeTypeService.createChallengeType).toHaveBeenCalled();
    });

    it('should get challenge type with given id', async () => {
       const result = await controller.getChallengeTypeFromId(2);
       expect(result).toEqual({
           challengeType: {
               id: 2,
               type: expect.any(String),
           },
       });
       expect(mockChallengeTypeService.getChallengeTypeFromId).toHaveBeenCalled();
    });


    it('should delete challenge type with given id', async () => {
        const result = await controller.removeChallengeType(2);
        expect(result).toEqual({
            challengeType: {
                id: 2,
                type: expect.any(String),
            },
        });
        expect(mockChallengeTypeService.removeChallengeType).toHaveBeenCalled();
    });
});