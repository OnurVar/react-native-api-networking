import { AxiosResponse } from 'axios';

import { ApiResponse } from '../../model';
import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from '../model';

export const DefaultAuthenticationConfig: AuthenticationConfig = {
    getAccessToken: () => undefined,
    getRefreshToken: () => undefined,
    logout: () => {},
    getRefreshTokenRequest: () => undefined,
};

export const DefaultHelperConfig: HelperConfig = {
    log: (_message: string) => {},
};

export const DefaultLogicConfig: LogicConfig = {
    shoudlLogout: (message: string) => false,
    shoudlRenewToken: (_message: string) => false,
    shouldRenewTokenBeforeRequest: () => false,
};

export const DefaultNetworkConfig: NetworkConfig = {
    getHost: () => '',
    onResponseReceive: (_response: AxiosResponse<ApiResponse>) => undefined,
    onErrorReceive: (_response: AxiosResponse<ApiResponse>) => undefined,
};
