"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreCommentRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            comment_text: Validator_1.schema.string({}, [Validator_1.rules.required()]),
            post_id: Validator_1.schema.number([Validator_1.rules.required()]),
        });
        this.cacheKey = this.ctx.routeKey;
        this.messages = {};
    }
}
exports.default = StoreCommentRequest;
//# sourceMappingURL=StoreCommentRequest.js.map