"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoleIdParamDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.GetRoleIdParamDecorator = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (isNaN(request.params['roleId'])) {
        throw new common_1.ForbiddenException('Role ID should be a number!');
    }
    return parseInt(request.params['roleId']);
});
//# sourceMappingURL=get-role-id.param.decorator.js.map