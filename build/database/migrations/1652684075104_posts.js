"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Posts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'posts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .notNullable();
            table.integer('topic_id').unsigned().references('id').inTable('topics').onDelete('CASCADE');
            table.text('title', 'longtext').index('posts_title');
            table.text('details', 'longtext').notNullable().index('posts_details');
            table.integer('like_count');
            table.string('image');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Posts;
//# sourceMappingURL=1652684075104_posts.js.map