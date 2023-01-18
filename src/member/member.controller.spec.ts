import {Test, TestingModule} from "@nestjs/testing";
import {MemberController} from "./member.controller";
import {MemberService} from "./member.service";



describe('memberController', ()=>{
    let controller: MemberController;

    const fakeMemberService={
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
        // get:jest.fn((id ,dto) =>({
        //     id,
        //     ...dto
        // })),
    };

    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
            controllers:[MemberController],
            providers:[MemberService]
        }).overrideProvider(MemberService).useValue(fakeMemberService).compile();

        controller = module.get<MemberController>(MemberController);
    });
    it('should be defined',  ()=> {
        expect(controller).toBeDefined();
    });
//CREATE
    it('should create a member',  ()=> {
        expect(controller.createNewMember({nickname:'jernej',userId:1,groupId:1})).toEqual({
            id:expect.any(Number),
            nickname: 'Jernej',
            userId: 1,
            groupId: 1
        })
    });
//UPDATE
    it('should update member',  ()=> {
        expect(controller.updateMember(1,{nickname:'jernej',userId:1,groupId:1})).toEqual({
            id:expect.any(Number),
            nickname: 'Jernej',
            userId: 1,
            groupId: 1
        })
    });
//GET BY ID
    it('should get members by id',  ()=> {
        expect(controller.getMembersId(1)).toEqual({
            id:expect.any(Number)
        })

    });
//GET ALL
    it('should get all members',  ()=> {
        expect(controller.getAllMembers()).toEqual({
            id:expect.any(Number)
        })
//DELETE
    it('should delete a member',  ()=> {
            expect(controller.deleteMember(1)).toEqual({
                id:expect.any(Number),
            })
        });
    });
});