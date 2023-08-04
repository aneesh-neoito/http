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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HttpInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const tap_1 = require("rxjs/internal/operators/tap");
const utils_1 = require("./utils");
const log_1 = require("@nestjs-nodo/log");
let HttpInterceptor = HttpInterceptor_1 = class HttpInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const tStart = Date.now();
        return next.handle().pipe(tap_1.tap(() => {
            this.logger.debug(utils_1.formatHttpLog({
                direction: 'res',
                duration: Date.now() - tStart,
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
            }));
        }));
    }
};
HttpInterceptor = HttpInterceptor_1 = __decorate([
    common_1.Injectable(),
    __param(0, log_1.InjectLogger(HttpInterceptor_1)),
    __metadata("design:paramtypes", [log_1.Logger])
], HttpInterceptor);
exports.HttpInterceptor = HttpInterceptor;
