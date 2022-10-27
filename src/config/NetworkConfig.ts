import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from './model';
import { DefaultAuthenticationConfig, DefaultHelperConfig, DefaultLogicConfig, DefaultNetworkConfig } from './util';

export class ConfigProvider {
    //MARK: Public Variables
    private authenticationConfig: AuthenticationConfig = DefaultAuthenticationConfig;
    private helperConfig: HelperConfig = DefaultHelperConfig;
    private logicConfig: LogicConfig = DefaultLogicConfig;
    private networkConfig: NetworkConfig = DefaultNetworkConfig;

    //MARK: Private Variables
    private static instance: ConfigProvider;

    //MARK: Life Cycle
    static getInstance(): ConfigProvider {
        if (!ConfigProvider.instance) {
            ConfigProvider.instance = new ConfigProvider();
        }

        return ConfigProvider.instance;
    }

    setupAuthenticationConfig(config: AuthenticationConfig) {
        ConfigProvider.getInstance().authenticationConfig = config;
    }

    setupHelperConfig(config: HelperConfig) {
        ConfigProvider.getInstance().helperConfig = config;
    }

    setupLogicConfig(config: LogicConfig) {
        ConfigProvider.getInstance().logicConfig = config;
    }

    setupNetworkConfig(config: NetworkConfig) {
        ConfigProvider.getInstance().networkConfig = config;
    }

    getNetworkConfig() {
        return ConfigProvider.getInstance().networkConfig;
    }

    getAuthenticationConfig() {
        return ConfigProvider.getInstance().authenticationConfig;
    }

    getHelperConfig() {
        return ConfigProvider.getInstance().helperConfig;
    }

    getLogicConfig() {
        return ConfigProvider.getInstance().logicConfig;
    }
}
