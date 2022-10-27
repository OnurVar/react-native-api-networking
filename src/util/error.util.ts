import axios, { AxiosError } from 'axios';

import { ApiResponse } from '../model';

export const getErrorMessage = (error: any) => {
    if (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiResponse>;
            const axiosResponse = axiosError.response;
            if (axiosResponse) {
                const axiosResponseDataError = axiosResponse.data.error;
                if (typeof axiosResponseDataError === 'string') {
                    return axiosResponseDataError;
                }
            } else if (typeof axiosError.message === 'string') {
                return axiosError.message;
            }
        } else {
            const stockError = error as Error;
            if (typeof stockError.message === 'string') {
                return stockError.message;
            }
        }
    }
    return 'An unknown error occourred';
};
