"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreReactionRequestValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            post_id: Validator_1.schema.number([Validator_1.rules.required()]),
            relatable_type: Validator_1.schema.enum(['like', 'love'], [Validator_1.rules.required()]),
        });
        this.messages = {};
    }
}
exports.default = StoreReactionRequestValidator;
//# sourceMappingURL=StoreReactionRequestValidator.js.map