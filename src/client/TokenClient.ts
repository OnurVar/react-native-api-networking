import axios from 'axios';
import { errorLogger, requestLogger, responseLogger } from 'axios-logger';

import { NetworkConfigProvider } from '../config';
import { ApiRequest, ApiToken } from '../model';
import { DefaultClient } from './DefaultClient';
import { DefaultLoggerConfig } from './util';

export class TokenClient extends DefaultClient {
    async execute(request: ApiRequest) {
        return super.execute(request, this.getClientInstance());
    }

    private getClientInstance() {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(
            request => requestLogger(request, DefaultLoggerConfig),
            error => errorLogger(error, DefaultLoggerConfig),
        );
        axiosClient.interceptors.response.use(
            response => responseLogger(response, DefaultLoggerConfig),
            error => errorLogger(error, DefaultLoggerConfig),
        );
        return axiosClient;
    }

    async getNewToken() {
        const request = NetworkConfigProvider.getRefreshTokenRequest();
        if (typeof request !== 'string') {
            NetworkConfigProvider.log('[TokenClient] [getNewToken] NO REFRESH TOKEN REQUEST');
            return;
        }

        const response = await this.execute(request);
        const tokenResponse = response as ApiToken;
        NetworkConfigProvider.log(`[TokenClient] [getNewToken] New Token: ${JSON.stringify(tokenResponse)}`);
        return tokenResponse;
    }
}
