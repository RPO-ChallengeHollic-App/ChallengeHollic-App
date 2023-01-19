import {ParticipentController} from "./participent.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {ParticipentService} from "./participent.service";

describe('ParticipentController', () => {
   let controller: ParticipentController;
   const mockParticipentController = {
       createParticipent: jest.fn(dto => {
          return {
            id: Date.now(),
            ...dto,
          };
       }),

       getParticipentFromId: jest.fn(id => {
          return {
              id: id,
              challengeId: Date.now(),
              memberId: Date.now(),
              placementId: Date.now(),
          }
       }),

       removeParticipent: jest.fn(id => {
           return {
               id: id,
               challengeId: Date.now(),
               memberId: Date.now(),
               placementId: Date.now(),
           }
       }),
   };

   beforeEach(async () => {
      let module: TestingModule = await Test.createTestingModule({
          controllers: [ParticipentController],
          providers: [ParticipentService],
      }).overrideProvider(ParticipentService).useValue(mockParticipentController).compile();
      controller = module.get<ParticipentController>(ParticipentController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('should create participent', async () => {
       const result = await controller.createParticipent({
          challengeId: 1,
          memberId: 1,
          placementId: 1,
       });
       expect(result).toEqual({
           placement: {
               id: expect.any(Number),
               challengeId: 1,
               memberId: 1,
               placementId: 1,
           }
       });
       expect(mockParticipentController.createParticipent).toHaveBeenCalled();
   });

   it('should get participent with given id', async () => {
      const result = await controller.getParticipentFromId(2);
      expect(result).toEqual({
          placement: {
              id: 2,
              challengeId: expect.any(Number),
              memberId: expect.any(Number),
              placementId: expect.any(Number),
          },
      });
      expect(mockParticipentController.getParticipentFromId).toHaveBeenCalled();
   });

    it('should delete participent with given id', async () => {
        const result = await controller.removeParticipent(2);
        expect(result).toEqual({
            placement: {
                id: 2,
                challengeId: expect.any(Number),
                memberId: expect.any(Number),
                placementId: expect.any(Number),
            },
        });
        expect(mockParticipentController.removeParticipent).toHaveBeenCalled();
    });
});