import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Logger } from '@nestjs-nodo/log';
import { HttpCoreConfigDto } from './http-core-config.dto';
import { ConfigService } from '@nestjs-nodo/config';
export declare class GlobalFilter implements ExceptionFilter {
    private readonly logger;
    private readonly config;
    private readonly configService;
    constructor(logger: Logger, config: HttpCoreConfigDto, configService: ConfigService);
    catch(exception: any, host: ArgumentsHost): void;
}
