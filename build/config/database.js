"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const url_parse_1 = __importDefault(require("url-parse"));
const DATABASE_URL = new url_parse_1.default(Env_1.default.get('DATABASE_URL'));
const databaseConfig = {
    connection: Env_1.default.get('DB_CONNECTION'),
    connections: {
        pg: {
            client: 'pg',
            connection: {
                host: DATABASE_URL.host,
                port: Number(''),
                user: DATABASE_URL.username,
                password: DATABASE_URL.password,
                database: DATABASE_URL.pathname.substr(1),
            },
            healthCheck: false,
        },
    },
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map