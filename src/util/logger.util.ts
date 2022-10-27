import { RequestLogConfig } from 'axios-logger/lib/common/types';

export const DefaultLoggerConfig: RequestLogConfig = {
    data: false,
    headers: false,
    dateFormat: 'HH:MM:ss',
};
