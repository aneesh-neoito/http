"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAxiosError = exports.formatHttpLog = void 0;
function formatHttpLog(data) {
    return `${data.direction} ${data.status} ${data.duration}ms ${data.method.toUpperCase()} ${data.url}`;
}
exports.formatHttpLog = formatHttpLog;
function isAxiosError(obj) {
    return obj.isAxiosError;
}
exports.isAxiosError = isAxiosError;
