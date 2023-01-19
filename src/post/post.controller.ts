import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch} from '@nestjs/common';

import {GetPostIdParamDecorator} from "../post/decorator/get-post-id.param.decorator";
import {PostDto} from "./dto/post.dto";
import {PostService} from "./post.service";
import { Post } from 'prisma';


@Controller('post')
export class PostController {
    constructor(private _postService: PostService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllPost(): Promise<Post[]>{
        return await this._postService.getAllPosts()
    }

    @Get(':postId')
    @HttpCode(HttpStatus.OK)
    async getPostsId(@GetPostIdParamDecorator() postId: number){
        return await this._postService.getPostById(postId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() postDto:PostDto){
        const newPost = await this._postService.createNewPost(postDto)
        return {
            message: newPost,
        };
    }

    @Delete(':postId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePost(@GetPostIdParamDecorator() postId: number): Promise<void>{
        await this._postService.deletePost(postId);
    }

    @Patch(':postId')
    @HttpCode(HttpStatus.OK)
    async updatePost(@GetPostIdParamDecorator() postId: number,@Body() postDto: PostDto):Promise<{post: Post}>{
        const updatePost = await this._postService.updatePost(postId,postDto);
        return {
            post: updatePost,
        };
    }

}
