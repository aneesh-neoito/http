import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class SanitizerPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toSanitize;
}
