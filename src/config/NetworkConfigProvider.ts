import { ConfigStorage } from './ConfigStorage';

export const NetworkConfigProvider = {
    ...ConfigStorage.getInstance().getAuthenticationConfig(),
    ...ConfigStorage.getInstance().getHelperConfig(),
    ...ConfigStorage.getInstance().getLogicConfig(),
    ...ConfigStorage.getInstance().getNetworkConfig(),
};
