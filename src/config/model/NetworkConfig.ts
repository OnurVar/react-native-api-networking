import { AxiosResponse } from 'axios';

import { ApiResponse } from '../../model';

export interface NetworkConfig {
    getHost: () => string;
    onResponseReceive: (response: AxiosResponse<ApiResponse>) => any;
    onErrorReceive: (response: AxiosResponse<ApiResponse>) => any;
}
