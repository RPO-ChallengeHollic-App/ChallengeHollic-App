import {Test, TestingModule} from "@nestjs/testing";
import {MemberTypeService} from "./member-type.service";


describe('postService', ()=>{
    let service: MemberTypeService;
    const fakeRoleRepository={
        create: jest.fn().mockImplementation(dto => dto),
        update: jest.fn().mockImplementation(member =>Promise.resolve({id:1,...member})),
        delete: jest.fn().mockImplementation(id => id),
    };
    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                MemberTypeService,
            ]
        }).overrideProvider(MemberTypeService).useValue(fakeRoleRepository).compile();

        service = module.get<MemberTypeService>(MemberTypeService);
    });
    it('should be defined',  ()=> {
        expect(service).toBeDefined();
    });
//CREATE
    it('should create new member and return it', async () => {
        const result=service.createNewMemberType({type:'test',memberTypeId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            type:'test',
            memberTypeId: 1
        })
    });
//UPDATE
    it('should update member and return it',  async ()=> {
        const result=service.updateMemberType(1,{type:'test',memberTypeId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            type:'test',
            memberTypeId: 1
        })
    });
//GET BY ID
    it('should get members by id and return it',  async ()=> {
        const result=service.getMemberTypesId(1)
        expect(result).toEqual({
            id:1
        })

    });
//GET ALL
    it('should get all members and return it',  async ()=> {
        const result=service.getAllMemberTypes()
        expect(result).toEqual({
            id:expect.any(Number),
        })
    });
//DELETE
    it('should delete a member and return it',  async()=> {
        const result = service.deleteMemberType(1)
        expect(result).toEqual({
            id: expect.any(Number),
        })
    });
});
