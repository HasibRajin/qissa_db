"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
    }
    async boot() {
        const Response = this.app.container.use('Adonis/Core/Response');
        Response.macro('withSuccess', function (message, data = undefined, status = 200) {
            let response = { success: true, message };
            if (data !== undefined) {
                response['data'] = data;
            }
            this.status(status).json(response);
            return this;
        });
        Response.macro('withError', function (message, status = 200) {
            let response = { success: false, message };
            this.status(status).json(response);
            return this;
        });
    }
    async ready() {
    }
    async shutdown() {
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map