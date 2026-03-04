<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" x-data :class="{ 'dark': $store.theme.isDark }">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'GawaiSeken') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script>
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia(
            '(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased bg-background text-foreground">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-4 bg-card text-card-foreground border border-border shadow sm:rounded-lg">
            <div class="flex justify-center mb-6">
                <a href="/">
                    <x-application-logo class="w-32 h-auto" />
                </a>
            </div>
            {{ $slot }}
        </div>

        <div class="mt-4">
            <button @click="$store.theme.toggle()"
                class="text-xs text-muted-foreground hover:text-foreground underline">
                <span x-show="!$store.theme.isDark">Mode Gelap</span>
                <span x-show="$store.theme.isDark">Mode Terang</span>
            </button>
        </div>
    </div>
</body>

</html>