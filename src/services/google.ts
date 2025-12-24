import { ApiService } from './api';
import type { CommonResponse } from './http';

export interface GoogleAuthData {
    user: {
        id: number;
        status: number;
        name: string;
        email: string;
        phone: string;
        loginAt: string;
        createdAt: string;
        updatedAt: string;
    };
    token: string;
}

class GoogleService extends ApiService {
    public async handleCallback(params: Record<string, any>): Promise<CommonResponse<GoogleAuthData>> {
        return this.get<GoogleAuthData>('/callback/google-auth', {
            params,
        });
    }
}

export const googleService = new GoogleService();
