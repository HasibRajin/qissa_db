"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StorePostRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            topic_id: Validator_1.schema.number(),
            title: Validator_1.schema.string(),
            details: Validator_1.schema.string(),
            image: Validator_1.schema.string(),
        });
        this.cacheKey = this.ctx.routeKey;
        this.messages = {
            title: 'enter a valid title',
            details: 'please. details',
        };
    }
}
exports.default = StorePostRequest;
//# sourceMappingURL=StorePostRequest.js.map