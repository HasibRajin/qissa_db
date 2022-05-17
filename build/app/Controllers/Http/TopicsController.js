"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Topic_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Topic"));
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class TopicsController {
    async index({}) {
        return Topic_1.default.all();
    }
    async store({ request, response }) {
        try {
            const topicData = request.only(['name']);
            const topic = await Topic_1.default.create(topicData);
            response.withSuccess('topic creation success.', topic);
        }
        catch (e) {
            response.withError(e.message);
        }
    }
    async show({ params: { id }, response, request }) {
        try {
            const post = await Post_1.default.query()
                .where({ topic_id: id })
                .orderBy([
                {
                    column: 'created_at',
                    order: 'desc',
                },
            ])
                .paginate(request.qs().current_page, request.qs().limit);
            return response.withSuccess(`Found ${post.length} post`, post);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async update({ params: { id }, response, request }) {
        try {
            const topic = await Topic_1.default.query().where({ id: id }).first();
            const topicData = request.only(['name']);
            topic?.merge(topicData);
            const updateTopic = await topic?.save();
            return response.withSuccess(`topic of ${topic?.id} is updated successfully`, updateTopic);
        }
        catch (e) {
            response.withError(e.message);
        }
    }
    async destroy({ params: { id }, response }) {
        try {
            const topic = await Topic_1.default.query().where({ id: id }).first();
            await topic?.delete();
            response.withSuccess('topic deletion success.', topic);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = TopicsController;
//# sourceMappingURL=TopicsController.js.map