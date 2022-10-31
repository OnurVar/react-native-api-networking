import { ConfigStorage } from './ConfigStorage';
import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from './model';

export const NetworkConfigSetupProvider = {
    setupAuthenticationConfig: (config: AuthenticationConfig) => {
        ConfigStorage.setupAuthenticationConfig(config);
    },
    setupHelperConfig: (config: HelperConfig) => {
        ConfigStorage.setupHelperConfig(config);
    },
    setupLogicConfig: (config: LogicConfig) => {
        ConfigStorage.setupLogicConfig(config);
    },
    setupNetworkConfig: (config: NetworkConfig) => {
        ConfigStorage.setupNetworkConfig(config);
    },
};
