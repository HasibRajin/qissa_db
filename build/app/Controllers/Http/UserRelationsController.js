"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserRelation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserRelation"));
const StoreUserRelationRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/StoreUserRelationRequest"));
class UserRelationsController {
    async index({ request, response, auth }) {
        try {
            const relatableId = auth.user?.id;
            const data = request.qs().relatable_type;
            const re = new RegExp(/^(follow|follower|favourite|block)$/g);
            if (!re.test(data)) {
                return response.withError('invalid relatable_type');
            }
            else if (data === 'follower') {
                const follower = await UserRelation_1.default.query()
                    .preload('follower')
                    .where({ user_id: relatableId })
                    .andWhere({ relatable_type: 'follow' });
                return response.withSuccess(`found ${follower.length} followers`, follower);
            }
            const relationData = await UserRelation_1.default.query()
                .preload('user')
                .where({ relatable_id: relatableId })
                .andWhere({ relatable_type: data });
            return response.withSuccess(`found ${relationData.length} ${data}`, relationData);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async store({ request, response, auth }) {
        try {
            const relatableId = auth.user?.id;
            const payload = await request.validate(StoreUserRelationRequest_1.default);
            const user = await User_1.default.find(payload.user_id);
            const hasRelation = await UserRelation_1.default.query()
                .where({ user_id: payload.user_id })
                .andWhere({ relatable_id: relatableId })
                .first();
            if (hasRelation && !(hasRelation.relatable_type === payload.relatable_type)) {
                await hasRelation.delete();
            }
            const userRelation = await UserRelation_1.default.create({
                user_id: user?.id,
                relatable_id: relatableId,
                relatable_type: payload.relatable_type,
            });
            if (userRelation && payload.relatable_type === 'follow') {
                await User_1.default.query().where({ id: user?.id }).increment('follower_count', 1);
            }
            return response.withSuccess(`${auth.user?.name} successfully ${userRelation.relatable_type} ${user?.name}  `, userRelation);
        }
        catch (e) {
            if (e.messages) {
                return response.withError(e.messages);
            }
            return response.withError(e.message);
        }
    }
    async show({ params: { id }, response, auth }) {
        try {
            const relatableID = auth.user?.id;
            const relationData = await UserRelation_1.default.query()
                .preload('user')
                .where({ user_id: id })
                .andWhere({ relatable_id: relatableID })
                .first();
            return response.withSuccess(`found relation `, relationData);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async destroy({ params: { id }, response, auth }) {
        try {
            const relatableId = auth.user?.id;
            const relationData = await UserRelation_1.default.query().where({ id: id }).first();
            if (relationData?.relatable_id === relatableId) {
                if (relationData?.relatable_type === 'follow') {
                    await User_1.default.query().where({ id: relationData.user_id }).decrement('follower_count', 1);
                }
                await relationData?.delete();
                return response.withSuccess(`${auth.user?.name} successfully un${relationData?.relatable_type} ${relationData?.user_id}`, relationData);
            }
            return response.json({
                success: false,
                message: `${auth.user?.name} doesn't have access to un${relationData?.relatable_type}.`,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
}
exports.default = UserRelationsController;
//# sourceMappingURL=UserRelationsController.js.map