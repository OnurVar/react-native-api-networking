import { ConfigStorage } from './ConfigStorage';

export const NetworkConfigSetupProvider = {
    setupAuthenticationConfig: ConfigStorage.getInstance().setupAuthenticationConfig,
    setupHelperConfig: ConfigStorage.getInstance().setupHelperConfig,
    setupLogicConfig: ConfigStorage.getInstance().setupLogicConfig,
    setupNetworkConfig: ConfigStorage.getInstance().setupNetworkConfig,
};
