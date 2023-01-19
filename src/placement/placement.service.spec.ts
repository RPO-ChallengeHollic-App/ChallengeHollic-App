import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {PlacementService} from "./placement.service";
describe('PlacementService', () => {
    let service: PlacementService;
    const mocPrismaService = {
        placement: {
            create: jest.fn((param: {data: object}) => {
                return {
                    id: Date.now(),
                    ...param.data,
                }
            }),
            findUnique: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    place: 1,
                    points: 10,
                }
            }),
            delete: jest.fn((param: {where: object}) => {
                return {
                    id: param.where['id'],
                    place: 1,
                    points: 10,
                }
            }),
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlacementService, PrismaService],
        }).overrideProvider(PrismaService).useValue(mocPrismaService).compile();

        service = module.get<PlacementService>(PlacementService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create challenge and return it', async () => {
        const result = await service.createPlacement({
            place: 1,
            points: 10,
        });
        expect(result).toEqual({
            id: expect.any(Number),
            place: 1,
            points: 10,
        });
        expect(mocPrismaService.placement.create).toHaveBeenCalled();
    });

    it('should get challenge with id and return it', async () => {
        const result = await service.getPlacementFromId(2);
        expect(result).toEqual({
            id: 2,
            place: expect.any(Number),
            points: expect.any(Number),
        });
        expect(mocPrismaService.placement.findUnique).toHaveBeenCalled();
    });

    it('should delete challenge with id and return it', async () => {
        const result = await service.removePlacement(2);
        expect(result).toEqual({
            id: 2,
            place: expect.any(Number),
            points: expect.any(Number),
        });
        expect(mocPrismaService.placement.delete).toHaveBeenCalled();
    });
});