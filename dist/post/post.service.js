"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostService = class PostService {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    async getAllPosts() {
        const post = await this._prisma.role.findMany();
        return post;
    }
    async getPostById(postId) {
        const post = await this._prisma.role.findUnique({
            where: {
                id: postId
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async createNewPost(postDto) {
        try {
            return await this._prisma.post.create({
                data: {
                    id: postDto.postId,
                    name: postDto.postName,
                    FK_participent_id: postDto.participentId
                },
            });
        }
        catch (ex) {
            throw new common_1.InternalServerErrorException('Post not created');
        }
    }
    async deletePost(postId) {
        try {
            return await this._prisma.post.delete({
                where: {
                    id: postId,
                },
            });
        }
        catch (ex) {
            throw new common_1.NotFoundException('Post not found');
        }
    }
    async updatePost(postId, postDto) {
        try {
            return await this._prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    FK_participent_id: postDto.participentId,
                    id: postDto.postId,
                    name: postDto.postName
                },
            });
        }
        catch (ex) {
            throw new common_1.NotFoundException('Post not found');
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map