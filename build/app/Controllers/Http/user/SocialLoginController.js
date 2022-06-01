"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const faker_1 = __importDefault(require("@faker-js/faker"));
class SocialLoginController {
    async index({ params: { drive }, response, ally }) {
        try {
            if (drive === 'facebook') {
                return ally.use(drive).redirect((redirectRequest) => {
                    redirectRequest.scopes(['email']);
                });
            }
            return ally.use(drive).redirect();
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async callback({ params: { drive }, response, ally, auth }) {
        try {
            const driveName = ally.use(drive);
            if (driveName.accessDenied()) {
                return 'Access was denied';
            }
            if (driveName.stateMisMatch()) {
                return 'Request expired. Retry again';
            }
            if (driveName.hasError()) {
                return driveName.getError();
            }
            const driveUser = await driveName.user();
            if (!driveUser.email) {
                return response.withError("login failed. We couldn't find any email attach to your account");
            }
            const user = await User_1.default.firstOrCreate({
                email: driveUser.email,
            }, {
                name: driveUser.name,
                password: faker_1.default.internet.password(8),
                rememberMeToken: driveUser.token.token,
                is_active: true,
                profile_pic: driveUser.avatarUrl,
            });
            const token = await auth.use('api').generate(user);
            await user.related('profile').create({ user_id: user.id });
            return response.withSuccess('user login success', { user, token });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = SocialLoginController;
//# sourceMappingURL=SocialLoginController.js.map