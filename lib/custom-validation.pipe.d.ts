import { PipeTransform, ValidationError, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs-nodo/log';
export declare class CustomValidationPipe extends ValidationPipe implements PipeTransform {
    private readonly logger;
    constructor(logger: Logger);
    createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown;
}
