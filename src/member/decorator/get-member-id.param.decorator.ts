import {createParamDecorator, ExecutionContext, ForbiddenException} from "@nestjs/common";

export const GetMemberIdParamDecorator = createParamDecorator(
    (data: unknown,context: ExecutionContext)=>{
            const request = context.switchToHttp().getRequest();
            if (isNaN(request.params['memberId'])){
                throw new ForbiddenException('Member ID should be a number!');
            }
            return parseInt(request.params['memberId']);

    },
);