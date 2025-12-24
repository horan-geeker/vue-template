import { HttpService, type RequestOptions, type CommonResponse } from './http';
import SparkMD5 from 'spark-md5';
import { tokenStorage } from '@/utils/storage';

export class ApiService extends HttpService {
    protected get baseUrl(): string {
        return import.meta.env.PROD
            ? 'https://api.example.com'
            : 'http://test-api.example.com';
    }

    protected async request<T>(uri: string, method: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        const headers = (options.headers || {}) as Record<string, string>;
        const timestamp = Math.floor(Date.now() / 1000).toString();

        // Add common headers
        headers['Accept'] = 'application/json';
        // headers['Content-Type'] will be set by HttpService if not present

        if (!headers['Authorization']) {
            const token = tokenStorage.getToken();
            if (token) {
                headers['Authorization'] = token;
            }
        }

        // Generate TraceId if not present (simple version)
        if (!headers['TraceId']) {
            headers['TraceId'] = Math.random().toString(36).substring(7);
        }

        headers['Timestamp'] = timestamp;

        // Calculate Signature
        const signature = this.calculateSignature(options, timestamp);
        headers['Signature'] = signature;

        options.headers = headers;

        return super.request<T>(uri, method, options);
    }

    private calculateSignature(options: RequestOptions, timestamp: string): string {
        const params: Record<string, any> = {};

        // 1. Add URL query params
        if (options.params) {
            Object.assign(params, options.params);
        }

        // 2. Add body params (if JSON object)
        if (options.data && typeof options.data === 'object' && !(options.data instanceof FormData)) {
            Object.assign(params, options.data);
        }

        // 3. Add Timestamp
        params['Timestamp'] = timestamp;

        // 4. Sort keys and join
        const sortedKeys = Object.keys(params).sort();
        const paramString = sortedKeys.map(key => {
            const value = params[key];
            if (value === null || value === undefined) {
                return `${key}=`;
            } else if (typeof value === 'object') {
                return `${key}=${JSON.stringify(value)}`;
            } else {
                return `${key}=${value}`;
            }
        }).join('&');

        // 5. Calculate MD5
        return SparkMD5.hash(paramString);
    }
}
