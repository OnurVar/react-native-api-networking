import { AuthenticationConfig, HelperConfig, LogicConfig, NetworkConfig } from './model';
import { DefaultAuthenticationConfig, DefaultHelperConfig, DefaultLogicConfig, DefaultNetworkConfig } from './util';

export class ConfigStorage {
    //MARK: Public Variables
    public authenticationConfig: AuthenticationConfig = DefaultAuthenticationConfig;
    public helperConfig: HelperConfig = DefaultHelperConfig;
    public logicConfig: LogicConfig = DefaultLogicConfig;
    public networkConfig: NetworkConfig = DefaultNetworkConfig;

    //MARK: Private Variables
    private static instance: ConfigStorage;

    //MARK: Life Cycle
    static getInstance(): ConfigStorage {
        if (!ConfigStorage.instance) {
            ConfigStorage.instance = new ConfigStorage();
        }

        return ConfigStorage.instance;
    }

    static setupAuthenticationConfig(config: AuthenticationConfig) {
        ConfigStorage.getInstance().authenticationConfig = config;
    }

    static setupHelperConfig(config: HelperConfig) {
        ConfigStorage.getInstance().helperConfig = config;
    }

    static setupLogicConfig(config: LogicConfig) {
        ConfigStorage.getInstance().logicConfig = config;
    }

    static setupNetworkConfig(config: NetworkConfig) {
        ConfigStorage.getInstance().networkConfig = config;
    }
}
