<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button
        :type="type"
        class="inline-flex items-center justify-center px-6 py-3 bg-primary border border-transparent rounded-lg font-black text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 shadow-md"
    >
        <slot />
    </button>
</template>
