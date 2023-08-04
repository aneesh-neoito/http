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
var GlobalFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFilter = void 0;
const common_1 = require("@nestjs/common");
const log_1 = require("@nestjs-nodo/log");
const _ = require("lodash");
const types_1 = require("./types");
const http_core_config_dto_1 = require("./http-core-config.dto");
const util_1 = require("util");
const config_1 = require("@nestjs-nodo/config");
let GlobalFilter = GlobalFilter_1 = class GlobalFilter {
    constructor(logger, config, configService) {
        this.logger = logger;
        this.config = config;
        this.configService = configService;
    }
    catch(exception, host) {
        var _a, _b, _c;
        const req = host.switchToHttp().getRequest();
        const err = {};
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            err.statusCode = exception.getStatus();
            if (typeof response === 'string') {
                err.message = [{ constraints: { GENERAL: response } }];
            }
            else {
                if (response.message instanceof Array) {
                    err.message = response.message;
                }
                else {
                    const errorType = response.error && typeof response.error === 'string'
                        ? _.snakeCase(response.error).toUpperCase()
                        : 'GENERAL';
                    err.message = [
                        {
                            constraints: { [errorType]: response.message },
                        },
                    ];
                }
            }
        }
        else {
            let message = 'Oops, something went wrong. Please try again or report this problem.';
            err.statusCode = ((_a = exception.error) === null || _a === void 0 ? void 0 : _a.status) || exception.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            if (err.statusCode < 500) {
                message = ((_b = exception.error) === null || _b === void 0 ? void 0 : _b.message) || exception.message || message;
            }
            err.message = [
                {
                    constraints: {
                        INTERNAL: message,
                    },
                },
            ];
            if (this.config.showStackTrace) {
                err.stack = util_1.inspect(exception, false, 10, false);
            }
        }
        err.traceId = (_c = this.configService.getContext()) === null || _c === void 0 ? void 0 : _c.get(config_1.ConfigContext.X_TRACE_ID);
        const httpException = new common_1.HttpException(err, err.statusCode);
        if (httpException.getStatus() >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(`Internal error at ${req.method} ${req.originalUrl}`, exception);
        }
        else {
            this.logger.warn(`Client error at ${req.method} ${req.originalUrl}`, exception);
        }
        host
            .switchToHttp()
            .getResponse()
            .status(httpException.getStatus())
            .send(httpException.getResponse());
    }
};
GlobalFilter = GlobalFilter_1 = __decorate([
    common_1.Catch(),
    __param(0, log_1.InjectLogger(GlobalFilter_1)),
    __param(1, common_1.Inject(types_1.HTTP_MODULE_CONFIG)),
    __metadata("design:paramtypes", [log_1.Logger,
        http_core_config_dto_1.HttpCoreConfigDto,
        config_1.ConfigService])
], GlobalFilter);
exports.GlobalFilter = GlobalFilter;
