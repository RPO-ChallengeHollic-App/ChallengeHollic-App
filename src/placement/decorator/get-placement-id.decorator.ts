import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const GetPlacementId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    try {
      return parseInt(request.params['placementId']);
    } catch (err) {
      throw new ForbiddenException('Placement id should be a number');
    }
  },
);
