import { AxiosInstance } from 'axios';

import { NetworkConfigProvider } from '../config';
import { ApiRequest, ApiResponse } from '../model';

export class DefaultClient {
    async execute(request: ApiRequest, client: AxiosInstance) {
        const config = request.getConfig();
        const response = await client.request<ApiResponse>(config);
        const parsedResponse = NetworkConfigProvider.onResponseReceive(response);
        return parsedResponse;
    }
}
