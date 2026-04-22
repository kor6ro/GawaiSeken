<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import { 
    AlertCircle, 
    ChevronLeft, 
    Package, 
    User, 
    Store, 
    ArrowRight,
    CheckCircle,
    XCircle,
    Info,
    ExternalLink
} from 'lucide-vue-next'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import Modal from '@/Components/Modal.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
    dispute: Object
})

const showDecisionModal = ref(false)
const decisionType = ref('') // 'refund_to_buyer' or 'release_to_seller'

const form = useForm({
    resolution: '',
    admin_note: ''
})

const openDecision = (type) => {
    decisionType.value = type
    form.resolution = type
    showDecisionModal.value = true
}

const submitResolution = () => {
    form.post(route('admin.disputes.resolve', props.dispute.id), {
        onSuccess: () => {
            showDecisionModal.value = false
        }
    })
}
</script>

<template>
    <Head title="Detail Komplain" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-4">
                <Link :href="route('admin.disputes.index')" class="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                    <ChevronLeft class="h-5 w-5" />
                </Link>
                <h2 class="text-xl font-semibold leading-tight text-foreground">Detail Komplain #{{ dispute.transaction.reference_number }}</h2>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                <!-- Status Banner -->
                <div 
                    v-if="dispute.status === 'resolved' || dispute.status === 'closed'"
                    class="p-4 rounded-2xl border flex items-center gap-3"
                    :class="dispute.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-blue-50 border-blue-200 text-blue-800'"
                >
                    <CheckCircle class="h-5 w-5" />
                    <p class="font-bold">
                        {{ dispute.status === 'resolved' ? 'Sengketa telah diselesaikan dengan pengembalian dana (Refund).' : 'Sengketa telah ditutup dengan meneruskan dana ke Seller.' }}
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Left: Problem Description & Evidence -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
                            <div class="p-6">
                                <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                    <AlertCircle class="text-red-500 h-5 w-5" />
                                    Informasi Masalah
                                </h3>
                                
                                <div class="bg-muted/50 p-4 rounded-xl mb-6">
                                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Alasan Komplain</p>
                                    <p class="text-lg font-bold text-foreground">
                                        {{ 
                                            dispute.reason === 'not_delivered' ? 'Barang Belum Sampai' :
                                            dispute.reason === 'not_as_described' ? 'Barang Tidak Sesuai Deskripsi' :
                                            dispute.reason === 'damaged' ? 'Barang Rusak / Cacat' : 'Lainnya'
                                        }}
                                    </p>
                                </div>

                                <div class="mb-8">
                                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Deskripsi Lengkap</p>
                                    <p class="text-sm leading-relaxed text-foreground whitespace-pre-line">{{ dispute.description }}</p>
                                </div>

                                <div v-if="dispute.evidence_images?.length > 0">
                                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Bukti Foto dari Buyer</p>
                                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        <a 
                                            v-for="(img, idx) in dispute.evidence_images" 
                                            :key="idx" 
                                            :href="`/storage/${img}`" 
                                            target="_blank"
                                            class="aspect-square rounded-2xl border border-border overflow-hidden hover:opacity-80 transition-opacity group relative"
                                        >
                                            <img :src="`/storage/${img}`" class="h-full w-full object-cover" />
                                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <ExternalLink class="text-white h-6 w-6" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Chat Context (Optional info) -->
                        <div class="bg-card border border-border shadow sm:rounded-2xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-muted-foreground/60">
                                <Info class="h-5 w-5" />
                                Catatan Admin
                            </h3>
                            <div v-if="dispute.admin_note" class="p-4 rounded-xl bg-muted border border-border">
                                <p class="text-sm italic text-foreground">{{ dispute.admin_note }}</p>
                            </div>
                            <p v-else class="text-sm text-muted-foreground italic">Belum ada catatan resolusi.</p>
                        </div>
                    </div>

                    <!-- Right: Parties Info & Actions -->
                    <div class="space-y-6">
                        <!-- Parties Info -->
                        <div class="bg-card border border-border shadow sm:rounded-2xl p-6">
                            <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Pihak Terlibat</h3>
                            
                            <div class="space-y-6">
                                <!-- Buyer -->
                                <div class="flex items-center gap-3">
                                    <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {{ dispute.user.name.substring(0, 1) }}
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold uppercase tracking-widest text-blue-500">Buyer (Pelapor)</p>
                                        <p class="font-bold text-foreground">{{ dispute.user.name }}</p>
                                        <p class="text-[10px] text-muted-foreground truncate">{{ dispute.user.email }}</p>
                                    </div>
                                </div>

                                <div class="flex justify-center">
                                    <ArrowRight class="h-4 w-4 text-muted-foreground rotate-90 lg:rotate-0" />
                                </div>

                                <!-- Seller -->
                                <div class="flex items-center gap-3 text-right justify-end lg:justify-start lg:text-left">
                                    <div class="lg:order-last">
                                        <div class="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                            {{ dispute.transaction.seller.name.substring(0, 1) }}
                                        </div>
                                    </div>
                                    <div class="lg:order-first">
                                        <p class="text-xs font-bold uppercase tracking-widest text-emerald-600">Seller</p>
                                        <p class="font-bold text-foreground">{{ dispute.transaction.seller.name }}</p>
                                        <p class="text-[10px] text-muted-foreground truncate">{{ dispute.transaction.seller.email }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Product & Price -->
                        <div class="bg-card border border-border shadow sm:rounded-2xl p-6">
                            <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Transaksi</h3>
                            <div class="flex gap-4 mb-4">
                                <div class="h-16 w-16 rounded-xl border border-border overflow-hidden bg-muted">
                                    <img v-if="dispute.transaction.product.images?.length > 0" :src="`/storage/${dispute.transaction.product.images[0].image_path}`" class="h-full w-full object-cover" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-bold text-sm line-clamp-1">{{ dispute.transaction.product.title }}</p>
                                    <p class="text-lg font-black text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(dispute.transaction.price) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Admin Actions -->
                        <div v-if="dispute.status === 'pending' || dispute.status === 'investigating'" class="bg-card border border-border shadow sm:rounded-2xl p-6 space-y-4">
                            <h3 class="text-sm font-bold uppercase tracking-widest text-foreground mb-2 text-center">Putusan Admin</h3>
                            
                            <PrimaryButton 
                                class="w-full justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 h-12 rounded-2xl"
                                @click="openDecision('release_to_seller')"
                            >
                                <CheckCircle class="h-4 w-4" />
                                Release ke Seller
                            </PrimaryButton>

                            <DangerButton 
                                class="w-full justify-center gap-2 h-12 rounded-2xl"
                                @click="openDecision('refund_to_buyer')"
                            >
                                <XCircle class="h-4 w-4" />
                                Refund ke Buyer
                            </DangerButton>

                            <p class="text-[10px] text-center text-muted-foreground italic">Keputusan admin bersifat mutlak dan tidak dapat diganggu gugat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decision Confirmation Modal -->
        <Modal :show="showDecisionModal" @close="showDecisionModal = false" maxWidth="md">
            <div class="p-6">
                <h2 class="text-xl font-bold text-foreground mb-2">
                    Konfirmasi Putusan
                </h2>
                <div class="p-4 rounded-xl mb-6 flex items-start gap-3" :class="decisionType === 'refund_to_buyer' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'">
                    <Info class="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p class="text-sm font-medium">
                        Anda akan memutus perkara ini dengan <strong>{{ decisionType === 'refund_to_buyer' ? 'Mengembalikan dana ke Pembeli' : 'Meneruskan dana ke Penjual' }}</strong>.
                    </p>
                </div>

                <form @submit.prevent="submitResolution" class="space-y-4">
                    <div>
                        <InputLabel for="admin_note" value="Alasan Keputusan Admin" />
                        <textarea
                            id="admin_note"
                            v-model="form.admin_note"
                            rows="4"
                            class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Jelaskan alasan dibalik keputusan ini agar transparan bagi kedua belah pihak..."
                            required
                        ></textarea>
                        <InputError :message="form.errors.admin_note" class="mt-2" />
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <SecondaryButton @click="showDecisionModal = false">Batal</SecondaryButton>
                        <PrimaryButton 
                            :disabled="form.processing"
                            :class="decisionType === 'refund_to_buyer' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'"
                        >
                            Konfirmasi & Selesaikan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>
