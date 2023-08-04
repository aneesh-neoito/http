import { DynamicModule } from '@nestjs/common';
import { AxiosConfigDto } from './axios-config.dto';
import { IConfigMap } from '@nestjs-nodo/config';
import { HttpCoreConfigDto } from './http-core-config.dto';
export declare class HttpModule {
    static forFeature(...configMaps: IConfigMap<AxiosConfigDto>[]): DynamicModule;
    static forRoot(configMap: IConfigMap<HttpCoreConfigDto>): DynamicModule;
}
