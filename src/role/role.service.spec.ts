import {Test, TestingModule} from "@nestjs/testing";
import {RoleService} from "./role.service";


describe('postService', ()=>{
    let service: RoleService;
    const fakeRoleRepository={
        create: jest.fn().mockImplementation(dto => dto),
        update: jest.fn().mockImplementation(member =>Promise.resolve({id:1,...member})),
        delete: jest.fn().mockImplementation(id => id),
    };
    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                RoleService,
            ]
        }).overrideProvider(RoleService).useValue(fakeRoleRepository).compile();

        service = module.get<RoleService>(RoleService);
    });
    it('should be defined',  ()=> {
        expect(service).toBeDefined();
    });
//CREATE
    it('should create new member and return it', async () => {
        const result=service.createNewRole({memberId:1,memberTypeId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            memberId: 1,
            memberTypeId: 1
        })
    });
//UPDATE
    it('should update member and return it',  async ()=> {
        const result=service.updateRole(1,{memberId:1,memberTypeId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            memberId: 1,
            memberTypeId: 1
        })
    });
//GET BY ID
    it('should get members by id and return it',  async ()=> {
        const result=service.getRolesById(1)
        expect(result).toEqual({
            id:1
        })

    });
//GET ALL
    it('should get all members and return it',  async ()=> {
        const result=service.getAllRoles()
        expect(result).toEqual({
            id:expect.any(Number),
        })
    });
//DELETE
    it('should delete a member and return it',  async()=> {
        const result = service.deleteRole(1)
        expect(result).toEqual({
            id: expect.any(Number),
        })
    });
});
