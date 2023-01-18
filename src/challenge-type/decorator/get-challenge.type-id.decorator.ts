import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const GetChallengeTypeId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    try {
      return parseInt(request.params['challengeTypeId']);
    } catch (err) {
      throw new ForbiddenException('Challenge id should be a number');
    }
  },
);
