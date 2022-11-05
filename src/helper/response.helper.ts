import { AxiosResponse } from 'axios';

import { ApiResponse } from '../model';

export const DefaultApiResponseParser = (axiosResponse: AxiosResponse<ApiResponse>) => {
    const response = axiosResponse.data as ApiResponse;
    const errorArray: string[] = [];
    if (typeof response === 'undefined' || typeof response.data === 'undefined') {
        const status = response.status;
        if (typeof status === 'number') {
            errorArray.push(`[${status}]`);
        }

        const message = response.message;
        if (typeof message === 'string') {
            errorArray.push(`Request failed with message ${message}`);
        }

        const error = response.error;
        if (typeof error === 'string') {
            errorArray.push(`Request failed with message ${error}`);
        }

        // Catch if there is no error message
        if (errorArray.length === 0) {
            errorArray.push(`Request failed with unknown error`);
        }
    }

    if (errorArray.length > 0) {
        throw Error(errorArray.join(' '));
    }

    return response.data;
};
