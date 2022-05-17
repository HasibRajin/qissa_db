"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionFactory = exports.FollowFactory = exports.PostFactory = exports.UserFactory = void 0;
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const UserRelation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserRelation"));
const Reaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Reaction"));
exports.UserFactory = Factory_1.default.define(User_1.default, ({ faker }) => {
    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '12345',
    };
}).build();
exports.PostFactory = Factory_1.default.define(Post_1.default, ({ faker }) => {
    return {
        user_id: 6,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        like: 0,
    };
}).build();
exports.FollowFactory = Factory_1.default.define(UserRelation_1.default, ({}) => {
    return {
        user_id: 5,
        follower_id: 9,
    };
}).build();
exports.ReactionFactory = Factory_1.default.define(Reaction_1.default, ({}) => {
    return {
        user_id: 5,
        post_id: 35,
    };
}).build();
//# sourceMappingURL=index.js.map