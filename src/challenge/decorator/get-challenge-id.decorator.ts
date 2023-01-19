import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const GetChallengeId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    try {
      return parseInt(request.params['challengeId']);
    } catch (err) {
      throw new ForbiddenException('Challenge id should be a number');
    }
  },
);
