import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PostDto} from "./dto/post.dto";
import { Post } from 'prisma';
@Injectable()
export class PostService {
    constructor(private _prisma: PrismaService) {}

    async getAllPosts(): Promise<Post[]>{
        const post = await this._prisma.role.findMany();
        return post;
    }

    async getPostById(postId: number): Promise<Post>{
        const post = await this._prisma.role.findUnique({
            where: {
                id: postId
            },
        });
        if (!post){
            throw new NotFoundException('Post not found')
        }
        return post;
    }

    async createNewPost(postDto:PostDto): Promise<Post>{
        try {
            return await this._prisma.post.create({
                data:{
                    id:postDto.postId,
                    name:postDto.postName,
                    FK_participent_id:postDto.participentId
                },
            });
        }catch (ex: any){
            throw new InternalServerErrorException('Post not created');
        }
    }

    async deletePost(postId: number): Promise<Post> {
        try {
            return await this._prisma.post.delete({
                where: {
                    id: postId,
                },
            });
        }catch (ex:any){
            throw new NotFoundException('Post not found');
        }
    }

    async updatePost(postId: number, postDto:PostDto){
        try {
            return await this._prisma.post.update({
                where: {
                    id: postId,
                },
                data:{
                    FK_participent_id: postDto.participentId,
                    id:postDto.postId,
                    name:postDto.postName

                },
            });
        }catch (ex: any){
            throw new NotFoundException('Post not found');
        }
    }
}
