export const tokenStorage = {
    getToken(): string {
        return localStorage.getItem('token') || '';
    },
    setToken(token: string) {
        localStorage.setItem('token', token);
    },
    removeToken() {
        localStorage.removeItem('token');
    }
};

export function objectToQueryParams(obj: Record<string, any>): string {
    return Object.keys(obj)
        .filter(key => obj[key] !== undefined && obj[key] !== null)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
}