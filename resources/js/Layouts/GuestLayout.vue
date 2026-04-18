<script setup>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

const isDark = ref(false);

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark');
});

const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background text-foreground transition-colors duration-300 font-sans antialiased">
        <div class="w-full sm:max-w-md mt-6 px-6 py-8 bg-card text-card-foreground border border-border shadow-xl sm:rounded-3xl">
            <div class="flex justify-center mb-8">
                <Link href="/">
                    <ApplicationLogo class="w-32 h-auto text-primary" />
                </Link>
            </div>

            <slot />
        </div>

        <div class="mt-8">
            <button @click="toggleTheme" class="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors">
                <span v-if="!isDark">Mode Gelap</span>
                <span v-else>Mode Terang</span>
            </button>
        </div>
    </div>
</template>
