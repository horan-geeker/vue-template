export interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
    traceId?: string;
    spanId?: string;
}

export interface RequestOptions extends RequestInit {
    params?: Record<string, any>;
    data?: any;
}

export abstract class HttpService {
    protected abstract get baseUrl(): string;

    protected async request<T>(
        uri: string,
        method: string,
        options: RequestOptions = {}
    ): Promise<CommonResponse<T>> {
        const { params, data, headers = {}, ...rest } = options;
        const url = new URL(uri, this.baseUrl);

        // Append query params
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, String(params[key]));
                }
            });
        }

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            ...rest,
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url.toString(), config);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const responseData = await response.json();
            // Assuming the backend always returns CommonResponse structure
            return responseData as CommonResponse<T>;
        } catch (error) {
            console.error('HTTP Request Error:', error);
            throw error;
        }
    }

    protected get<T>(uri: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        return this.request<T>(uri, 'GET', options);
    }

    protected post<T>(uri: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        return this.request<T>(uri, 'POST', options);
    }

    protected put<T>(uri: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        return this.request<T>(uri, 'PUT', options);
    }

    protected patch<T>(uri: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        return this.request<T>(uri, 'PATCH', options);
    }

    protected delete<T>(uri: string, options: RequestOptions = {}): Promise<CommonResponse<T>> {
        return this.request<T>(uri, 'DELETE', options);
    }
}
