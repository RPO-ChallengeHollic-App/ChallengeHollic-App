import {PlacementController} from "./placement.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {PlacementService} from "./placement.service";
describe('PlacementController', () => {
   let controller: PlacementController;
   const mockPlacementService = {
       createPlacement: jest.fn(dto => {
          return {
              id: Date.now(),
              ...dto,
          };
       }),

       getPlacementFromId: jest.fn(id => {
          return {
              id: id,
              place: 1,
              points: 10,
          };
       }),

       removePlacement: jest.fn(id => {
           return {
               id: id,
               place: 1,
               points: 10,
           };
       }),
   };

   beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           controllers: [PlacementController],
           providers: [PlacementService],
       }).overrideProvider(PlacementService).useValue(mockPlacementService).compile();
       controller = module.get<PlacementController>(PlacementController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('should create placement', async () => {
      const result = await controller.createPlacement({
         place: 1,
         points: 10,
      });
      expect(result).toEqual({
          placement: {
              id: expect.any(Number),
              place: 1,
              points: 10,
          },
      });
      expect(mockPlacementService.createPlacement).toHaveBeenCalled();
   });

   it('should get placement with a given id', async () => {
      const result = await controller.getPlacementById(2);
      expect(result).toEqual({
         placement: {
             id: 2,
             place: expect.any(Number),
             points: expect.any(Number)
         },
      });
      expect(mockPlacementService.getPlacementFromId).toHaveBeenCalled();
   });

    it('should delete placement with a given id', async () => {
        const result = await controller.removePlacement(2);
        expect(result).toEqual({
            placement: {
                id: 2,
                place: expect.any(Number),
                points: expect.any(Number)
            },
        });
        expect(mockPlacementService.removePlacement).toHaveBeenCalled();
    });
});