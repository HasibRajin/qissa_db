"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Reaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Reaction"));
const Comment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Comment"));
class Post extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Post.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Post.prototype, "topic_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Post.prototype, "details", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Post.prototype, "like", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Post.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Reaction_1.default, {
        foreignKey: 'post_id',
    }),
    __metadata("design:type", Object)
], Post.prototype, "reactions", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Comment_1.default, {
        foreignKey: 'post_id',
    }),
    __metadata("design:type", Object)
], Post.prototype, "comments", void 0);
exports.default = Post;
//# sourceMappingURL=Post.js.map