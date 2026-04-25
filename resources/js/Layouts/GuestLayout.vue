<script setup>
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] font-sans text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
  >
    <!-- Background Decoration -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      <div class="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-500/5 blur-[120px]"></div>
    </div>

    <div class="relative z-10 w-full px-4 sm:max-w-[440px]">
      <div class="mb-8 flex flex-col items-center">
        <Link href="/" class="transition-transform hover:scale-105 active:scale-95">
          <ApplicationLogo class="h-12 w-auto text-primary" />
        </Link>
      </div>

      <div
        class="overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80 sm:p-10"
      >
        <slot />
      </div>

      <div class="mt-8 flex flex-col items-center gap-4">
        <button
          @click="toggleTheme"
          class="rounded-full bg-white/50 px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:bg-white hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm"
        >
          <span v-if="!isDark">🌙 Mode Gelap</span>
          <span v-else>☀️ Mode Terang</span>
        </button>
        
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          &copy; 2026 GawaiSeken Marketplace
        </p>
      </div>
    </div>
  </div>
</template>
