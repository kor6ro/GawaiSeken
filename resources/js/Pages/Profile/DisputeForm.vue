<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import Modal from '@/Components/Modal.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import { AlertTriangle, Upload, X, Image as ImageIcon } from 'lucide-vue-next'

const props = defineProps({
    show: Boolean,
    transaction: Object
})

const emit = defineEmits(['close'])

const form = useForm({
    reason: '',
    description: '',
    evidence_images: []
})

const imagePreviews = ref([])

const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    files.forEach(file => {
        form.evidence_images.push(file)
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreviews.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
    })
}

const removeImage = (index) => {
    form.evidence_images.splice(index, 1)
    imagePreviews.value.splice(index, 1)
}

const submit = () => {
    form.post(route('transactions.dispute', props.transaction.id), {
        onSuccess: () => {
            form.reset()
            imagePreviews.value = []
            emit('close')
        }
    })
}

const closeModal = () => {
    form.reset()
    imagePreviews.value = []
    emit('close')
}
</script>

<template>
    <Modal :show="show" @close="closeModal" maxWidth="2xl">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-6">
                <div class="p-2 rounded-full bg-amber-100 text-amber-600">
                    <AlertTriangle class="h-6 w-6" />
                </div>
                <div>
                    <h2 class="text-xl font-bold text-foreground">Ajukan Komplain Pesanan</h2>
                    <p class="text-sm text-muted-foreground">Transaksi #{{ transaction?.reference_number }}</p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- Reason Selection -->
                <div>
                    <InputLabel for="reason" value="Alasan Komplain" />
                    <select
                        id="reason"
                        v-model="form.reason"
                        class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        required
                    >
                        <option value="" disabled>Pilih alasan...</option>
                        <option value="not_delivered">Barang Belum Sampai</option>
                        <option value="not_as_described">Barang Tidak Sesuai Deskripsi</option>
                        <option value="damaged">Barang Rusak / Cacat</option>
                        <option value="other">Alasan Lainnya</option>
                    </select>
                    <InputError :message="form.errors.reason" class="mt-2" />
                </div>

                <!-- Description -->
                <div>
                    <InputLabel for="description" value="Deskripsi Masalah" />
                    <textarea
                        id="description"
                        v-model="form.description"
                        rows="4"
                        class="mt-1 block w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="Jelaskan secara detail masalah yang Anda hadapi..."
                        required
                    ></textarea>
                    <InputError :message="form.errors.description" class="mt-2" />
                </div>

                <!-- Evidence Images -->
                <div>
                    <InputLabel value="Foto Bukti (Minimal 1)" />
                    <div class="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div
                            v-for="(preview, index) in imagePreviews"
                            :key="index"
                            class="relative aspect-square rounded-xl border border-border bg-muted overflow-hidden group"
                        >
                            <img :src="preview" class="h-full w-full object-cover" />
                            <button
                                @click.prevent="removeImage(index)"
                                class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X class="h-3 w-3" />
                            </button>
                        </div>

                        <label
                            v-if="imagePreviews.length < 4"
                            class="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                        >
                            <Upload class="h-6 w-6 text-muted-foreground mb-1" />
                            <span class="text-[10px] font-bold text-muted-foreground uppercase">Upload</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                class="hidden"
                                @change="handleImageUpload"
                            />
                        </label>
                    </div>
                    <p class="mt-2 text-xs text-muted-foreground">Lampirkan foto label pengiriman atau kondisi barang yang rusak.</p>
                    <InputError :message="form.errors.evidence_images" class="mt-2" />
                </div>

                <div class="flex items-center justify-end gap-3 pt-4 border-t border-border">
                    <SecondaryButton @click="closeModal" type="button">Batal</SecondaryButton>
                    <PrimaryButton :disabled="form.processing">
                        <span v-if="form.processing" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        Kirim Komplain
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </Modal>
</template>
