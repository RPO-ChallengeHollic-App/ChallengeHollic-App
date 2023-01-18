import {createParamDecorator, ExecutionContext, ForbiddenException} from "@nestjs/common";

export const GetRoleIdParamDecorator = createParamDecorator(
    (data: unknown,context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        if (isNaN(request.params['roleId'])){
            throw new ForbiddenException('Role ID should be a number!');
        }
        return parseInt(request.params['roleId']);

    },
);