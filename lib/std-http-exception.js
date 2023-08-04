"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdHttpException = void 0;
const common_1 = require("@nestjs/common");
class StdHttpException extends common_1.HttpException {
    constructor(data) {
        super(data.message, data.status);
        this.name = data.code;
        this.code = data.code;
    }
    getResponse() {
        return {
            message: this.message,
            code: this.getCode(),
            status: this.getStatus(),
        };
    }
    getCode() {
        return this.code;
    }
}
exports.StdHttpException = StdHttpException;
