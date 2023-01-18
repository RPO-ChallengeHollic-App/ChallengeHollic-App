import {createParamDecorator, ExecutionContext, ForbiddenException} from "@nestjs/common";

export const GetPostIdParamDecorator = createParamDecorator(
    (data: unknown,context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        if (isNaN(request.params['postId'])){
            throw new ForbiddenException('Post ID should be a number!');
        }
        return parseInt(request.params['postId']);

    },
);