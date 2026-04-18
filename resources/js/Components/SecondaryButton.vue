<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button
        :type="type"
        class="inline-flex items-center justify-center px-6 py-3 bg-secondary border border-border rounded-lg font-black text-xs text-secondary-foreground uppercase tracking-widest shadow-sm hover:bg-accent hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-25 transition-all duration-200"
    >
        <slot />
    </button>
</template>
