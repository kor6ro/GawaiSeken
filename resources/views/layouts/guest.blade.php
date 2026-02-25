<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" x-data="{
    darkMode: localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
}" x-init="$watch('darkMode', val => {
    localStorage.setItem('theme', val ? 'dark' : 'light');
    if (val) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
})"
    :class="{ 'dark': darkMode }">

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

<body class="font-sans text-gray-900 antialiased bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg transition-colors duration-200">
            <div class="flex justify-center mb-6">
                <a href="/">
                    <x-application-logo class="w-32 h-auto" />
                </a>
            </div>
            {{ $slot }}
        </div>

        <div class="mt-4">
            <button @click="darkMode = !darkMode" class="text-xs text-gray-500 dark:text-gray-400 underline">
                <span x-show="!darkMode">Mode Gelap</span>
                <span x-show="darkMode">Mode Terang</span>
            </button>
        </div>
    </div>
</body>

</html>
