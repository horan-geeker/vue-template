import { reactive, toRefs } from 'vue';
import { tokenStorage } from '@/utils/storage';

export interface UserInfo {
    id: number;
    status: number;
    name: string;
    email: string;
    phone: string;
    loginAt: string;
    createdAt: string;
    updatedAt: string;
    avatar?: string; // It seems the backend response doesn't have avatar yet, but requirements mention it. I'll add it as optional.
}

interface UserState {
    user: UserInfo | null;
    token: string;
}

const state = reactive<UserState>({
    user: null,
    token: tokenStorage.getToken() || '',
});

export const useUser = () => {

    const setUser = (user: UserInfo, token: string) => {
        state.user = user;
        state.token = token;
        tokenStorage.setToken(token);
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const clearUser = () => {
        state.user = null;
        state.token = '';
        tokenStorage.removeToken();
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    };

    const initUser = () => {
        const storedToken = tokenStorage.getToken();
        if (storedToken) {
            state.token = storedToken;
            if (typeof window !== 'undefined') {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    try {
                        state.user = JSON.parse(storedUser);
                    } catch (e) {
                        console.error('Failed to parse user from storage', e);
                    }
                }
            }
        }
    };

    // Initialize on load
    if (typeof window !== 'undefined') {
        initUser();
    }

    return {
        ...toRefs(state),
        setUser,
        clearUser,
        isLoggedIn: () => !!state.token,
    };
};
