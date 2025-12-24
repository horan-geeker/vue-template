export function useAuth() {
    const loginWithGoogle = () => {
        const clientId = '1088178830194-vauvp835rfi35k3l1t8j27i8esi3eeub.apps.googleusercontent.com'; // TODO: specific client ID
        const redirectUri = 'https://api.example.com/callback/google-auth'; // Or a specific callback URL
        const scope = 'profile email';
        const responseType = 'code'; // or 'code' based on backend
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

        // TODO: Listen for the message from the popup
        // window.addEventListener('message', (event) => { ... });
    };

    return {
        loginWithGoogle
    };
}
