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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const log_1 = require("@nestjs-nodo/log");
let CustomValidationPipe = class CustomValidationPipe extends common_1.ValidationPipe {
    constructor(logger) {
        super({ whitelist: true, transform: true });
        this.logger = logger;
        if ('createExceptionFactory' in common_1.ValidationPipe.prototype) {
            this.exceptionFactory = this.createExceptionFactory();
        }
    }
    createExceptionFactory() {
        const factory = super.createExceptionFactory();
        return (validationErrors = []) => {
            this.logger.warn('Bad request', validationErrors);
            return factory(validationErrors);
        };
    }
};
CustomValidationPipe = __decorate([
    common_1.Injectable(),
    __param(0, log_1.InjectLogger(common_1.ValidationPipe)),
    __metadata("design:paramtypes", [log_1.Logger])
], CustomValidationPipe);
exports.CustomValidationPipe = CustomValidationPipe;
