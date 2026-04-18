<script setup>
import { ref } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { LayoutDashboard, Settings, Package, ShoppingBag, MessageCircle, Plus, Edit3, Trash2, Image, MapPin } from 'lucide-vue-next';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import Modal from '@/Components/Modal.vue';
import Pagination from '@/Components/Pagination.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    user: Object,
    productsCount: Number,
    transactionsCount: Number,
    unreadMessagesCount: Number,
    myProducts: Object,
});

const tab = ref('overview');
const confirmProductDeletion = ref(false);
const productToDelete = ref(null);

const deleteForm = useForm({});

const deleteProduct = () => {
    deleteForm.delete(route('products.destroy', productToDelete.value.slug), {
        onSuccess: () => closeModal(),
    });
};

const confirmDeletion = (product) => {
    productToDelete.value = product;
    confirmProductDeletion.value = true;
};

const closeModal = () => {
    confirmProductDeletion.value = false;
    productToDelete.value = null;
};

// Store Settings Form
const storeForm = useForm({
    store_name: props.user.profile?.store_name || props.user.name,
    bio: props.user.profile?.bio || '',
    address: props.user.profile?.address || '',
    city: props.user.profile?.city || '',
    avatar: null,
});

const photoPreview = ref(null);
const photoInput = ref(null);

const cropModalOpen = ref(false);
const imageToCrop = ref(null);
const cropper = ref(null);

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];
    if (!photo) return;

    photoInput.value.value = '';

    const reader = new FileReader();
    reader.onload = (e) => {
        imageToCrop.value = e.target.result;
        cropModalOpen.value = true;
    };
    reader.readAsDataURL(photo);
};

const cancelCrop = () => {
    cropModalOpen.value = false;
    imageToCrop.value = null;
};

const applyCrop = () => {
    if (!cropper.value) return;
    const { canvas } = cropper.value.getResult();
    if (canvas) {
        photoPreview.value = canvas.toDataURL();

        canvas.toBlob((blob) => {
            const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
            storeForm.avatar = file;
            cropModalOpen.value = false;
            imageToCrop.value = null;
        }, 'image/jpeg', 0.9);
    }
};

const updateStoreSettings = () => {
    storeForm.transform((data) => ({
        ...data,
        _method: 'PATCH',
    })).post(route('store.update'), {
        forceFormData: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Seller Dashboard" />

        <template #header>
            <h2 class="font-semibold text-xl text-foreground leading-tight">
                Seller Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <!-- TAB NAVIGATION BUTTONS -->
                <div class="flex space-x-1 bg-muted p-1 rounded-xl max-w-md mx-auto sm:mx-0">
                    <button @click="tab = 'overview'" :class="tab === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                        class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2">
                        <LayoutDashboard class="w-4 h-4" />
                        Ringkasan
                    </button>
                    <button @click="tab = 'settings'" :class="tab === 'settings' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                        class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2">
                        <Settings class="w-4 h-4" />
                        Pengaturan
                    </button>
                </div>

                <!-- TAB 1: OVERVIEW -->
                <div v-show="tab === 'overview'" class="transition-all duration-300">
                    <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg mb-6">
                        <header class="mb-6">
                            <h2 class="text-lg font-medium">Statistik Toko</h2>
                            <p class="mt-1 text-sm text-muted-foreground">Ringkasan performa penjualan Anda saat ini.</p>
                        </header>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Produk Aktif</p>
                                    <Package class="w-5 h-5 text-primary" />
                                </div>
                                <p class="text-2xl sm:text-3xl font-black text-primary mt-2">{{ productsCount }}</p>
                            </div>
                            <div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Terjual</p>
                                    <ShoppingBag class="w-5 h-5 text-green-500" />
                                </div>
                                <p class="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400 mt-2">{{ transactionsCount }}</p>
                            </div>
                            <div class="bg-muted p-4 sm:p-6 rounded-2xl border border-border transition-colors">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Pesan Baru</p>
                                    <MessageCircle class="w-5 h-5 text-orange-500" />
                                </div>
                                <p class="text-2xl sm:text-3xl font-black text-orange-500 mt-2">{{ unreadMessagesCount }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-lg font-bold">Produk Saya</h3>
                                <p class="text-sm text-muted-foreground">Kelola barang dagangan Anda.</p>
                            </div>
                            <Link :href="route('products.create')" class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-bold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-md">
                                <Plus class="w-4 h-4 mr-2" />
                                <span>Tambah Produk</span>
                            </Link>
                        </div>

                        <div class="overflow-hidden shadow-sm sm:rounded-lg border border-border">
                            <!-- Desktop Table -->
                            <div class="hidden md:block overflow-x-auto">
                                <table class="w-full text-sm text-left">
                                    <thead class="text-xs text-muted-foreground uppercase bg-muted border-b border-border">
                                        <tr>
                                            <th scope="col" class="px-6 py-4 font-semibold">Produk</th>
                                            <th scope="col" class="px-6 py-4 font-semibold">Harga</th>
                                            <th scope="col" class="px-6 py-4 font-semibold text-center">Status</th>
                                            <th scope="col" class="px-6 py-4 font-semibold text-center">Tanggal</th>
                                            <th scope="col" class="px-6 py-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-border">
                                        <tr v-for="item in myProducts.data" :key="item.id" class="bg-card hover:bg-muted transition-colors">
                                            <td class="px-6 py-4 align-middle">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-12 h-12 rounded-md bg-muted border border-border overflow-hidden flex-shrink-0">
                                                        <img v-if="item.images && item.images.length > 0" :src="`/storage/${item.images[0].image_path}`" class="w-full h-full object-cover">
                                                        <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground">
                                                            <Image class="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="text-base font-bold line-clamp-1">{{ item.title }}</div>
                                                        <div class="text-xs text-muted-foreground">{{ item.category?.name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 align-middle font-medium whitespace-nowrap">
                                                Rp {{ new Intl.NumberFormat('id-ID').format(item.price) }}
                                            </td>
                                            <td class="px-6 py-4 align-middle text-center">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border"
                                                    :class="item.status === 'available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'">
                                                    {{ item.status }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 align-middle text-center text-xs whitespace-nowrap text-muted-foreground">
                                                {{ new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                                            </td>
                                            <td class="px-6 py-4 align-middle text-right">
                                                <div class="flex items-center justify-end gap-2">
                                                    <Link :href="route('products.edit', item.slug)" class="inline-flex items-center px-4 py-2 bg-background border border-border rounded-md font-semibold text-xs text-foreground uppercase tracking-widest shadow-sm hover:bg-muted transition">
                                                        Edit
                                                    </Link>
                                                    <DangerButton @click="confirmDeletion(item)">Hapus</DangerButton>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-if="myProducts.data.length === 0">
                                            <td colspan="5" class="px-6 py-12 text-center text-muted-foreground">
                                                <div class="flex flex-col items-center">
                                                    <span class="mb-2">Belum ada produk yang dijual.</span>
                                                    <Link :href="route('products.create')" class="text-primary font-bold">+ Tambah Produk Baru</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Mobile Cards -->
                            <div class="md:hidden divide-y divide-border">
                                <div v-for="item in myProducts.data" :key="item.id" class="p-4 flex flex-col gap-4">
                                     <div class="flex items-center gap-4">
                                        <div class="w-16 h-16 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
                                            <img v-if="item.images && item.images.length > 0" :src="`/storage/${item.images[0].image_path}`" class="w-full h-full object-cover">
                                            <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground">
                                                <Image class="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-base font-bold truncate">{{ item.title }}</div>
                                            <div class="text-xs text-muted-foreground">{{ item.category?.name }}</div>
                                            <div class="mt-1 text-primary font-bold">Rp {{ new Intl.NumberFormat('id-ID').format(item.price) }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between gap-4 pt-2 border-t border-border">
                                        <div class="flex flex-col gap-1">
                                            <span class="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                                :class="item.status === 'available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'">
                                                {{ item.status }}
                                            </span>
                                            <span class="text-[10px] text-muted-foreground">{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <Link :href="route('products.edit', item.slug)" class="p-2 text-muted-foreground hover:bg-accent rounded-lg transition">
                                                <Edit3 class="w-5 h-5" />
                                            </Link>
                                            <button @click="confirmDeletion(item)" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition">
                                                <Trash2 class="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination :links="myProducts.links" v-if="myProducts.data.length > 0" />
                    </div>
                </div>

                <!-- TAB 2: SETTINGS -->
                <div v-show="tab === 'settings'" class="transition-all duration-300">
                    <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg">
                        <div class="max-w-xl">
                            <header>
                                <h2 class="text-lg font-medium">Profil Toko</h2>
                                <p class="mt-1 text-sm text-muted-foreground">Informasi ini akan ditampilkan di halaman publik toko Anda.</p>
                            </header>

                            <form @submit.prevent="updateStoreSettings" class="mt-6 space-y-6">
                                <!-- Avatar Upload -->
                                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-border">
                                    <div class="relative group shrink-0">
                                        <div class="relative h-28 w-28 rounded-full overflow-hidden border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border group-hover:ring-primary transition-all duration-300">
                                            <img v-if="photoPreview" :src="photoPreview" class="h-full w-full object-cover">
                                            <img v-else-if="user.profile?.avatar" :src="`/storage/${user.profile.avatar}`" class="h-full w-full object-cover">
                                            <div v-else class="h-full w-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary">
                                                {{ (user.profile?.store_name || user.name).substring(0, 1) }}
                                            </div>
                                            <!-- Overlay -->
                                            <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm" @click="photoInput.click()">
                                                <Image class="w-6 h-6 text-white mb-1" />
                                                <span class="text-white text-[10px] font-bold uppercase tracking-wider">Ubah</span>
                                            </div>
                                        </div>
                                        <input type="file" ref="photoInput" class="hidden" accept="image/*" @change="updatePhotoPreview">
                                        <div class="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-sm">
                                            <button type="button" @click.prevent="photoInput.click()" class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-sm transition-colors">
                                                <Edit3 class="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex-1 text-center sm:text-left pt-2">
                                        <h3 class="text-lg font-black text-foreground">Foto Profil Toko</h3>
                                        <p class="text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar yang diunggah akan dapat dicrop secara langsung.</p>
                                        <SecondaryButton @click.prevent="photoInput.click()" class="shadow-sm border-2">Unggah Gambar</SecondaryButton>
                                        <InputError :message="storeForm.errors.avatar" class="mt-2" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Store Name -->
                                    <div class="md:col-span-2">
                                        <InputLabel for="store_name" value="Nama Toko / Penjual" class="font-bold mb-1" />
                                        <TextInput id="store_name" v-model="storeForm.store_name" type="text" class="block w-full text-sm font-medium h-12 rounded-xl" placeholder="Ketik nama toko Anda..." required />
                                        <InputError :message="storeForm.errors.store_name" class="mt-1" />
                                    </div>

                                    <!-- Bio -->
                                    <div class="md:col-span-2">
                                        <InputLabel for="bio" value="Bio / Deskripsi Singkat Toko" class="font-bold mb-1" />
                                        <textarea id="bio" v-model="storeForm.bio" rows="4" class="block w-full border-border bg-background text-foreground focus:border-primary focus:ring-primary rounded-xl shadow-sm placeholder:text-muted-foreground/60 resize-none" placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..."></textarea>
                                        <InputError :message="storeForm.errors.bio" class="mt-1" />
                                    </div>

                                    <!-- City -->
                                    <div class="md:col-span-1">
                                        <InputLabel for="city" value="Kota / Kabupaten" class="font-bold mb-1" />
                                        <div class="relative">
                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin class="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <TextInput id="city" v-model="storeForm.city" type="text" class="block w-full pl-9 text-sm h-12 rounded-xl" placeholder="Misal: Jakarta Selatan" />
                                        </div>
                                        <InputError :message="storeForm.errors.city" class="mt-1" />
                                    </div>

                                    <!-- Address -->
                                    <div class="md:col-span-1">
                                        <InputLabel for="address" value="Alamat Lengkap (Opsional)" class="font-bold mb-1" />
                                        <TextInput id="address" v-model="storeForm.address" type="text" class="block w-full text-sm h-12 rounded-xl" placeholder="Jalan, No Rumah, RT/RW..." />
                                        <InputError :message="storeForm.errors.address" class="mt-1" />
                                    </div>
                                </div>

                                <div class="flex items-center gap-4 pt-6 border-t border-border mt-8">
                                    <PrimaryButton :disabled="storeForm.processing" class="h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20 text-sm">
                                        <span v-if="storeForm.processing" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                        Simpan Perubahan
                                    </PrimaryButton>
                                    <Transition enter-from-class="opacity-0 -translate-y-2" leave-to-class="opacity-0 translate-y-2" class="transition ease-out duration-300">
                                        <div v-if="storeForm.recentlySuccessful" class="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg border border-green-500/20">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                            <p class="text-sm font-bold">Profil Berhasil Diperbarui!</p>
                                        </div>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Cropper Modal -->
                <Modal :show="cropModalOpen" @close="cancelCrop" maxWidth="xl">
                    <div class="p-6 bg-card text-card-foreground">
                        <header class="mb-4">
                            <h2 class="text-xl font-black">Sesuaikan Foto Profil</h2>
                            <p class="text-sm text-muted-foreground mt-1">Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas. Lingkaran adalah pratinjau hasil akhirnya.</p>
                        </header>
                        
                        <div class="relative w-full aspect-square bg-black rounded-2xl overflow-hidden border-2 border-border mb-6 ring-1 ring-border shadow-inner flex items-center justify-center">
                            <Cropper
                                ref="cropper"
                                class="w-full h-full object-contain"
                                :src="imageToCrop"
                                :stencil-props="{
                                    aspectRatio: 1,
                                    movable: false,
                                    resizable: false
                                }"
                                :resize-image="{
                                    adjustStencil: false
                                }"
                                :move-image="{
                                    adjustStencil: false
                                }"
                                image-restriction="stencil"
                            />
                        </div>

                        <div class="flex items-center justify-end gap-3 mt-6">
                            <SecondaryButton @click="cancelCrop" class="h-11 px-6 rounded-xl hover:bg-muted font-bold">Batal</SecondaryButton>
                            <PrimaryButton @click="applyCrop" class="h-11 px-8 rounded-xl shadow-lg font-bold">Terapkan</PrimaryButton>
                        </div>
                    </div>
                </Modal>

                <!-- Deletion Confirm Modal -->
                 <Modal :show="confirmProductDeletion" @close="closeModal">
                    <div class="p-6">
                        <div class="flex flex-col items-center text-center justify-center">
                            <div class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                                <Trash2 class="h-6 w-6 text-red-600 dark:text-red-200" />
                            </div>
                            <h2 class="text-lg font-medium">Konfirmasi Hapus</h2>
                            <p class="mt-2 text-sm text-muted-foreground">Apakah Anda yakin ingin menghapus produk <strong>{{ productToDelete?.title }}</strong>? <br> Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                        <div class="mt-6 flex justify-center gap-3">
                            <SecondaryButton @click="closeModal">Batal</SecondaryButton>
                            <DangerButton @click="deleteProduct" :class="{ 'opacity-25': deleteForm.processing }" :disabled="deleteForm.processing"> Ya, Hapus </DangerButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </AppLayout>
</template>
