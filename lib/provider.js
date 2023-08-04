"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAxios = exports.getAxiosProvider = exports.getAxiosToken = void 0;
const http_service_1 = require("./http.service");
const utils_1 = require("@nestjs-nodo/utils");
const config_1 = require("@nestjs-nodo/config");
_a = utils_1.ProviderUtils.createDynamicProvider({
    namespace: 'HTTP_AXIOS',
    mapper: (param) => param.name,
    provider: (param) => {
        return {
            inject: [config_1.getConfigToken(param), http_service_1.HttpService],
            useFactory: async (config, httpService) => {
                return httpService.createAxiosInstance(config);
            },
        };
    },
}), exports.getAxiosToken = _a.getToken, exports.getAxiosProvider = _a.getProvider, exports.InjectAxios = _a.getInjector;
