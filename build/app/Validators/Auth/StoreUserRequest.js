"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreUserRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.reporter = Validator_1.validator.reporters.api;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({}, [
                Validator_1.rules.alpha({
                    allow: ['space', 'underscore', 'dash'],
                }),
            ]),
            email: Validator_1.schema.string({}, [Validator_1.rules.email(), Validator_1.rules.unique({ table: 'users', column: 'email' })]),
            password: Validator_1.schema.string({}, [Validator_1.rules.confirmed('Confirm_password'), Validator_1.rules.minLength(5)]),
        });
        this.cacheKey = this.ctx.routeKey;
        this.messages = {
            'email': 'enter a valid email',
            'email.unique': 'email not available',
            'password.minLength': 'please. enter five digit password',
        };
    }
}
exports.default = StoreUserRequest;
//# sourceMappingURL=StoreUserRequest.js.map