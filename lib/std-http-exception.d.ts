import { HttpException } from '@nestjs/common';
import { IStdHttpException } from './types';
export declare class StdHttpException extends HttpException {
    private readonly code;
    constructor(data: IStdHttpException);
    getResponse(): {
        message: string;
        code: string;
        status: number;
    };
    getCode(): string;
}
