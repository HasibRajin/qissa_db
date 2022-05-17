"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Reaction"));
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class ReactionsController {
    async index({ response }) {
        try {
            const like = await Reaction_1.default.query().preload('user');
            return response.withSuccess(`found ${like.length} likes`, like);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async store({ request, response, auth }) {
        try {
            const user = auth.user;
            const postId = request.qs().post_id;
            const post = await Post_1.default.query().where({ id: postId }).first();
            const like = await Reaction_1.default.create({
                user_id: user?.id,
                post_id: post?.id,
            });
            if (like) {
                await Post_1.default.query().where({ id: postId }).increment('like', 1);
            }
            return response.withSuccess(`liking post with id: ${post?.id} success`, like);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async show({ response, params: { id } }) {
        try {
            const like = await Reaction_1.default.query().preload('user').where('post_id', id);
            return response.withSuccess(`found ${like.length} likes`, like);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async destroy({ params: { id }, response, auth }) {
        try {
            const user = auth.user;
            const like = await Reaction_1.default.query().where({ id: id }).first();
            if (like?.user_id === user?.id) {
                await like?.delete();
                await Post_1.default.query().where({ id: like?.post_id }).decrement('like', 1);
                return response.withSuccess(`Unlike successfully in ${like?.post_id} by ${user?.name}`, like);
            }
            return response.json({
                success: false,
                message: `${user?.name} doesn't have access to delete likes.`,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = ReactionsController;
//# sourceMappingURL=ReactionsController.js.map