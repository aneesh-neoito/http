import { DynamicModule } from '@nestjs/common';
import { IConfigMap } from '@nestjs-nodo/config';
import { HttpCoreConfigDto } from './http-core-config.dto';
export declare class HttpCoreModule {
    static forRoot(configMap: IConfigMap<HttpCoreConfigDto>): DynamicModule;
}
