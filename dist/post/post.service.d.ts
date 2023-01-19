import { PrismaService } from "../prisma/prisma.service";
import { PostDto } from "./dto/post.dto";
import { Post } from 'prisma';
export declare class PostService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getAllPosts(): Promise<Post[]>;
    getPostById(postId: number): Promise<Post>;
    createNewPost(postDto: PostDto): Promise<Post>;
    deletePost(postId: number): Promise<Post>;
    updatePost(postId: number, postDto: PostDto): Promise<import(".prisma/client").Post>;
}
