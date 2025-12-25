import { onUnmounted } from 'vue';
import { useUser } from './useUser';

export function useAuth() {
    const { setUser } = useUser();
    let channel: BroadcastChannel | null = null;

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

        // Close existing channel if any
        if (channel) {
            channel.close();
        }

        channel = new BroadcastChannel('google-auth_channel');
        channel.onmessage = (event) => {
            if (event.data && event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
                const { user, token } = event.data.payload;
                setUser(user, token);
                console.log('Login successful via BroadcastChannel', user);

                // Close channel after success
                if (channel) {
                    channel.close();
                    channel = null;
                }
            }
        };
    };

    onUnmounted(() => {
        if (channel) {
            channel.close();
        }
    });

    return {
        loginWithGoogle
    };
}
