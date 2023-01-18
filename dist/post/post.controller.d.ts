import { PostDto } from "./dto/post.dto";
import { PostService } from "./post.service";
import { Post } from 'prisma';
export declare class PostController {
    private _postService;
    constructor(_postService: PostService);
    getAllPost(): Promise<Post[]>;
    getPostsId(postId: number): Promise<Post>;
    createPost(postDto: PostDto): Promise<{
        message: Post;
    }>;
    deletePost(postId: number): Promise<void>;
    updatePost(postId: number, postDto: PostDto): Promise<{
        post: Post;
    }>;
}
