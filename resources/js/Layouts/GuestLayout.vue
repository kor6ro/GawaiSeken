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
    class="flex min-h-screen flex-col items-center bg-background pt-6 font-sans text-foreground antialiased transition-colors duration-300 sm:justify-center sm:pt-0"
  >
    <div
      class="mt-6 w-full border border-border bg-card px-6 py-8 text-card-foreground shadow-xl sm:max-w-md sm:rounded-3xl"
    >
      <div class="mb-8 flex justify-center">
        <Link href="/">
          <ApplicationLogo class="h-auto w-32 text-primary" />
        </Link>
      </div>

      <slot />
    </div>

    <div class="mt-8">
      <button
        @click="toggleTheme"
        class="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
      >
        <span v-if="!isDark">Mode Gelap</span>
        <span v-else>Mode Terang</span>
      </button>
    </div>
  </div>
</template>
