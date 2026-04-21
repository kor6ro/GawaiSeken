<script setup>
defineProps({
  type: {
    type: String,
    default: 'submit',
  },
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-100 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 active:shadow-inner"
  >
    <slot />
  </button>
</template>
