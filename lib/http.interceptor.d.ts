import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs-nodo/log';
export declare class HttpInterceptor implements NestInterceptor<any, any> {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>>;
}
