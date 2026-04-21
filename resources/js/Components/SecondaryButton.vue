<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-xs font-black uppercase tracking-widest text-secondary-foreground shadow-sm transition-all duration-100 hover:-translate-y-0.5 hover:bg-accent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 active:shadow-inner disabled:opacity-25"
  >
    <slot />
  </button>
</template>
