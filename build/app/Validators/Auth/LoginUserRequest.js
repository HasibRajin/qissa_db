"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginUserRequest {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [Validator_1.rules.email()]),
            password: Validator_1.schema.string({}, [Validator_1.rules.minLength(5)]),
        });
        this.cacheKey = this.ctx.routeKey;
        this.messages = {
            'email': 'enter a valid email',
            'password.minLength': 'please. enter five digit password',
        };
    }
}
exports.default = LoginUserRequest;
//# sourceMappingURL=LoginUserRequest.js.map