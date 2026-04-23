import { ref } from 'vue'

export const isDark = ref(
  localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)

export const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

export const initTheme = () => {
  document.documentElement.classList.toggle('dark', isDark.value)
}
