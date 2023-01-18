"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostIdParamDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.GetPostIdParamDecorator = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (isNaN(request.params['postId'])) {
        throw new common_1.ForbiddenException('Post ID should be a number!');
    }
    return parseInt(request.params['postId']);
});
//# sourceMappingURL=get-post-id.param.decorator.js.map