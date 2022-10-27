import { NetworkClient } from './client';
import { ConfigProvider } from './config';
import { ApiRequest } from './model';

//MARK: Configs

export const Config = {
    setupAuthenticationConfig: ConfigProvider.getInstance().setupAuthenticationConfig,
    setupHelperConfig: ConfigProvider.getInstance().setupHelperConfig,
    setupLogicConfig: ConfigProvider.getInstance().setupLogicConfig,
    setupNetworkConfig: ConfigProvider.getInstance().setupNetworkConfig,
    ...ConfigProvider.getInstance().getAuthenticationConfig(),
    ...ConfigProvider.getInstance().getHelperConfig(),
    ...ConfigProvider.getInstance().getLogicConfig(),
    ...ConfigProvider.getInstance().getNetworkConfig(),
};

//MARK: Methods

export const postRequest = (request: ApiRequest) => {
    const client = new NetworkClient();
    return client.makeRequest(request);
};
