<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'

const props = defineProps({
    fallbackRoute: {
        type: String,
        default: 'home'
    }
})

const goBack = () => {
    // If the browser has history state (meaning they navigated within the app)
    if (window.history.state && window.history.length > 1) {
        window.history.back()
    } else {
        // Otherwise, use the fallback route
        router.get(route(props.fallbackRoute))
    }
}
</script>

<template>
    <button 
        @click="goBack" 
        class="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground flex-shrink-0"
    >
        <ChevronLeft class="h-5 w-5" />
    </button>
</template>
