<template>
  <div :class="containerClass">
    <img
      src="/images/gawaiwhite.png"
      alt="GawaiSeken"
      class="block dark:hidden"
      :style="{ maxWidth: width, height: 'auto' }"
    />

    <img
      src="/images/gawaiblack.png"
      alt="GawaiSeken"
      class="hidden dark:block"
      :style="{ maxWidth: width, height: 'auto' }"
    />
  </div>
</template>

<script setup>
defineProps({
  containerClass: {
    type: String,
    default: 'relative',
  },
  width: {
    type: String,
    default: '128px',
  },
})
</script>
