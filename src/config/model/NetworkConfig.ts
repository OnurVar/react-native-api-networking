import { AxiosResponse } from 'axios';

import { ApiResponse } from '../../model/ApiResponse';

export interface NetworkConfig {
    getHost: () => string;
    onResponseReceive: (response: AxiosResponse<ApiResponse>) => any;
    onErrorReceive: (error: any) => string;
}
