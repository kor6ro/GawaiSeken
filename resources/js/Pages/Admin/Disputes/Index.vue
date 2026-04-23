<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, Link } from '@inertiajs/vue3'
import Pagination from '@/Components/Pagination.vue'
import { AlertCircle, ChevronRight, MessageSquare, Clock } from 'lucide-vue-next'

const props = defineProps({
    disputes: Object
})

const headers = [
    { text: "Transaksi", value: "transaction" },
    { text: "Pelapor", value: "user" },
    { text: "Alasan", value: "reason" },
    { text: "Status", value: "status" },
    { text: "Tanggal", value: "created_at" },
    { text: "Aksi", value: "actions", width: 120 },
]

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

                        <div class="easy-table-wrapper">
                            <EasyDataTable
                                :headers="headers"
                                :items="disputes.data"
                                hide-footer
                                border-cell
                                table-class-name="customize-table"
                                header-class-name="customize-header"
                            >
                                <template #item-transaction="{ transaction }">
                                    <span class="font-bold text-foreground">#{{ transaction.reference_number }}</span>
                                </template>

                                <template #item-user="{ user }">
                                    <div class="py-2">
                                        <div class="font-medium text-foreground">{{ user.name }}</div>
                                        <div class="text-[10px] text-muted-foreground">{{ user.email }}</div>
                                    </div>
                                </template>

                                <template #item-reason="{ reason }">
                                    <span class="text-xs font-medium text-foreground">
                                        {{ 
                                            reason === 'not_delivered' ? 'Barang Belum Sampai' :
                                            reason === 'not_as_described' ? 'Barang Tidak Sesuai Deskripsi' :
                                            reason === 'damaged' ? 'Barang Rusak / Cacat' : 'Lainnya'
                                        }}
                                    </span>
                                </template>

                                <template #item-status="{ status }">
                                    <span 
                                        class="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"
                                        :class="getStatusClass(status)"
                                    >
                                        {{ getStatusLabel(status) }}
                                    </span>
                                </template>

                                <template #item-created_at="{ created_at }">
                                    <span class="text-muted-foreground">
                                        {{ new Date(created_at).toLocaleDateString('id-ID') }}
                                    </span>
                                </template>

                                <template #item-actions="item">
                                    <div class="flex justify-end py-2">
                                        <Link 
                                            :href="route('admin.disputes.show', item.id)"
                                            class="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                        >
                                            Detail
                                            <ChevronRight class="h-3 w-3" />
                                        </Link>
                                    </div>
                                </template>

                                <template #empty-message>
                                    <div class="py-20 text-center text-muted-foreground">
                                        <Clock class="h-12 w-12 mx-auto mb-4 opacity-20" />
                                        <p class="font-medium">Tidak ada komplain yang perlu diproses.</p>
                                    </div>
                                </template>
                            </EasyDataTable>
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

<style scoped>
.customize-table {
  --easy-table-border: 1px solid hsl(var(--border));
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: hsl(var(--muted-foreground));
  --easy-table-header-background-color: hsl(var(--muted));
  
  --easy-table-body-row-font-size: 13px;
  --easy-table-body-font-color: hsl(var(--foreground));
  --easy-table-body-row-height: 60px;
  --easy-table-body-row-background-color: hsl(var(--card));
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.5);
  
  --easy-table-footer-background-color: hsl(var(--card));
  --easy-table-footer-font-color: hsl(var(--muted-foreground));
  --easy-table-footer-font-size: 12px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  border-radius: 12px;
  overflow: hidden;
}

:deep(.customize-header) {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.easy-table-wrapper {
  @apply rounded-xl overflow-hidden border border-border shadow-sm bg-card;
}

/* Dark mode specific overrides */
.dark .customize-table {
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.3);
}
</style>
