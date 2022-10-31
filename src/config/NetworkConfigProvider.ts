import { AxiosResponse } from 'axios';

import { ApiResponse } from '../model';
import { ConfigStorage } from './ConfigStorage';
import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from './model';

type Config = AuthenticationConfig & HelperConfig & LogicConfig & NetworkConfig;
export const NetworkConfigProvider: Config = {
    getAccessToken: () => {
        return ConfigStorage.getInstance().authenticationConfig.getAccessToken();
    },
    getRefreshToken: () => {
        return ConfigStorage.getInstance().authenticationConfig.getRefreshToken();
    },
    logout: () => {
        return ConfigStorage.getInstance().authenticationConfig.logout();
    },
    getRefreshTokenRequest: () => {
        return ConfigStorage.getInstance().authenticationConfig.getRefreshTokenRequest();
    },
    log: (message: string) => {
        return ConfigStorage.getInstance().helperConfig.log(message);
    },
    shoudlLogout: (message: string) => {
        return ConfigStorage.getInstance().logicConfig.shoudlLogout(message);
    },
    shoudlRenewToken: (message: string) => {
        return ConfigStorage.getInstance().logicConfig.shoudlRenewToken(message);
    },
    shouldRenewTokenBeforeRequest: () => {
        return ConfigStorage.getInstance().logicConfig.shouldRenewTokenBeforeRequest();
    },
    getHost: () => {
        return ConfigStorage.getInstance().networkConfig.getHost();
    },
    onResponseReceive: (response: AxiosResponse<ApiResponse>) => {
        return ConfigStorage.getInstance().networkConfig.onResponseReceive(response);
    },
    onErrorReceive: (error: any) => {
        return ConfigStorage.getInstance().networkConfig.onErrorReceive(error);
    },
};
