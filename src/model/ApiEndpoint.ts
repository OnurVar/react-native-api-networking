import { MethodType } from './ApiEnum';

export interface ApiEndpoint {
    path: string;
    method: MethodType;
}
