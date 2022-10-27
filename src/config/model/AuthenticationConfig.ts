import { ApiRequest } from '../../model';

export interface AuthenticationConfig {
    getAccessToken: () => string | undefined;
    getRefreshToken: () => string | undefined;
    logout: () => void;
    getRefreshTokenRequest: () => ApiRequest | undefined;
}
