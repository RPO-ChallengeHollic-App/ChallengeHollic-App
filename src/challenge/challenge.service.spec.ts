import {ChallengeService} from "./challenge.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";

describe('ChallengeService', () => {
    let service: ChallengeService;
    const mocPrismaService = {
        challenge: {
            create: jest.fn((param: {data: object}) => {
               return {
                   id: Date.now(),
                   ...param.data,
               }
            }),
            findUnique: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    name: 'Test',
                    FK_group_id: 2,
                    FK_challenge_type_id: 1,
                    deadline: undefined,
                    start_date: undefined,
                }
            }),
            delete: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    name: 'Test',
                    FK_group_id: 2,
                    FK_challenge_type_id: 1,
                    deadline: undefined,
                    start_date: undefined,
                }
            }),
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChallengeService, PrismaService],
        }).overrideProvider(PrismaService).useValue(mocPrismaService).compile();

        service = module.get<ChallengeService>(ChallengeService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create challenge and return it', async () => {
        const currDate = Date.now().toString();
        const result = await service.createChallenge({
            name: 'Test challenge',
            groupId: 2,
            typeId: 1,
            deadline: currDate,
            start_data: currDate,
        });
        expect(result).toEqual({
            id: expect.any(Number),
            name: 'Test challenge',
            FK_group_id: 2,
            FK_challenge_type_id: 1,
            deadline: currDate,
            start_date: currDate,
        });
        expect(mocPrismaService.challenge.create).toHaveBeenCalled();
    });

    it('should get challenge with id and return it', async () => {
        const result = await service.getChallengeFromId(2);
        expect(result).toEqual({
            id: 2,
            name: expect.any(String),
            FK_group_id: expect.any(Number),
            FK_challenge_type_id: expect.any(Number),
        });
        expect(mocPrismaService.challenge.findUnique).toHaveBeenCalled();
    });

    it('should delete challenge with id and return it', async () => {
        const result = await service.removeChallenge(2);
        expect(result).toEqual({
            id: 2,
            name: expect.any(String),
            FK_group_id: expect.any(Number),
            FK_challenge_type_id: expect.any(Number),
        });
        expect(mocPrismaService.challenge.delete).toHaveBeenCalled();
    });
});