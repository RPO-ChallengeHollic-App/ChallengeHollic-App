import {Test, TestingModule} from "@nestjs/testing";
import {RoleController} from "./role.controller";
import {RoleService} from "./role.service";



describe('postController', ()=>{
    let controller: RoleController;

    const fakeRoleService={
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
            controllers:[RoleController],
            providers:[RoleService]
        }).overrideProvider(RoleService).useValue(fakeRoleService).compile();

        controller = module.get<RoleController>(RoleController);
    });
    it('should be defined',  ()=> {
        expect(controller).toBeDefined();
    });
//CREATE
    it('should create a role',  ()=> {
        expect(controller.createRole({memberId:1,memberTypeId:1})).toEqual({
            id:expect.any(Number),
            memberId: 1,
            memberTypeId: 1
        })
    });
//UPDATE
    it('should update role',  ()=> {
        expect(controller.updateRole(1,{memberId:1,memberTypeId:1})).toEqual({
            id:expect.any(Number),
            memberId: 1,
            memberTypeId: 1
        })
    });
//GET BY ID
    it('should get role by id',  ()=> {
        expect(controller.getRolesId(1)).toEqual({
            id:expect.any(Number)
        })

    });
//GET ALL
    it('should get all roles',  ()=> {
        expect(controller.getAllRoles()).toEqual({
            id:expect.any(Number)
        })
//DELETE
        it('should delete a role',  ()=> {
            expect(controller.deleteRole(1)).toEqual({
                id:expect.any(Number),
            })
        });
    });
});