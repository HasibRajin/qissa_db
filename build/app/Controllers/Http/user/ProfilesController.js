"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profile"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ProfilesController {
    async index({ response, auth }) {
        try {
            const profiles = await Profile_1.default.query().where({ user_id: auth.user?.id });
            return response.json({
                success: true,
                message: `Found  users`,
                profiles: profiles,
            });
        }
        catch (e) {
            return response.json({
                success: true,
                message: e.message,
            });
        }
    }
    async update({ request, response, auth }) {
        try {
            const userID = auth.user?.id;
            const user = await User_1.default.query().where({ id: userID }).first();
            const userData = request.only(['name', 'profile_pic']);
            user?.merge(userData);
            const profile = await Profile_1.default.query().where({ user_id: userID }).first();
            const profileData = request.only(['phone', 'date_of_birth', 'gender', 'education', 'address']);
            profile?.merge(profileData);
            const userProfile = await profile?.save();
            return response.withSuccess(`profile of ${user?.name} is updated successfully`, userProfile);
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async destroy({}) { }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map