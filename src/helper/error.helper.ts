import axios, { AxiosError } from 'axios';

import { ApiResponse } from '../model';

export const DefaultApiErrorParser = (error: any) => {
    const errorArray: string[] = [];
    if (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiResponse>;
            const axiosResponse = axiosError.response;
            const axiosResponseData = axiosResponse?.data;

            if (axiosResponseData) {
                const status = axiosResponseData.status;
                if (typeof status === 'number') {
                    errorArray.push(`[${status}]`);
                }

                const message = axiosResponseData.message;
                if (typeof status === 'string') {
                    errorArray.push(`Request failed with message ${message}`);
                }

                const error = axiosResponseData.error;
                if (typeof status === 'string') {
                    errorArray.push(`Request failed with message ${error}`);
                }
            } else {
                const status = axiosError.status;
                if (typeof status === 'number') {
                    errorArray.push(`[${status}]`);
                }

                const message = axiosError.message;
                if (typeof message === 'string') {
                    errorArray.push(`Request failed with message ${message}`);
                }
            }
        } else {
            const stockError = error as Error;
            if (typeof stockError.message === 'string') {
                return stockError.message;
            }
        }
    }

    if (errorArray.length > 0) {
        return errorArray.join(' ');
    }
    return 'An unknown error occourred';
};
