import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Logger } from '@nestjs-nodo/log';
import { ConfigService } from '@nestjs-nodo/config';
export declare class HttpService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService, logger: Logger);
    createAxiosInstance(config: AxiosRequestConfig): AxiosInstance;
}
