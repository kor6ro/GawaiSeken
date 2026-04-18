<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import CurrencyInput from '@/Components/CurrencyInput.vue';
import { ImagePlus, X, Info, AlertCircle } from 'lucide-vue-next';
import { PRODUCT_BRANDS, PRODUCT_CONDITIONS, RAM_OPTIONS, STORAGE_OPTIONS, KELENGKAPAN_OPTIONS } from '@/constants';

const props = defineProps({
    product: Object,
    categories: Array,
});
const formatCondition = (cond) => {
    if (!cond || cond.includes('Baru')) return 'Bekas Mulus';
    if (cond === 'Bekas - Mulus') return 'Bekas Mulus';
    if (cond === 'Bekas - Ada minus') return 'Bekas Ada minus';
    return cond;
};

const form = useForm({
    _method: 'put',
    brand: props.product.brand,
    type: props.product.type,
    condition: formatCondition(props.product.condition),
    is_cod: props.product.is_cod,
    is_negotiable: props.product.is_negotiable,
    price: props.product.price,
    status: props.product.status,
    description: props.product.description,
    specifications: {
        ram: props.product.specifications?.ram || '',
        storage: props.product.specifications?.storage || '',
        battery_health: props.product.specifications?.battery_health || '',
        screen_size: props.product.specifications?.screen_size || '',
        processor: props.product.specifications?.processor || '',
        gpu: props.product.specifications?.gpu || '',
        kelengkapan: props.product.specifications?.kelengkapan || '',
    },
    images: [],
    delete_images: [],
});

const categoryName = computed(() => props.product.category?.name.toLowerCase() || '');
const categoryId = computed(() => props.product.category_id);

const filteredBrands = computed(() => {
    return PRODUCT_BRANDS[categoryId.value] || PRODUCT_BRANDS['default'];
});

const showField = (cats) => {
    const allowed = cats.split(',');
    return allowed.some(cat => categoryName.value.includes(cat));
};

const imagePreviews = ref([]);
const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        form.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviews.value.push({
                url: e.target.result,
                name: file.name
            });
        };
        reader.readAsDataURL(file);
    });
};

const removeNewFile = (index) => {
    form.images.splice(index, 1);
    imagePreviews.value.splice(index, 1);
};

const toggleDeleteExisting = (imageId) => {
    const index = form.delete_images.indexOf(imageId);
    if (index > -1) {
        form.delete_images.splice(index, 1);
    } else {
        form.delete_images.push(imageId);
    }
};

const isExistingDeleted = (imageId) => form.delete_images.includes(imageId);

const submit = () => {
    form.post(route('products.update', props.product.slug), {
        forceFormData: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Edit Produk" />

        <template #header>
            <h2 class="font-semibold text-xl text-foreground leading-tight">
                Edit Produk
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-2xl border border-border">
                    <div class="max-w-2xl mx-auto">
                        <header class="mb-8">
                            <h2 class="text-2xl font-bold">Edit Produk</h2>
                            <p class="mt-1 text-sm text-muted-foreground">Perbarui informasi harga, kondisi, atau detail spesifikasi gawai Anda.</p>
                        </header>

                        <form @submit.prevent="submit" class="space-y-8">
                            <!-- SECTION 1: IDENTITAS PRODUK -->
                            <div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm">
                                <h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2">
                                    <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">1</span>
                                    1. Identitas Produk
                                </h3>
                                
                                <div class="space-y-6">
                                    <div>
                                        <InputLabel value="Kategori" />
                                        <TextInput :value="product.category.name" class="mt-1 block w-full bg-muted/50 cursor-not-allowed" disabled />
                                        <p class="text-[10px] text-muted-foreground mt-1 italic flex items-center gap-1">
                                            <Info class="w-3 h-3" />
                                            Kategori tidak dapat diubah untuk menjaga konsistensi spesifikasi.
                                        </p>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel for="brand" value="Merek / Brand" />
                                            <select id="brand" v-model="form.brand"
                                                class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all"
                                                required>
                                                <option value="">-- Pilih Merek --</option>
                                                <option v-for="brand in filteredBrands" :key="brand" :value="brand">{{ brand }}</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                            <InputError class="mt-2" :message="form.errors.brand" />
                                        </div>

                                        <div>
                                            <InputLabel for="type" value="Tipe / Model" />
                                            <TextInput id="type" v-model="form.type" type="text" class="mt-1 block w-full h-11" required placeholder="Misal: iPhone 13" />
                                            <InputError class="mt-2" :message="form.errors.type" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- SECTION 2: INFORMASI PENJUALAN -->
                            <div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm">
                                <h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2">
                                    <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">2</span>
                                    2. Informasi Penjualan
                                </h3>
                                
                                <div class="space-y-6">
                                    <div>
                                        <InputLabel for="price" value="Harga Produk (Rp)" />
                                        <CurrencyInput id="price" v-model="form.price" :required="true" placeholder="0" />
                                        <InputError class="mt-2" :message="form.errors.price" />
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="col-span-1 md:col-span-2">
                                            <InputLabel for="condition" value="Kondisi Barang" />
                                            <select id="condition" v-model="form.condition"
                                                class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"
                                                required>
                                                <option v-for="item in PRODUCT_CONDITIONS" :key="item.value" :value="item.value">{{ item.label }}</option>
                                            </select>
                                            <InputError class="mt-2" :message="form.errors.condition" />
                                        </div>

                                        <div class="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl border border-border mt-2">
                                            <div class="flex items-center gap-2">
                                                <input type="checkbox" id="is_cod" v-model="form.is_cod" class="rounded border-border text-primary focus:ring-primary">
                                                <InputLabel for="is_cod" value="Fitur COD" class="!mb-0 cursor-pointer" />
                                            </div>
                                            <div class="w-px h-6 bg-border mx-2"></div>
                                            <div class="flex items-center gap-2">
                                                <input type="checkbox" id="is_negotiable" v-model="form.is_negotiable" class="rounded border-border text-primary focus:ring-primary">
                                                <InputLabel for="is_negotiable" value="Bisa Nego" class="!mb-0 cursor-pointer" />
                                            </div>
                                        </div>

                                        <div class="col-span-1 md:col-span-2">
                                            <InputLabel for="status" value="Status Ketersediaan" />
                                            <select id="status" v-model="form.status"
                                                class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm">
                                                <option value="available">Tersedia (Available)</option>
                                                <option value="sold">Terjual (Sold)</option>
                                            </select>
                                            <InputError class="mt-2" :message="form.errors.status" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel for="description" value="Deskripsi Produk" />
                                        <textarea id="description" v-model="form.description" rows="5"
                                            class="mt-1 block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all p-3 text-sm"
                                            required :placeholder="form.condition === 'Bekas Ada minus' || form.condition === 'Minus' ? 'WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)...' : 'Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...'"></textarea>
                                        <InputError class="mt-2" :message="form.errors.description" />
                                    </div>
                                </div>
                            </div>

                            <!-- SECTION 3: SPESIFIKASI TAMBAHAN -->
                            <div class="p-6 sm:p-8 rounded-3xl border border-border bg-primary/5 shadow-sm">
                                <h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2">
                                    <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">3</span>
                                    3. Spesifikasi {{ product.category.name }}
                                </h3>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div v-if="showField('smartphone,laptop,tablet')">
                                        <InputLabel for="spec_ram" value="RAM" />
                                        <select v-model="form.specifications.ram" id="spec_ram" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11">
                                            <option value="">Pilih RAM</option>
                                            <option v-for="ram in RAM_OPTIONS" :key="ram" :value="ram">{{ ram }}</option>
                                        </select>
                                    </div>

                                    <div v-if="showField('smartphone,laptop,tablet')">
                                        <InputLabel for="spec_storage" value="Penyimpanan (ROM/SSD)" />
                                        <select v-model="form.specifications.storage" id="spec_storage" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11">
                                            <option value="">Pilih Kapasitas</option>
                                            <option v-for="rom in STORAGE_OPTIONS" :key="rom" :value="rom">{{ rom }}</option>
                                        </select>
                                    </div>

                                    <div v-if="showField('smartphone,tablet')">
                                        <InputLabel for="spec_bh" value="Battery Health (BH) %" />
                                        <TextInput v-model="form.specifications.battery_health" type="number" class="block w-full mt-1 h-11" placeholder="Misal: 85" min="0" max="100" />
                                    </div>

                                    <div v-if="!categoryName.includes('smartphone')">
                                        <InputLabel for="spec_screen" value="Ukuran Layar (Inch)" />
                                        <TextInput v-model="form.specifications.screen_size" type="text" class="block w-full mt-1 h-11" placeholder="Misal: 14" />
                                    </div>

                                    <div v-if="categoryName.includes('laptop')">
                                        <InputLabel for="spec_processor" value="Processor" />
                                        <TextInput v-model="form.specifications.processor" type="text" class="block w-full mt-1 h-11" placeholder="Contoh: Intel Core i5 Gen 12" />
                                    </div>

                                    <div v-if="categoryName.includes('laptop')">
                                        <InputLabel for="spec_gpu" value="VGA / GPU" />
                                        <TextInput v-model="form.specifications.gpu" type="text" class="block w-full mt-1 h-11" placeholder="Contoh: NVIDIA RTX 3050" />
                                    </div>

                                    <div>
                                        <InputLabel for="spec_kelengkapan" value="Kelengkapan" />
                                        <select v-model="form.specifications.kelengkapan" id="spec_kelengkapan" class="block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 h-11">
                                            <option value="">-- Pilih Kelengkapan --</option>
                                            <option v-for="item in KELENGKAPAN_OPTIONS" :key="item.value" :value="item.value">{{ item.label }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- SECTION 4: MEDIA -->
                            <div class="p-6 sm:p-8 rounded-3xl border border-border bg-muted/30 shadow-sm">
                                <h3 class="text-lg font-bold mb-6 border-b border-border pb-3 flex items-center gap-2">
                                    <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">4</span>
                                    4. Media Foto
                                </h3>
                                
                                <div>
                                    <InputLabel value="Foto Produk Saat Ini" />
                                    <div v-if="product.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-2">
                                        <div v-for="image in product.images" :key="image.id" 
                                            class="relative group aspect-square rounded-2xl overflow-hidden border border-border shadow-sm transition-all"
                                            :class="{ 'opacity-40 grayscale scale-95 border-destructive': isExistingDeleted(image.id) }">
                                            <img :src="'/storage/' + image.image_path" class="h-full w-full object-cover transition-transform group-hover:scale-110">
                                            <button type="button" @click="toggleDeleteExisting(image.id)" 
                                                class="absolute top-2 right-2 p-2 rounded-full shadow-lg border transition-all z-10"
                                                :class="isExistingDeleted(image.id) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/90 text-foreground border-border hover:bg-destructive hover:text-white'">
                                                <X v-if="!isExistingDeleted(image.id)" class="w-4 h-4" />
                                                <span v-else class="text-[10px] font-bold">CANCEL</span>
                                            </button>
                                            <div v-if="isExistingDeleted(image.id)" class="absolute inset-0 bg-destructive/10 flex items-center justify-center pointer-events-none">
                                                <span class="bg-destructive text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm">AKAN DIHAPUS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p v-else class="text-sm text-muted-foreground mt-2 mb-8 italic">Belum ada foto yang di-upload.</p>
                                    
                                    <InputLabel for="images" value="Tambah Foto Baru (Opsional)" class="mt-10 pt-6 border-t border-border" />
                                    <div class="mt-2 flex items-center justify-center w-full">
                                        <label for="images" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-background hover:bg-muted/50 transition-all group">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImagePlus class="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                                                <p class="text-xs text-muted-foreground"><span class="font-bold text-primary">Klik untuk tambah foto baru</span></p>
                                            </div>
                                            <input id="images" type="file" @change="handleFiles" class="hidden" multiple accept="image/*" />
                                        </label>
                                    </div>

                                    <!-- New Preview Gallery -->
                                    <template v-if="imagePreviews.length > 0">
                                        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                                            <div v-for="(preview, index) in imagePreviews" :key="index" class="relative aspect-square rounded-xl overflow-hidden border border-border shadow-md bg-card group">
                                                <img :src="preview.url" class="w-full h-full object-cover">
                                                <button type="button" @click="removeNewFile(index)" 
                                                    class="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full hover:bg-destructive/80 shadow-lg z-10 transition-transform active:scale-95">
                                                    <X class="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </template>

                                    <InputError class="mt-2" :message="form.errors.images" />
                                </div>
                            </div>

                            <div class="flex items-center gap-6 pt-6 border-t border-border mt-10">
                                <PrimaryButton :disabled="form.processing" class="h-12 px-8">
                                    Simpan Perubahan
                                </PrimaryButton>
                                <Link :href="route('dashboard')" class="text-sm font-bold text-muted-foreground hover:text-foreground">Batal</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
