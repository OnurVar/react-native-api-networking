import axios from 'axios';
import { errorLogger, requestLogger, responseLogger } from 'axios-logger';

import { Config } from '..';
import { ApiRequest, ApiToken } from '../model';
import { DefaultClient } from './DefaultClient';

export class TokenClient extends DefaultClient {
    async makeRequest(request: ApiRequest) {
        return super.makeRequest(request, this.getClientInstance());
    }

    private getClientInstance() {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(requestLogger, errorLogger);
        axiosClient.interceptors.response.use(responseLogger, errorLogger);
        return axiosClient;
    }

    async getNewToken() {
        const request = Config.getRefreshTokenRequest();
        if (typeof request !== 'string') {
            Config.log('[TokenClient] [getNewToken] NO REFRESH TOKEN REQUEST');
            return;
        }

        const response = await this.makeRequest(request);
        const tokenResponse = response as ApiToken;
        Config.log(`[TokenClient] [getNewToken] New Token: ${JSON.stringify(tokenResponse)}`);
        return tokenResponse;
    }
}
