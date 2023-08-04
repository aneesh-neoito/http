"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const http_service_1 = require("./http.service");
const provider_1 = require("./provider");
const config_1 = require("@nestjs-nodo/config");
const http_core_module_1 = require("./http-core.module");
const log_1 = require("@nestjs-nodo/log");
let HttpModule = HttpModule_1 = class HttpModule {
    static forFeature(...configMaps) {
        const axiosProviders = configMaps.map((c) => provider_1.getAxiosProvider(c));
        return {
            module: HttpModule_1,
            imports: [
                log_1.LogModule.forFeature(http_service_1.HttpService),
                config_1.ConfigModule.forFeature(...configMaps),
            ],
            providers: [...axiosProviders, http_service_1.HttpService],
            exports: [...axiosProviders, http_service_1.HttpService],
        };
    }
    static forRoot(configMap) {
        return {
            module: HttpModule_1,
            imports: [http_core_module_1.HttpCoreModule.forRoot(configMap)],
        };
    }
};
HttpModule = HttpModule_1 = __decorate([
    common_1.Module({})
], HttpModule);
exports.HttpModule = HttpModule;
