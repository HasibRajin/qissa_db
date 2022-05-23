"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMarkDriver = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_postmark_transport_1 = __importDefault(require("nodemailer-postmark-transport"));
class PostMarkDriver {
    constructor(config) {
        this.config = config;
        this.transporter = nodemailer_1.default.createTransport((0, nodemailer_postmark_transport_1.default)(this.config));
    }
    async send(message) {
        return this.transporter.sendMail(message);
    }
    close() {
        this.transporter.close();
        this.transporter = null;
    }
}
exports.PostMarkDriver = PostMarkDriver;
//# sourceMappingURL=index.js.map