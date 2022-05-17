"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreUserRelationRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            user_id: Validator_1.schema.number([Validator_1.rules.required()]),
            relatable_type: Validator_1.schema.enum(['follow', 'favourite', 'block'], [Validator_1.rules.required()]),
        });
        this.messages = {};
    }
}
exports.default = StoreUserRelationRequest;
//# sourceMappingURL=StoreUserRelationRequest.js.map