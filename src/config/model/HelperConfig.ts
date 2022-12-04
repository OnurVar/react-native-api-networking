import { ApiLoggerConfig } from '../../model/ApiLoggerConfig';

export interface HelperConfig {
    log: (message: string) => void;
    getLoggerConfig: () => ApiLoggerConfig;
}
