import {Test, TestingModule} from "@nestjs/testing";
import {PostService} from "./post.service";


describe('postService', ()=>{
    let service: PostService;
    const fakePostRepository={
        create: jest.fn().mockImplementation(dto => dto),
        update: jest.fn().mockImplementation(member =>Promise.resolve({id:1,...member})),
        delete: jest.fn().mockImplementation(id => id),
    };
    beforeEach(async () =>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PostService,
            ]
        }).overrideProvider(PostService).useValue(fakePostRepository).compile();

        service = module.get<PostService>(PostService);
    });
    it('should be defined',  ()=> {
        expect(service).toBeDefined();
    });
//CREATE
    it('should create new member and return it', async () => {
        const result=service.createNewPost({postId:1,postName:'jernej',participentId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            nickname: 'Jernej',
            userId: 1,
            groupId: 1
        })
    });
//UPDATE
    it('should update member and return it',  async ()=> {
        const result=service.updatePost(1,{postId:1,postName:'jernej',participentId:1})
        expect(result).toEqual({
            id:expect.any(Number),
            nickname: 'Jernej',
            userId: 1,
            groupId: 1
        })
    });
//GET BY ID
    it('should get members by id and return it',  async ()=> {
        const result=service.getPostById(1)
        expect(result).toEqual({
            id:1
        })

    });
//GET ALL
    it('should get all members and return it',  async ()=> {
        const result=service.getAllPosts()
        expect(result).toEqual({
            id:expect.any(Number),
        })
    });
//DELETE
    it('should delete a member and return it',  async()=> {
        const result = service.deletePost(1)
        expect(result).toEqual({
            id: expect.any(Number),
        })
    });
});
