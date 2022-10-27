export interface LogicConfig {
    shoudlLogout: (message: string) => boolean;
    shoudlRenewToken: (message: string) => boolean;
    shouldRenewTokenBeforeRequest: () => boolean;
}
