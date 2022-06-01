"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const UserRelation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserRelation"));
class FollowSeeder extends Seeder_1.default {
    async run() {
        await UserRelation_1.default.createMany([
            {
                user_id: 1,
                relatable_id: 2,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 3,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 4,
                relatable_type: 'favourite',
            },
            {
                user_id: 1,
                relatable_id: 5,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 6,
                relatable_type: 'block',
            },
            {
                user_id: 1,
                relatable_id: 7,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 2,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 3,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 4,
                relatable_type: 'favourite',
            },
            {
                user_id: 1,
                relatable_id: 5,
                relatable_type: 'follow',
            },
            {
                user_id: 1,
                relatable_id: 6,
                relatable_type: 'block',
            },
            {
                user_id: 1,
                relatable_id: 7,
                relatable_type: 'follow',
            },
            {
                user_id: 2,
                relatable_id: 1,
                relatable_type: 'follow',
            },
            {
                user_id: 2,
                relatable_id: 4,
                relatable_type: 'favourite',
            },
            {
                user_id: 2,
                relatable_id: 5,
                relatable_type: 'follow',
            },
            {
                user_id: 2,
                relatable_id: 6,
                relatable_type: 'block',
            },
            {
                user_id: 2,
                relatable_id: 7,
                relatable_type: 'block',
            },
            {
                user_id: 3,
                relatable_id: 2,
                relatable_type: 'follow',
            },
            {
                user_id: 3,
                relatable_id: 1,
                relatable_type: 'block',
            },
            {
                user_id: 3,
                relatable_id: 4,
                relatable_type: 'favourite',
            },
            {
                user_id: 3,
                relatable_id: 5,
                relatable_type: 'follow',
            },
            {
                user_id: 3,
                relatable_id: 6,
                relatable_type: 'favourite',
            },
            {
                user_id: 3,
                relatable_id: 7,
                relatable_type: 'follow',
            },
            {
                user_id: 4,
                relatable_id: 2,
                relatable_type: 'block',
            },
            {
                user_id: 4,
                relatable_id: 3,
                relatable_type: 'follow',
            },
            {
                user_id: 4,
                relatable_id: 1,
                relatable_type: 'favourite',
            },
            {
                user_id: 4,
                relatable_id: 6,
                relatable_type: 'block',
            },
            {
                user_id: 4,
                relatable_id: 7,
                relatable_type: 'follow',
            },
            {
                user_id: 5,
                relatable_id: 2,
                relatable_type: 'follow',
            },
            {
                user_id: 5,
                relatable_id: 3,
                relatable_type: 'favourite',
            },
            {
                user_id: 5,
                relatable_id: 4,
                relatable_type: 'favourite',
            },
            {
                user_id: 5,
                relatable_id: 1,
                relatable_type: 'favourite',
            },
            {
                user_id: 5,
                relatable_id: 6,
                relatable_type: 'block',
            },
            {
                user_id: 5,
                relatable_id: 7,
                relatable_type: 'block',
            },
            {
                user_id: 6,
                relatable_id: 2,
                relatable_type: 'block',
            },
            {
                user_id: 6,
                relatable_id: 3,
                relatable_type: 'follow',
            },
            {
                user_id: 6,
                relatable_id: 4,
                relatable_type: 'block',
            },
            {
                user_id: 6,
                relatable_id: 5,
                relatable_type: 'follow',
            },
            {
                user_id: 6,
                relatable_id: 1,
                relatable_type: 'block',
            },
            {
                user_id: 6,
                relatable_id: 7,
                relatable_type: 'follow',
            },
        ]);
    }
}
exports.default = FollowSeeder;
//# sourceMappingURL=Follow.js.map