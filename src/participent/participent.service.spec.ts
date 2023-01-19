import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {ParticipentService} from "./participent.service";

describe('ParticipentService', () => {
    let service: ParticipentService;
    const mocPrismaService = {
        participent: {
            create: jest.fn((param: {data: object}) => {
                return {
                    id: Date.now(),
                    ...param.data,
                }
            }),
            findUnique: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    FK_placement_id: 1,
                    FK_member_id: 2,
                    FK_challenge_id: 3,
                }
            }),
            delete: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    FK_placement_id: 1,
                    FK_member_id: 2,
                    FK_challenge_id: 3,
                }
            }),
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ParticipentService, PrismaService],
        }).overrideProvider(PrismaService).useValue(mocPrismaService).compile();

        service = module.get<ParticipentService>(ParticipentService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create challenge and return it', async () => {
        const result = await service.createParticipent({
            placementId: 1,
            memberId: 2,
            challengeId: 3,
        });
        expect(result).toEqual({
            id: expect.any(Number),
            FK_placement_id: 1,
            FK_member_id: 2,
            FK_challenge_id: 3,
        });
        expect(mocPrismaService.participent.create).toHaveBeenCalled();
    });

    it('should get challenge with id and return it', async () => {
        const result = await service.getParticipentFromId(2);
        expect(result).toEqual({
            id: 2,
            FK_placement_id: expect.any(Number),
            FK_member_id: expect.any(Number),
            FK_challenge_id: expect.any(Number),
        });
        expect(mocPrismaService.participent.findUnique).toHaveBeenCalled();
    });

    it('should delete challenge with id and return it', async () => {
        const result = await service.removeParticipent(2);
        expect(result).toEqual({
            id: 2,
            FK_placement_id: expect.any(Number),
            FK_member_id: expect.any(Number),
            FK_challenge_id: expect.any(Number),
        });
        expect(mocPrismaService.participent.delete).toHaveBeenCalled();
    });
});