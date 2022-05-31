"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pusher_1 = __importDefault(require("pusher"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
let pusher = new pusher_1.default({
    appId: Env_1.default.get('PUSHER_APP_ID', ''),
    key: Env_1.default.get('PUSHER_KEY', ''),
    secret: Env_1.default.get('PUSHER_SECRET', ''),
    cluster: Env_1.default.get('PUSHER_CLUSTER'),
    encrypted: true,
});
class User {
    async onNewUser(user) {
        await pusher.trigger('qissabd', 'user', {
            user: user.name,
            email: user.email,
            id: user.id,
        });
    }
    async onNewPost(post) {
        await pusher.trigger('qissabd', 'post', {
            postId: post.id,
            userID: post.userID,
            message: post.message,
        });
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map