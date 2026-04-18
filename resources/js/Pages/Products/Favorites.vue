<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ProductCard from '@/Components/ProductCard.vue';
import { ShoppingCart, Package } from 'lucide-vue-next';
import Pagination from '@/Components/Pagination.vue';

const props = defineProps({
    products: Object,
    auth: Object,
});
</script>

<template>
    <AppLayout>
        <Head title="Keranjang Saya" />

        <div class="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center gap-4 mb-10">
                    <div class="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                        <ShoppingCart class="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 dark:text-white">Keranjang Saya</h1>
                        <p class="text-slate-500 dark:text-slate-400 font-medium">Produk yang Anda taruh di keranjang.</p>
                    </div>
                </div>

                <div v-if="products.data.length > 0" class="space-y-8">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                        <ProductCard v-for="product in products.data" :key="product.id" :product="product" :auth="auth" />
                    </div>
                    <div class="mt-8 flex justify-center">
                        <Pagination :links="products.links" />
                    </div>
                </div>

                <div v-else class="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div class="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                        <Package class="w-12 h-12 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">Keranjang Kosong</h3>
                    <p class="text-slate-500 dark:text-slate-400 mt-2 mb-8">Anda belum memasukkan produk apapun ke keranjang.</p>
                    <Link :href="route('home')" class="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Cari Produk Sekarang
                    </Link>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
