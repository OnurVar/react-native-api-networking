import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from './model';
import { DefaultAuthenticationConfig, DefaultHelperConfig, DefaultLogicConfig, DefaultNetworkConfig } from './util';

export class ConfigStorage {
    //MARK: Public Variables
    private authenticationConfig: AuthenticationConfig = DefaultAuthenticationConfig;
    private helperConfig: HelperConfig = DefaultHelperConfig;
    private logicConfig: LogicConfig = DefaultLogicConfig;
    private networkConfig: NetworkConfig = DefaultNetworkConfig;

    //MARK: Private Variables
    private static instance: ConfigStorage;

    //MARK: Life Cycle
    static getInstance(): ConfigStorage {
        if (!ConfigStorage.instance) {
            ConfigStorage.instance = new ConfigStorage();
        }

        return ConfigStorage.instance;
    }

    setupAuthenticationConfig(config: AuthenticationConfig) {
        ConfigStorage.getInstance().authenticationConfig = config;
    }

    setupHelperConfig(config: HelperConfig) {
        ConfigStorage.getInstance().helperConfig = config;
    }

    setupLogicConfig(config: LogicConfig) {
        ConfigStorage.getInstance().logicConfig = config;
    }

    setupNetworkConfig(config: NetworkConfig) {
        ConfigStorage.getInstance().networkConfig = config;
    }

    getNetworkConfig() {
        return ConfigStorage.getInstance().networkConfig;
    }

    getAuthenticationConfig() {
        return ConfigStorage.getInstance().authenticationConfig;
    }

    getHelperConfig() {
        return ConfigStorage.getInstance().helperConfig;
    }

    getLogicConfig() {
        return ConfigStorage.getInstance().logicConfig;
    }
}
