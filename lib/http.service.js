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
var HttpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const utils_1 = require("./utils");
const log_1 = require("@nestjs-nodo/log");
const config_1 = require("@nestjs-nodo/config");
const std_http_exception_1 = require("./std-http-exception");
let HttpService = HttpService_1 = class HttpService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
    }
    createAxiosInstance(config) {
        const api = axios_1.default.create(config);
        api.interceptors.request.use((data) => {
            data.headers = data.headers || {};
            const context = this.configService.getContext();
            const traceId = context === null || context === void 0 ? void 0 : context.get(config_1.ConfigContext.X_TRACE_ID);
            if (traceId) {
                data.headers[config_1.ConfigContext.X_TRACE_ID] = traceId;
            }
            data.metadata = { tStart: Date.now() };
            return data;
        });
        api.interceptors.response.use((data) => {
            this.logger.debug(utils_1.formatHttpLog({
                direction: 'req',
                duration: Date.now() - data.config.metadata.tStart,
                method: data.config.method || '',
                url: `${data.config.baseURL}${data.config.url}`,
                status: data.status,
            }));
            return data;
        }, (err) => {
            var _a, _b, _c;
            if (utils_1.isAxiosError(err)) {
                this.logger.error(err.message, err, {
                    req: err.config,
                    res: (_a = err.response) === null || _a === void 0 ? void 0 : _a.data,
                });
                return Promise.reject(new std_http_exception_1.StdHttpException({
                    code: err.code ||
                        ((_b = err.response) === null || _b === void 0 ? void 0 : _b.statusText.toUpperCase()) ||
                        'ER_INTERNAL',
                    message: err.message,
                    status: ((_c = err.response) === null || _c === void 0 ? void 0 : _c.status) || 500,
                }));
            }
            return Promise.reject(err);
        });
        return api;
    }
};
HttpService = HttpService_1 = __decorate([
    common_1.Injectable(),
    __param(1, log_1.InjectLogger(HttpService_1)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        log_1.Logger])
], HttpService);
exports.HttpService = HttpService;
