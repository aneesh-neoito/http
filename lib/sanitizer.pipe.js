"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizerPipe = void 0;
const common_1 = require("@nestjs/common");
const class_sanitizer_1 = require("@neuralegion/class-sanitizer");
const class_transformer_1 = require("class-transformer");
let SanitizerPipe = class SanitizerPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toSanitize(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        class_sanitizer_1.sanitize(object);
        const sanitizedValue = class_transformer_1.classToPlain(object);
        return sanitizedValue;
    }
    toSanitize(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
SanitizerPipe = __decorate([
    common_1.Injectable()
], SanitizerPipe);
exports.SanitizerPipe = SanitizerPipe;
