<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    modelValue: [String, Number],
    id: String,
    required: Boolean,
    placeholder: String,
    class: String,
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 99999999999
    }
});

const emit = defineEmits(['update:modelValue']);

const displayValue = ref('');

// Helper to format number to Rupiah string
const formatRupiah = (value) => {
    if (value === null || value === undefined || value === '') return '';
    // Handle numeric values which may have decimals from DB
    const cleanValue = typeof value === 'number' 
        ? Math.floor(value).toString() 
        : String(value).replace(/[^0-9]/g, '');
    
    if (!cleanValue) return '';
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Helper to strip non-numeric characters
const stripFormatting = (value) => {
    return value.replace(/[^0-9]/g, '');
};

const handleInput = (event) => {
    let rawValue = stripFormatting(event.target.value);
    
    // Enforce max value
    if (props.max && Number(rawValue) > props.max) {
        rawValue = String(props.max);
    }
    
    displayValue.value = formatRupiah(rawValue);
    emit('update:modelValue', rawValue ? Number(rawValue) : '');
};

// Sync internal display value when external model changes
watch(() => props.modelValue, (newVal) => {
    const formatted = formatRupiah(newVal);
    if (formatted !== displayValue.value) {
        displayValue.value = formatted;
    }
}, { immediate: true });

onMounted(() => {
    if (props.modelValue) {
        displayValue.value = formatRupiah(props.modelValue);
    }
});
</script>

<template>
    <div class="relative mt-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span class="text-muted-foreground font-bold text-sm">Rp</span>
        </div>
        <input
            :id="id"
            type="text"
            v-model="displayValue"
            @input="handleInput"
            class="block w-full h-11 pl-10 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all"
            :class="props.class"
            :required="required"
            :placeholder="placeholder"
        />
    </div>
</template>
