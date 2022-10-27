import { AxiosRequestConfig } from 'axios';

import { Config } from '..';
import { ApiEndpoint } from './ApiEndpoint';
import { MethodType } from './ApiEnum';

type Dictionary = { [key: string]: any };

export class ApiRequest {
    tryCount: number;
    apiEndpoint: ApiEndpoint;

    body?: {};
    pathParameter?: Dictionary;
    parameterID?: string;
    queryString?: string;

    constructor(apiEndpoint: ApiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.tryCount = 1;
    }

    setBody(body: {}) {
        this.body = body;
    }

    //  /api/v1/customer/123
    setParamterID(parameterID: string) {
        this.parameterID = parameterID;
    }

    //  /api/v1/customer?customerID=123
    //{
    //    customerId: 123
    //}
    setQueryString(queryString: {}) {
        const queryStringMap = new Map(Object.entries(queryString));
        const questStringArray: string[] = [];
        [...queryStringMap.keys()].forEach(key => {
            const value = queryStringMap.get(key);
            if (value) {
                questStringArray.push(key + '=' + value);
            }
        });
        this.queryString = questStringArray.join('&');
    }
    // /api/v1/customer/{customerId}/receipt/{receiptId}
    //{
    //    customerId:123,
    //    receiptId:123
    //}
    setPathParameter(pathParameter: Dictionary) {
        this.pathParameter = pathParameter;
    }

    getURL(includeHost: boolean) {
        const urlArray: string[] = [];
        includeHost && urlArray.push(Config.getHost());

        // Set Endpoint with Parameter
        let endpoint = this.apiEndpoint.path;
        if (typeof this.pathParameter !== 'undefined') {
            Object.entries(this.pathParameter).forEach(([key, value]) => {
                endpoint = endpoint.replace('{' + key + '}', value);
            });
        }
        urlArray.push(endpoint);

        if (this.parameterID) {
            urlArray.push(this.parameterID);
        }
        if (this.queryString) {
            return urlArray.join('/') + '?' + this.queryString;
        }
        return urlArray.join('/');
    }

    getBody() {
        return this.body;
        // return JSON.stringify(this.body);
    }

    getHeaders() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }

    getConfig() {
        const Method = this.apiEndpoint.method;

        const config: AxiosRequestConfig = {
            url: this.getURL(true),
            method: Method,
            headers: this.getHeaders(),
            timeout: 10000,
            timeoutErrorMessage: 'Request Timeout',
        };
        if (Method !== MethodType.GET) {
            config.data = this.getBody();
        }

        return config;
    }
}
