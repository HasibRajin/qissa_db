"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Reactions extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'reactions';
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
            table
                .integer('post_id')
                .unsigned()
                .references('id')
                .inTable('posts')
                .onDelete('CASCADE')
                .notNullable();
            table.unique(['user_id', 'post_id']);
            table.enum('reaction_type', ['like', 'love']);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Reactions;
//# sourceMappingURL=1652684163768_reactions.js.map