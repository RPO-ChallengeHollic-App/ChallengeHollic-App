import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {ChallengeTypeService} from "./challenge-type.service";

describe('ChallengeTypeService', () => {
    let service: ChallengeTypeService;
    const mocPrismaService = {
        challenge_Type: {
            create: jest.fn((param: {data: object}) => {
                return {
                    id: Date.now(),
                    ...param.data,
                }
            }),
            findUnique: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    type: 'Some test',
                }
            }),
            delete: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    type: 'Some test',
                }
            }),
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChallengeTypeService, PrismaService],
        }).overrideProvider(PrismaService).useValue(mocPrismaService).compile();

        service = module.get<ChallengeTypeService>(ChallengeTypeService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create challenge and return it', async () => {
        const result = await service.createChallengeType({
            type: 'Test type'
        });
        expect(result).toEqual({
            id: expect.any(Number),
            type: 'Test type',
        });
        expect(mocPrismaService.challenge_Type.create).toHaveBeenCalled();
    });

    it('should get challenge with id and return it', async () => {
        const result = await service.getChallengeTypeFromId(2);
        expect(result).toEqual({
            id: 2,
            type: expect.any(String),
        });
        expect(mocPrismaService.challenge_Type.findUnique).toHaveBeenCalled();
    });

    it('should delete challenge with id and return it', async () => {
        const result = await service.removeChallengeType(2);
        expect(result).toEqual({
            id: 2,
            type: expect.any(String),
        });
        expect(mocPrismaService.challenge_Type.delete).toHaveBeenCalled();
    });
});