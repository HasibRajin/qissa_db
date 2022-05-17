"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreProfileRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({});
        this.cacheKey = this.ctx.routeKey;
        this.messages = {};
    }
}
exports.default = StoreProfileRequest;
//# sourceMappingURL=StoreProfileRequest.js.map