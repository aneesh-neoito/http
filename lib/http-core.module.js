"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCoreModule = void 0;
const common_1 = require("@nestjs/common");
const log_1 = require("@nestjs-nodo/log");
const http_interceptor_1 = require("./http.interceptor");
const http_service_1 = require("./http.service");
const config_1 = require("@nestjs-nodo/config");
const core_1 = require("@nestjs/core");
const custom_validation_pipe_1 = require("./custom-validation.pipe");
const types_1 = require("./types");
const global_filter_1 = require("./global.filter");
const sanitizer_pipe_1 = require("./sanitizer.pipe");
let HttpCoreModule = HttpCoreModule_1 = class HttpCoreModule {
    static forRoot(configMap) {
        return {
            module: HttpCoreModule_1,
            imports: [
                config_1.ConfigModule.forFeature(configMap),
                log_1.LogModule.forFeature(http_interceptor_1.HttpInterceptor, http_service_1.HttpService, common_1.ValidationPipe, global_filter_1.GlobalFilter, sanitizer_pipe_1.SanitizerPipe),
            ],
            providers: [
                global_filter_1.GlobalFilter,
                {
                    provide: types_1.HTTP_MODULE_CONFIG,
                    inject: [config_1.getConfigToken(configMap)],
                    useFactory: (config) => config,
                },
                { provide: core_1.APP_INTERCEPTOR, useClass: http_interceptor_1.HttpInterceptor },
                {
                    provide: core_1.APP_PIPE,
                    useClass: custom_validation_pipe_1.CustomValidationPipe,
                },
            ],
            exports: [global_filter_1.GlobalFilter, log_1.LogModule],
        };
    }
};
HttpCoreModule = HttpCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], HttpCoreModule);
exports.HttpCoreModule = HttpCoreModule;
