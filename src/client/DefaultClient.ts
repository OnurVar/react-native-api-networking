import axios, { AxiosInstance } from 'axios';

import { Config } from '..';
import { ApiRequest, ApiResponse } from '../model';

export class DefaultClient {
    async makeRequest(request: ApiRequest, client: AxiosInstance) {
        const config = request.getConfig();
        const response = await client.request<ApiResponse>(config);
        const parsedResponse = Config.onResponseReceive(response);
        return parsedResponse;
    }
}
