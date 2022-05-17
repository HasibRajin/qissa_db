"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateProfileRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({});
        this.cacheKey = this.ctx.routeKey;
        this.messages = {};
    }
}
exports.default = UpdateProfileRequest;
//# sourceMappingURL=UpdateProfileRequest.js.map