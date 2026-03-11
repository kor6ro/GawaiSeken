// Only initialise Echo + Pusher when the credentials are actually configured.
// On a fresh clone without Pusher keys set in .env, this block is safely skipped
// so the rest of the JS bundle doesn't crash.
if (import.meta.env.VITE_PUSHER_APP_KEY) {
    Promise.all([
        import('laravel-echo'),
        import('pusher-js'),
    ]).then(([{ default: Echo }, { default: Pusher }]) => {
        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            wsHost: import.meta.env.VITE_PUSHER_HOST,
            wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
            wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
    });
}
