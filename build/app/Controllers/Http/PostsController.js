"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const StorePostRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Post/StorePostRequest"));
class PostsController {
    async index({ request, response }) {
        try {
            const id = request.qs().id;
            if (id) {
                const post = await Post_1.default.query()
                    .preload('reactions', (reactionQuery) => {
                    reactionQuery.where('user_id', id);
                })
                    .preload('comments')
                    .orderBy([
                    {
                        column: 'created_at',
                        order: 'desc',
                    },
                ])
                    .paginate(request.qs().current_page, request.qs().limit);
                return response.withSuccess(`Found ${post.length} posts`, post);
            }
            const post = await Post_1.default.query()
                .preload('comments')
                .orderBy([
                {
                    column: 'created_at',
                    order: 'desc',
                },
            ])
                .paginate(request.qs().current_page, request.qs().limit);
            return response.withSuccess(`Found ${post.length} posts`, post);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async store({ response, request, auth }) {
        try {
            const userId = auth.user?.id;
            const postData = await request.validate(StorePostRequest_1.default);
            const post = await Post_1.default.create({
                user_id: userId,
                topic_id: postData.topic_id,
                title: postData.title,
                details: postData.details,
                like: 0,
                image: postData.image,
            });
            return response.withSuccess('post creation success', post);
        }
        catch (e) {
            if (e.messages) {
                return response.withError(e.messages);
            }
            return response.withError(e.message);
        }
    }
    async show({ params: { id }, response, request }) {
        try {
            const likerId = request.qs().id;
            if (id) {
                const post = await Post_1.default.query()
                    .where({ user_id: id })
                    .preload('reactions', (reactionsQuery) => {
                    reactionsQuery.where('user_id', likerId);
                })
                    .orderBy([
                    {
                        column: 'created_at',
                        order: 'desc',
                    },
                ])
                    .paginate(request.qs().current_page, request.qs().limit);
                return response.withSuccess(`Found ${post.length} posts`, post);
            }
            const post = await Post_1.default.query()
                .where({ user_id: id })
                .orderBy([
                {
                    column: 'created_at',
                    order: 'desc',
                },
            ])
                .paginate(request.qs().current_page, request.qs().limit);
            return response.withSuccess(`Found ${post.length} posts`, post);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async update({ params: { id }, response, request, auth }) {
        try {
            const user = auth.user;
            const post = await Post_1.default.query().where({ id: id }).first();
            if (post?.user_id === user?.id) {
                const postData = request.only(['title', 'details', 'image']);
                post?.merge(postData);
                const userPost = await post?.save();
                return response.withSuccess(`post of ${user?.name} is updated successfully`, userPost);
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
            const post = await Post_1.default.query().where({ id: id }).first();
            if (post?.user_id === user?.id) {
                await post?.delete();
                return response.withSuccess(`post of ${user?.name} with ${post?.id} is deleted successfully`, post);
            }
            return response.json({
                success: false,
                message: `${user?.name} don't have access to delete this post.`,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map