<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, Link } from '@inertiajs/vue3'
import Pagination from '@/Components/Pagination.vue'
import { AlertCircle, ChevronRight, MessageSquare, Clock } from 'lucide-vue-next'

const props = defineProps({
    disputes: Object
})

const getStatusClass = (status) => {
    switch (status) {
        case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
        case 'investigating': return 'bg-blue-100 text-blue-700 border-blue-200'
        case 'resolved': return 'bg-green-100 text-green-700 border-green-200'
        case 'closed': return 'bg-slate-100 text-slate-700 border-slate-200'
        default: return 'bg-slate-100 text-slate-700'
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case 'pending': return 'Menunggu Review'
        case 'investigating': return 'Sedang Investigasi'
        case 'resolved': return 'Selesai (Refund)'
        case 'closed': return 'Selesai (Release)'
        default: return status
    }
}
</script>

<template>
    <Head title="Manajemen Komplain" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-foreground">Pusat Resolusi & Komplain</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-8">
                            <div class="p-3 rounded-2xl bg-red-100 text-red-600">
                                <AlertCircle class="h-6 w-6" />
                            </div>
                            <div>
                                <h3 class="text-lg font-bold">Daftar Komplain Transaksi</h3>
                                <p class="text-sm text-muted-foreground">Kelola dan selesaikan sengketa antara Buyer & Seller.</p>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-sm">
                                <thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
                                    <tr>
                                        <th class="px-6 py-4">Transaksi</th>
                                        <th class="px-6 py-4">Pelapor</th>
                                        <th class="px-6 py-4">Alasan</th>
                                        <th class="px-6 py-4">Status</th>
                                        <th class="px-6 py-4">Tanggal</th>
                                        <th class="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-border">
                                    <tr v-for="dispute in disputes.data" :key="dispute.id" class="hover:bg-muted/30 transition-colors">
                                        <td class="px-6 py-4 font-bold">#{{ dispute.transaction.reference_number }}</td>
                                        <td class="px-6 py-4">
                                            <div class="font-medium text-foreground">{{ dispute.user.name }}</div>
                                            <div class="text-[10px] text-muted-foreground">{{ dispute.user.email }}</div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="text-xs font-medium">
                                                {{ 
                                                    dispute.reason === 'not_delivered' ? 'Barang Belum Sampai' :
                                                    dispute.reason === 'not_as_described' ? 'Barang Tidak Sesuai Deskripsi' :
                                                    dispute.reason === 'damaged' ? 'Barang Rusak / Cacat' : 'Lainnya'
                                                }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span 
                                                class="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"
                                                :class="getStatusClass(dispute.status)"
                                            >
                                                {{ getStatusLabel(dispute.status) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-muted-foreground">
                                            {{ new Date(dispute.created_at).toLocaleDateString('id-ID') }}
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <Link 
                                                :href="route('admin.disputes.show', dispute.id)"
                                                class="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                            >
                                                Detail
                                                <ChevronRight class="h-3 w-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr v-if="disputes.data.length === 0">
                                        <td colspan="6" class="px-6 py-20 text-center text-muted-foreground">
                                            <Clock class="h-12 w-12 mx-auto mb-4 opacity-20" />
                                            <p class="font-medium">Tidak ada komplain yang perlu diproses.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-8">
                            <Pagination :links="disputes.links" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
