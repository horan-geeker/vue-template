import { onUnmounted } from 'vue';
import { useUser } from './useUser';

export function useAuth() {
    const { setUser } = useUser();
    let messageHandler: ((event: MessageEvent) => void) | null = null;

    const loginWithGoogle = () => {
        const clientId = '1088178830194-vauvp835rfi35k3l1t8j27i8esi3eeub.apps.googleusercontent.com';
        const redirectUri = 'https://api.example.com/callback/google-auth';
        const scope = 'profile email';
        const responseType = 'code';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            authUrl,
            'google_login',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        // Remove existing listener if any to prevent duplicates
        if (messageHandler) {
            window.removeEventListener('message', messageHandler);
        }

        messageHandler = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            if (event.data && event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
                const { user, token } = event.data.payload;
                setUser(user, token);
                // Optional: Show success toast
                console.log('Login successful', user);
            }
        };

        window.addEventListener('message', messageHandler);
    };

    onUnmounted(() => {
        if (messageHandler) {
            window.removeEventListener('message', messageHandler);
        }
    });

    return {
        loginWithGoogle
    };
}
