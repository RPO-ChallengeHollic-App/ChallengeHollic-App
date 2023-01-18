import {Test, TestingModule} from "@nestjs/testing";
import {MemberTypeService} from "./member-type.service";
import {MemberTypeController} from "./member-type.controller";

describe('postController', ()=>{
    let controller: MemberTypeController;

    const fakeMemberTypeService={
        create: jest.fn(dto =>{
            return{
                FK_user_id: Date.now(),
                ...dto
            };
        }),
        update: jest.fn((id ,dto) =>({
            id,
            ...dto
        })),
        delete: jest.fn((id ) =>({
            id,
        })),
    };

    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
            controllers:[MemberTypeController],
            providers:[MemberTypeService]
        }).overrideProvider(MemberTypeService).useValue(fakeMemberTypeService).compile();

        controller = module.get<MemberTypeController>(MemberTypeController);
    });
    it('should be defined',  ()=> {
        expect(controller).toBeDefined();
    });
//CREATE
    it('should create a role',  ()=> {
        expect(controller.createMemberType({type:'test',memberTypeId:1})).toEqual({
            id:expect.any(Number),
            type:'test',
            memberTypeId: 1
        })
    });
//UPDATE
    it('should update role',  ()=> {
        expect(controller.updateMemberType(1,{type:'test',memberTypeId:1})).toEqual({
            id:expect.any(Number),
            type:'test',
            memberTypeId: 1
        })
    });
//GET BY ID
    it('should get role by id',  ()=> {
        expect(controller.getMemberTypesId(1)).toEqual({
            id:expect.any(Number)
        })

    });
//GET ALL
    it('should get all roles',  ()=> {
        expect(controller.getAllMemberTypes()).toEqual({
            id:expect.any(Number)
        })
//DELETE
        it('should delete a role',  ()=> {
            expect(controller.deleteMemberType(1)).toEqual({
                id:expect.any(Number),
            })
        });
    });
});