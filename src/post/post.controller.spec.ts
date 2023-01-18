import {Test, TestingModule} from "@nestjs/testing";
import {PostController} from "./post.controller";
import {PostService} from "./post.service";



describe('postController', ()=>{
    let controller: PostController;

    const fakePostService={
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
            controllers:[PostController],
            providers:[PostService]
        }).overrideProvider(PostService).useValue(fakePostService).compile();

        controller = module.get<PostController>(PostController);
    });
    it('should be defined',  ()=> {
        expect(controller).toBeDefined();
    });
//CREATE
    it('should create a post',  ()=> {
        expect(controller.createPost({postId:1,postName:'jernej',participentId:1})).toEqual({
            id:expect.any(Number),
            postName: 'Jernej',
            postId: 1,
            participentId: 1
        })
    });
//UPDATE
    it('should update post',  ()=> {
        expect(controller.updatePost(1,{postId:1,postName:'jernej',participentId:1})).toEqual({
            id:expect.any(Number),
            postName: 'Jernej',
            postId: 1,
            participentId: 1
        })
    });
//GET BY ID
    it('should get post by id',  ()=> {
        expect(controller.getPostsId(1)).toEqual({
            id:expect.any(Number)
        })

    });
//GET ALL
    it('should get all posts',  ()=> {
        expect(controller.getAllPost()).toEqual({
            id:expect.any(Number)
        })
//DELETE
        it('should delete a post',  ()=> {
            expect(controller.deletePost(1)).toEqual({
                id:expect.any(Number),
            })
        });
    });
});