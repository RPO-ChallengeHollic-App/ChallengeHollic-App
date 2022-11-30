import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetGroupIdDecorator = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return parseInt(request['id']);
  },
);
