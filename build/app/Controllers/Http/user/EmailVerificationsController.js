"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class EmailVerificationsController {
    async confirm({ request, params, view }) {
        if (request.hasValidSignature()) {
            const user = await User_1.default.findByOrFail('email', params.email);
            if (!user.is_active) {
                user.is_active = true;
                await user.save();
                return view.render('emails/auth/success', { message: 'activation success!' });
            }
            else {
                return view.render('emails/auth/success', { message: 'Account was already verified!' });
            }
        }
        else {
            return view.render('emails/auth/success', { message: 'invalid token!' });
        }
    }
}
exports.default = EmailVerificationsController;
//# sourceMappingURL=EmailVerificationsController.js.map