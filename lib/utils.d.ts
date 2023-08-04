import { AxiosError } from 'axios';
export declare function formatHttpLog(data: {
    status: number;
    url: string;
    method: string;
    duration: number;
    direction: string;
}): string;
export declare function isAxiosError(obj: any): obj is AxiosError;
