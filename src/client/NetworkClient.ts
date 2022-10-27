import axios, { AxiosRequestConfig } from 'axios';
import { errorLogger, requestLogger, responseLogger } from 'axios-logger';

import { NetworkConfigProvider } from '../config';
import { ApiRequest } from '../model';
import { DefaultClient } from './DefaultClient';
import { TokenClient } from './TokenClient';
import { DefaultLoggerConfig } from './util';

const TOTAL_NUMBER_OF_TRY = 2;
export class NetworkClient extends DefaultClient {
    //MARK: Variables

    countRetry = 1;
    countFetchToken = 1;

    //MARK: Public Methods

    async execute(request: ApiRequest) {
        return super.execute(request, this.getClientInstance());
    }

    //MARK: Client

    private getClientInstance() {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(this.interceptBeforeRequest, error => errorLogger(error, DefaultLoggerConfig));
        axiosClient.interceptors.response.use(response => responseLogger(response, DefaultLoggerConfig), this.interceptAfterResponse);
        return axiosClient;
    }

    //MARK: Interceptors

    private async interceptBeforeRequest(config: AxiosRequestConfig) {
        let accessToken = NetworkConfigProvider.getAccessToken();
        NetworkConfigProvider.log(`[NetworkClient] [interceptBeforeRequest] Token: ${accessToken || ''}`);

        //Check if token is expired
        if (NetworkConfigProvider.shouldRenewTokenBeforeRequest()) {
            NetworkConfigProvider.log(`[NetworkClient] [interceptBeforeRequest] [TOKEN_EXPIRED] FETCHING NEW TOKEN`);

            const tokenClient = new TokenClient();
            await tokenClient.getNewToken();

            accessToken = NetworkConfigProvider.getAccessToken();
        }

        //Set Token
        if (config.headers && accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }

        return requestLogger(config, DefaultLoggerConfig);
    }

    private async interceptAfterResponse(error: any) {
        const errorMessage = NetworkConfigProvider.onErrorReceive(error);
        NetworkConfigProvider.log(`[NetworkClient] [interceptAfterResponse] ${errorMessage}`);

        if (NetworkConfigProvider.shoudlRenewToken(errorMessage)) {
            NetworkConfigProvider.log(`[NetworkClient] [interceptAfterResponse] [TOKEN_EXPIRED] FETCHING NEW TOKEN`);

            const tokenClient = new TokenClient();
            await tokenClient.getNewToken();

            // Retry the request
            this.countFetchToken++;
            if (this.countFetchToken < TOTAL_NUMBER_OF_TRY + 1) {
                return this.getClientInstance().request(error.config);
            }
        } else if (NetworkConfigProvider.shoudlLogout(errorMessage)) {
            NetworkConfigProvider.logout();
        }
        return errorLogger(error, DefaultLoggerConfig);
    }
}
