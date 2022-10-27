import axios, { AxiosRequestConfig } from 'axios';
import { errorLogger, requestLogger, responseLogger } from 'axios-logger';

import { Config } from '..';
import { ApiRequest } from '../model';
import { DefaultLoggerConfig, getErrorMessage } from '../util';
import { DefaultClient } from './DefaultClient';
import { TokenClient } from './TokenClient';

const TOTAL_NUMBER_OF_TRY = 2;
export class NetworkClient extends DefaultClient {
    //MARK: Variables

    countRetry = 1;
    countFetchToken = 1;

    //MARK: Public Methods

    async makeRequest(request: ApiRequest) {
        return super.makeRequest(request, this.getClientInstance());
    }

    //MARK: Client

    private getClientInstance() {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(this.interceptBeforeRequest, error => errorLogger(error));
        axiosClient.interceptors.response.use(response => responseLogger(response, DefaultLoggerConfig), this.interceptAfterResponse);
        return axiosClient;
    }

    //MARK: Interceptors

    private async interceptBeforeRequest(config: AxiosRequestConfig) {
        let accessToken = Config.getAccessToken();
        Config.log(`[NetworkClient] [interceptBeforeRequest] Token: ${accessToken || ''}`);

        //Check if token is expired
        if (Config.shouldRenewTokenBeforeRequest()) {
            Config.log(`[NetworkClient] [interceptBeforeRequest] [TOKEN_EXPIRED] FETCHING NEW TOKEN`);

            const tokenClient = new TokenClient();
            await tokenClient.getNewToken();

            accessToken = Config.getAccessToken();
        }

        //Set Token
        if (config.headers && accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }

        return requestLogger(config, DefaultLoggerConfig);
    }

    private async interceptAfterResponse(error: any) {
        const errorMessage = getErrorMessage(error);
        Config.log(`[NetworkClient] [interceptAfterResponse] ${errorMessage}`);

        if (Config.shoudlRenewToken(errorMessage)) {
            Config.log(`[NetworkClient] [interceptAfterResponse] [TOKEN_EXPIRED] FETCHING NEW TOKEN`);

            const tokenClient = new TokenClient();
            await tokenClient.getNewToken();

            // Retry the request
            this.countFetchToken++;
            if (this.countFetchToken < TOTAL_NUMBER_OF_TRY + 1) {
                return this.getClientInstance().request(error.config);
            }
        } else if (Config.shoudlLogout(errorMessage)) {
            Config.logout();
        }
        return errorLogger(error);
    }
}
