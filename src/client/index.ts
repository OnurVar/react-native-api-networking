import { ApiRequest } from '../model';
import { NetworkClient } from './NetworkClient';

export const execute = (request: ApiRequest) => {
    const client = new NetworkClient();
    return client.execute(request);
};
