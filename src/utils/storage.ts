const isClient = typeof window !== 'undefined';

export const tokenStorage = {
    getToken(): string {
        if (!isClient) return '';
        return localStorage.getItem('token') || '';
    },
    setToken(token: string) {
        if (!isClient) return;
        localStorage.setItem('token', token);
    },
    removeToken() {
        if (!isClient) return;
        localStorage.removeItem('token');
    }
};

export function objectToQueryParams(obj: Record<string, any>): string {
    return Object.keys(obj)
        .filter(key => obj[key] !== undefined && obj[key] !== null)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
}