"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Comment"));
const StoreCommentRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Comment/StoreCommentRequest"));
class CommentsController {
    async index({}) {
        return await Comment_1.default.all();
    }
    async store({ response, request, auth }) {
        try {
            const userId = auth.user?.id;
            const commentData = await request.validate(StoreCommentRequest_1.default);
            const comment = await Comment_1.default.create({
                user_id: userId,
                post_id: commentData.post_id,
                comment_text: commentData.comment_text,
            });
            return response.withSuccess('comment creation success', comment);
        }
        catch (e) {
            if (e.messages) {
                return response.withError(e.messages);
            }
            return response.withError(e.message);
        }
    }
    async show({ response, params: { id } }) {
        try {
            const comment = await Comment_1.default.query().where({ post_id: id }).preload('user');
            return response.withSuccess(`found ${comment?.length} likes`, comment);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async update({ params: { id }, response, request, auth }) {
        try {
            const user = auth.user;
            const comment = await Comment_1.default.query().where({ id: id }).first();
            if (comment?.user_id === user?.id) {
                const commentData = request.only(['comment_text']);
                await comment?.merge(commentData);
                const userComment = await comment?.save();
                return response.withSuccess(`comment of ${user?.name} is updated successfully`, userComment);
            }
            return response.json({
                success: false,
                message: `${user?.name} don't have access to update this post.`,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async destroy({ params: { id }, response, auth }) {
        try {
            const user = auth.user;
            const comment = await Comment_1.default.query().where({ id: id }).first();
            if (comment?.user_id === user?.id) {
                await comment?.delete();
                return response.withSuccess(`post of ${user?.name} with ${comment?.id} is deleted successfully`, comment);
            }
            return response.json({
                success: false,
                message: `${user?.name} don't have access to delete this comments.`,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = CommentsController;
//# sourceMappingURL=CommentsController.js.map