import {createParamDecorator, ExecutionContext, ForbiddenException} from "@nestjs/common";

export const GetMemberTypeIdParamDecorator = createParamDecorator(
    (data: unknown,context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        if (isNaN(request.params['memberTypeId'])){
            throw new ForbiddenException('Member Type ID should be a number!');
        }
        return parseInt(request.params['memberTypeId']);

    },
);