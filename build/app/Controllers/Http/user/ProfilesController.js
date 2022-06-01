"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profile"));
class ProfilesController {
    async index({ response, auth }) {
        try {
            const profiles = await Profile_1.default.query().where({ user_id: auth.user?.id }).first();
            return response.json({
                success: true,
                message: `Found  profile`,
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
            const loginUser = auth.user;
            const userData = request.only(['name', 'profile_pic']);
            loginUser?.merge(userData);
            const user = await loginUser?.save();
            const profileData = request.only(['phone', 'date_of_birth', 'gender', 'education', 'address']);
            const profile = await loginUser?.related('profile').updateOrCreate({}, {
                user_id: loginUser?.id,
                phone: profileData.phone,
                date_of_birth: profileData.date_of_birth,
                gender: profileData.gender,
                education: profileData.education,
                address: profileData.address,
            });
            return response.withSuccess(`profile of ${loginUser?.name} is updated successfully`, {
                user,
                profile,
            });
        }
        catch (e) {
            return response.withError(e.message);
        }
    }
    async destroy({}) { }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map