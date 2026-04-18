<script setup>
import { ref, watch } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ProductCard from '@/Components/ProductCard.vue';
import Pagination from '@/Components/Pagination.vue';
import Modal from '@/Components/Modal.vue';
import { SlidersHorizontal, Search, Cpu, HardDrive, Package, ArrowUpDown, X } from 'lucide-vue-next';
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

const props = defineProps({
    products: Object,
    categories: Array,
    rams: Array,
    storages: Array,
    kelengkapan: Array,
    filters: Object,
    auth: Object,
});

const filterModalOpen = ref(false);
const search = ref(props.filters.search || '');
const loading = ref(false);

const filterParams = ref({
    category: props.filters.category || '',
    ram: props.filters.ram || '',
    storage: props.filters.storage || '',
    kelengkapan: props.filters.kelengkapan || '',
    sort: props.filters.sort || 'latest',
});

const performSearch = debounce(() => {
    loading.value = true;
    
    let params = pickBy({
        search: search.value,
        ...filterParams.value
    }, (value, key) => {
        if (key === 'sort' && value === 'latest') return false;
        return value !== '' && value !== null && value !== undefined;
    });

    router.get(route('home'), params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => loading.value = false,
    });
}, 500);

watch(() => props.filters.search, (newVal) => {
    search.value = newVal || '';
});

watch(search, () => {
    performSearch();
});

const applyFilters = () => {
    filterModalOpen.value = false;

    let params = pickBy({
        search: search.value,
        ...filterParams.value
    }, (value, key) => {
        if (key === 'sort' && value === 'latest') return false;
        return value !== '' && value !== null && value !== undefined;
    });

    router.get(route('home'), params, {
        preserveState: true,
    });
};

const resetFilters = () => {
    search.value = '';
    filterParams.value = {
        category: '',
        ram: '',
        storage: '',
        kelengkapan: '',
        sort: 'latest',
    };
    applyFilters();
};

const hasActiveFilters = () => {
    return filterParams.value.category || filterParams.value.ram || filterParams.value.storage || filterParams.value.kelengkapan || (filterParams.value.sort && filterParams.value.sort !== 'latest') || search.value;
};
</script>

<template>
    <AppLayout>
        <Head title="Home" />

        <div class="py-8 px-4">
            <div class="max-w-7xl mx-auto">
                <!-- Active Filters Info (Optional, simple version) -->
                <div v-if="hasActiveFilters()" class="mb-6 flex items-center justify-between bg-card p-4 rounded-xl border border-border">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-sm font-medium text-muted-foreground mr-2">Hasil untuk:</span>
                        <span v-if="search" class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">"{{ search }}"</span>
                        <span v-if="filterParams.category" class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border">{{ filterParams.category }}</span>
                        <span v-if="filterParams.ram" class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border">RAM: {{ filterParams.ram }}</span>
                        <span v-if="filterParams.storage" class="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-bold border border-border">ROM: {{ filterParams.storage }}</span>
                    </div>
                    <button @click="resetFilters" class="text-xs text-red-500 font-bold hover:underline">Hapus Semua</button>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    <ProductCard v-for="product in products.data" :key="product.id" :product="product" :auth="auth" />
                </div>

                <div v-if="products.data.length === 0" class="col-span-full py-20 text-center bg-card text-card-foreground rounded-2xl border border-dashed border-border transition-colors">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4">
                        <Search class="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tidak ditemukan</h3>
                    <p class="text-gray-500 dark:text-gray-400 mt-1">Coba kata kunci lain atau reset filter.</p>
                    <button @click="resetFilters" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90">
                        Reset Filter
                    </button>
                </div>

                <div class="mt-8">
                    <Pagination :links="products.links" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
