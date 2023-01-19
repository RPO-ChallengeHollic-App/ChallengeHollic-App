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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const get_post_id_param_decorator_1 = require("../post/decorator/get-post-id.param.decorator");
const post_dto_1 = require("./dto/post.dto");
const post_service_1 = require("./post.service");
const prisma_1 = require("prisma");
let PostController = class PostController {
    constructor(_postService) {
        this._postService = _postService;
    }
    async getAllPost() {
        return await this._postService.getAllPosts();
    }
    async getPostsId(postId) {
        return await this._postService.getPostById(postId);
    }
    async createPost(postDto) {
        const newPost = await this._postService.createNewPost(postDto);
        return {
            message: newPost,
        };
    }
    async deletePost(postId) {
        await this._postService.deletePost(postId);
    }
    async updatePost(postId, postDto) {
        const updatePost = await this._postService.updatePost(postId, postDto);
        return {
            post: updatePost,
        };
    }
};
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPost", null);
__decorate([
    (0, common_1.Get)(':postId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_post_id_param_decorator_1.GetPostIdParamDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsId", null);
__decorate([
    (0, prisma_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, get_post_id_param_decorator_1.GetPostIdParamDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Patch)(':postId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_post_id_param_decorator_1.GetPostIdParamDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, post_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map