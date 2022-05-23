"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const StoreUserRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/StoreUserRequest"));
const LoginUserRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/LoginUserRequest"));
class AuthController {
    async index({ response }) {
        try {
            const users = await User_1.default.query()
                .preload('profile')
                .preload('posts', (postsQuery) => {
                postsQuery.preload('comments', (commentsQuery) => {
                    commentsQuery.preload('user');
                }),
                    postsQuery.preload('reactions', (likesQuery) => {
                        likesQuery.preload('user');
                    });
            });
            return response.withSuccess(`Found ${users.length} users`, users);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async register({ request, response, auth }) {
        try {
            const userData = await request.validate(StoreUserRequest_1.default);
            const user = await User_1.default.create({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                is_active: false,
                follower_count: 0,
            });
            user?.sendVerificationEmail();
            const token = await auth.use('api').generate(user);
            await user.related('profile').create({ user_id: user.id });
            return response.json({
                success: true,
                message: 'Registration successful, check your email inbox for a verification email',
                token,
                user,
            });
        }
        catch (e) {
            if (e.messages) {
                return response.withError(e.messages);
            }
            return response.withError(e.message);
        }
    }
    async login({ request, response, auth }) {
        try {
            const requestData = await request.validate(LoginUserRequest_1.default);
            const token = await auth.use('api').attempt(requestData.email, requestData.password);
            const userData = await auth.user;
            return response.json({
                success: true,
                message: 'user creation success',
                token: token,
                user: userData,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async logout({ response, auth }) {
        try {
            const user = auth.user?.name;
            await auth.use('api').revoke();
            return response.json({
                success: true,
                message: `${user} logout successfully`,
                user,
            });
        }
        catch (e) {
            return response.json({ success: false, message: e.message });
        }
    }
    async update({}) { }
    async destroy({}) { }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map