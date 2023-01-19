import {Test, TestingModule} from "@nestjs/testing";
import {MemberService} from "./member.service";


describe('memberService', ()=>{
    let service: MemberService;
    const fakeMemberRepository={
        create: jest.fn().mockImplementation(dto => dto),
        update: jest.fn().mockImplementation(member =>Promise.resolve({id:1,...member})),
        delete: jest.fn().mockImplementation(id => id),
    };
    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
          providers:[
              MemberService,
          ]
        }).overrideProvider(MemberService).useValue(fakeMemberRepository).compile();

        service = module.get<MemberService>(MemberService);
    });
    it('should be defined',  ()=> {
        expect(service).toBeDefined();
    });
//CREATE
        it('should create new member and return it', async () => {
            const result=service.createNewMember({nickname:'jernej',userId:1,groupId:1})
            expect(result).toEqual({
                id:expect.any(Number),
                nickname: 'Jernej',
                userId: 1,
                groupId: 1
            })
    });
//UPDATE
    it('should update member and return it',  async ()=> {
        const result=service.updateMember(1,{nickname:'jernej',userId:1,groupId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            nickname: 'Jernej',
            userId: 1,
            groupId: 1
        })
    });
//GET BY ID
    it('should get members by id and return it',  async ()=> {
        const result=service.getMembersById(1)
        expect(result).toEqual({
            id:1
        })

    });
//GET ALL
    it('should get all members and return it',  async ()=> {
        const result=service.getAllMembers()
        expect(result).toEqual({
            id:expect.any(Number),
        })
    });
//DELETE
        it('should delete a member and return it',  async()=> {
            const result = service.deleteMember(1)
            expect(result).toEqual({
                id: expect.any(Number),
            })
        });
});
