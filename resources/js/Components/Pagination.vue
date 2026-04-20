<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
  links: Array,
})
</script>

<template>
  <div v-if="links.length > 3">
    <div class="-mb-1 mt-12 flex flex-wrap justify-center">
      <template v-for="(link, key) in links" :key="key">
        <div
          v-if="link.url === null"
          :key="key"
          class="mb-1 mr-1 rounded-xl border border-border px-4 py-3 text-sm leading-4 text-muted-foreground"
          v-html="link.label"
        />
        <Link
          v-else
          :key="`link-${key}`"
          class="mb-1 mr-1 rounded-xl border border-border px-4 py-3 text-sm leading-4 transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:border-primary focus:text-primary"
          :class="{ 'border-primary bg-primary font-bold text-primary-foreground': link.active }"
          :href="link.url"
          v-html="link.label"
        />
      </template>
    </div>
  </div>
</template>
