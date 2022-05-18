"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfig = {
    connection: 'pg',
    connections: {
        pg: {
            client: 'pg',
            connection: {
                host: 'ec2-54-165-184-219.compute-1.amazonaws.com',
                port: 5432,
                user: 'pcmyijeseroese',
                password: 'adbd72c93a2fa2c8c0f658e7696739365c695293773a55caeeaad59a5e7e6f05',
                database: 'd6bad8db3pmqcv',
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: false,
            debug: false,
        },
    },
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map