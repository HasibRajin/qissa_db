"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async ({ view }) => {
    return view.render('home');
});
Route_1.default.group(() => {
    Route_1.default.get('/user', 'user/AuthController.index');
    Route_1.default.post('/signup', 'user/AuthController.register');
    Route_1.default.post('/login', 'user/AuthController.login');
    Route_1.default.get('/verify-email/:email', 'user/EmailVerificationsController.confirm').as('verifyEmail');
    Route_1.default.get('/post', 'PostsController.index');
    Route_1.default.get('/topics', 'TopicsController.index');
}).prefix('api');
Route_1.default.group(() => {
    Route_1.default.post('/logout', 'AuthController.logout');
    Route_1.default.put('/profile', 'ProfilesController.update');
    Route_1.default.resource('/comment', 'CommentsController').apiOnly();
    Route_1.default.resource('/post', 'PostsController').apiOnly().except(['index']);
    Route_1.default.resource('/reaction', 'ReactionsController').apiOnly().except(['update']);
    Route_1.default.resource('/relation', 'UserRelationsController').apiOnly().except(['update']);
    Route_1.default.resource('/topic', 'TopicsController').apiOnly().except(['index']);
})
    .prefix('api')
    .middleware('auth');
//# sourceMappingURL=routes.js.map