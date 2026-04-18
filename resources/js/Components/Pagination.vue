<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    links: Array,
});
</script>

<template>
    <div v-if="links.length > 3">
        <div class="flex flex-wrap -mb-1 mt-12 justify-center">
            <template v-for="(link, key) in links" :key="key">
                <div v-if="link.url === null" :key="key" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-muted-foreground border border-border rounded-xl" v-html="link.label" />
                <Link v-else :key="`link-${key}`" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-border rounded-xl hover:bg-accent hover:text-accent-foreground focus:border-primary focus:text-primary transition-all duration-200" :class="{ 'bg-primary text-primary-foreground border-primary font-bold': link.active }" :href="link.url" v-html="link.label" />
            </template>
        </div>
    </div>
</template>
