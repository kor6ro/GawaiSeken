<script setup>
import { ref, computed, onMounted } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import CurrencyInput from '@/Components/CurrencyInput.vue'
import { ImagePlus, X, Info, AlertCircle } from 'lucide-vue-next'
import {
  PRODUCT_BRANDS,
  PRODUCT_CONDITIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  KELENGKAPAN_OPTIONS,
} from '@/constants'

const props = defineProps({
  product: Object,
  categories: Array,
})
const formatCondition = (cond) => {
  if (!cond || cond.includes('Baru')) return 'Bekas Mulus'
  if (cond === 'Bekas - Mulus') return 'Bekas Mulus'
  if (cond === 'Bekas - Ada minus') return 'Bekas Ada minus'
  return cond
}

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
})

const categoryName = computed(() => props.product.category?.name.toLowerCase() || '')
const categoryId = computed(() => props.product.category_id)

const filteredBrands = computed(() => {
  return PRODUCT_BRANDS[categoryId.value] || PRODUCT_BRANDS['default']
})

const showField = (cats) => {
  const allowed = cats.split(',')
  return allowed.some((cat) => categoryName.value.includes(cat))
}

const imagePreviews = ref([])
const handleFiles = (event) => {
  const files = Array.from(event.target.files)
  files.forEach((file) => {
    form.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push({
        url: e.target.result,
        name: file.name,
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeNewFile = (index) => {
  form.images.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const toggleDeleteExisting = (imageId) => {
  const index = form.delete_images.indexOf(imageId)
  if (index > -1) {
    form.delete_images.splice(index, 1)
  } else {
    form.delete_images.push(imageId)
  }
}

const isExistingDeleted = (imageId) => form.delete_images.includes(imageId)

const submit = () => {
  form.post(route('products.update', props.product.slug), {
    forceFormData: true,
    preserveScroll: true,
  })
}
</script>

<template>
  <AppLayout>
    <Head title="Edit Produk" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Edit Produk</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="border border-border bg-card p-4 text-card-foreground shadow sm:rounded-2xl sm:p-8"
        >
          <div class="mx-auto max-w-2xl">
            <header class="mb-8">
              <h2 class="text-2xl font-bold">Edit Produk</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Perbarui informasi harga, kondisi, atau detail spesifikasi gawai Anda.
              </p>
            </header>

            <form @submit.prevent="submit" class="space-y-8">
              <!-- SECTION 1: IDENTITAS PRODUK -->
              <div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
                <h3
                  class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                    >1</span
                  >
                  1. Identitas Produk
                </h3>

                <div class="space-y-6">
                  <div>
                    <InputLabel value="Kategori" />
                    <TextInput
                      :value="product.category.name"
                      class="mt-1 block w-full cursor-not-allowed bg-muted/50"
                      disabled
                    />
                    <p
                      class="mt-1 flex items-center gap-1 text-[10px] italic text-muted-foreground"
                    >
                      <Info class="h-3 w-3" />
                      Kategori tidak dapat diubah untuk menjaga konsistensi spesifikasi.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <InputLabel for="brand" value="Merek / Brand" />
                      <select
                        id="brand"
                        v-model="form.brand"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">-- Pilih Merek --</option>
                        <option v-for="brand in filteredBrands" :key="brand" :value="brand">
                          {{ brand }}
                        </option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      <InputError class="mt-2" :message="form.errors.brand" />
                    </div>

                    <div>
                      <InputLabel for="type" value="Tipe / Model" />
                      <TextInput
                        id="type"
                        v-model="form.type"
                        type="text"
                        class="mt-1 block h-11 w-full"
                        required
                        placeholder="Misal: iPhone 13"
                      />
                      <InputError class="mt-2" :message="form.errors.type" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- SECTION 2: INFORMASI PENJUALAN -->
              <div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
                <h3
                  class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                    >2</span
                  >
                  2. Informasi Penjualan
                </h3>

                <div class="space-y-6">
                  <div>
                    <InputLabel for="price" value="Harga Produk (Rp)" />
                    <CurrencyInput
                      id="price"
                      v-model="form.price"
                      :required="true"
                      placeholder="0"
                    />
                    <InputError class="mt-2" :message="form.errors.price" />
                  </div>

                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="col-span-1 md:col-span-2">
                      <InputLabel for="condition" value="Kondisi Barang" />
                      <select
                        id="condition"
                        v-model="form.condition"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                        required
                      >
                        <option
                          v-for="item in PRODUCT_CONDITIONS"
                          :key="item.value"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </option>
                      </select>
                      <InputError class="mt-2" :message="form.errors.condition" />
                    </div>

                    <div
                      class="mt-2 flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4"
                    >
                      <div class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_cod"
                          v-model="form.is_cod"
                          class="rounded border-border text-primary focus:ring-primary"
                        />
                        <InputLabel for="is_cod" value="Fitur COD" class="!mb-0 cursor-pointer" />
                      </div>
                      <div class="mx-2 h-6 w-px bg-border"></div>
                      <div class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_negotiable"
                          v-model="form.is_negotiable"
                          class="rounded border-border text-primary focus:ring-primary"
                        />
                        <InputLabel
                          for="is_negotiable"
                          value="Bisa Nego"
                          class="!mb-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div class="col-span-1 md:col-span-2">
                      <InputLabel for="status" value="Status Ketersediaan" />
                      <select
                        id="status"
                        v-model="form.status"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                      >
                        <option value="available">Tersedia (Available)</option>
                        <option value="sold">Terjual (Sold)</option>
                      </select>
                      <InputError class="mt-2" :message="form.errors.status" />
                    </div>
                  </div>

                  <div>
                    <InputLabel for="description" value="Deskripsi Produk" />
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="5"
                      class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                      required
                      :placeholder="
                        form.condition === 'Bekas Ada minus' || form.condition === 'Minus'
                          ? 'WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)...'
                          : 'Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...'
                      "
                    ></textarea>
                    <InputError class="mt-2" :message="form.errors.description" />
                  </div>
                </div>
              </div>

              <!-- SECTION 3: SPESIFIKASI TAMBAHAN -->
              <div class="rounded-3xl border border-border bg-primary/5 p-6 shadow-sm sm:p-8">
                <h3
                  class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                    >3</span
                  >
                  3. Spesifikasi {{ product.category.name }}
                </h3>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div v-if="showField('smartphone,laptop,tablet')">
                    <InputLabel for="spec_ram" value="RAM" />
                    <select
                      v-model="form.specifications.ram"
                      id="spec_ram"
                      class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="">Pilih RAM</option>
                      <option v-for="ram in RAM_OPTIONS" :key="ram" :value="ram">{{ ram }}</option>
                    </select>
                  </div>

                  <div v-if="showField('smartphone,laptop,tablet')">
                    <InputLabel for="spec_storage" value="Penyimpanan (ROM/SSD)" />
                    <select
                      v-model="form.specifications.storage"
                      id="spec_storage"
                      class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="">Pilih Kapasitas</option>
                      <option v-for="rom in STORAGE_OPTIONS" :key="rom" :value="rom">
                        {{ rom }}
                      </option>
                    </select>
                  </div>

                  <div v-if="showField('smartphone,tablet')">
                    <InputLabel for="spec_bh" value="Battery Health (BH) %" />
                    <TextInput
                      v-model="form.specifications.battery_health"
                      type="number"
                      class="mt-1 block h-11 w-full"
                      placeholder="Misal: 85"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div v-if="!categoryName.includes('smartphone')">
                    <InputLabel for="spec_screen" value="Ukuran Layar (Inch)" />
                    <TextInput
                      v-model="form.specifications.screen_size"
                      type="text"
                      class="mt-1 block h-11 w-full"
                      placeholder="Misal: 14"
                    />
                  </div>

                  <div v-if="categoryName.includes('laptop')">
                    <InputLabel for="spec_processor" value="Processor" />
                    <TextInput
                      v-model="form.specifications.processor"
                      type="text"
                      class="mt-1 block h-11 w-full"
                      placeholder="Contoh: Intel Core i5 Gen 12"
                    />
                  </div>

                  <div v-if="categoryName.includes('laptop')">
                    <InputLabel for="spec_gpu" value="VGA / GPU" />
                    <TextInput
                      v-model="form.specifications.gpu"
                      type="text"
                      class="mt-1 block h-11 w-full"
                      placeholder="Contoh: NVIDIA RTX 3050"
                    />
                  </div>

                  <div>
                    <InputLabel for="spec_kelengkapan" value="Kelengkapan" />
                    <select
                      v-model="form.specifications.kelengkapan"
                      id="spec_kelengkapan"
                      class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="">-- Pilih Kelengkapan --</option>
                      <option
                        v-for="item in KELENGKAPAN_OPTIONS"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- SECTION 4: MEDIA -->
              <div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
                <h3
                  class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                    >4</span
                  >
                  4. Media Foto
                </h3>

                <div>
                  <InputLabel value="Foto Produk Saat Ini" />
                  <div
                    v-if="product.images.length > 0"
                    class="mb-8 mt-2 grid grid-cols-2 gap-4 md:grid-cols-4"
                  >
                    <div
                      v-for="image in product.images"
                      :key="image.id"
                      class="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-sm transition-all"
                      :class="{
                        'scale-95 border-destructive opacity-40 grayscale': isExistingDeleted(
                          image.id
                        ),
                      }"
                    >
                      <img
                        :src="'/storage/' + image.image_path"
                        loading="lazy"
                        class="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <button
                        type="button"
                        @click="toggleDeleteExisting(image.id)"
                        class="absolute right-2 top-2 z-10 rounded-full border p-2 shadow-lg transition-all"
                        :class="
                          isExistingDeleted(image.id)
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background/90 text-foreground hover:bg-destructive hover:text-white'
                        "
                      >
                        <X v-if="!isExistingDeleted(image.id)" class="h-4 w-4" />
                        <span v-else class="text-[10px] font-bold">CANCEL</span>
                      </button>
                      <div
                        v-if="isExistingDeleted(image.id)"
                        class="pointer-events-none absolute inset-0 flex items-center justify-center bg-destructive/10"
                      >
                        <span
                          class="rounded bg-destructive px-2 py-1 text-[10px] font-bold text-white shadow-sm"
                          >AKAN DIHAPUS</span
                        >
                      </div>
                    </div>
                  </div>
                  <p v-else class="mb-8 mt-2 text-sm italic text-muted-foreground">
                    Belum ada foto yang di-upload.
                  </p>

                  <InputLabel
                    for="images"
                    value="Tambah Foto Baru (Opsional)"
                    class="mt-10 border-t border-border pt-6"
                  />
                  <div class="mt-2 flex w-full items-center justify-center">
                    <label
                      for="images"
                      class="group flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-all hover:bg-muted/50"
                    >
                      <div class="flex flex-col items-center justify-center pb-6 pt-5">
                        <ImagePlus
                          class="mb-2 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary"
                        />
                        <p class="text-xs text-muted-foreground">
                          <span class="font-bold text-primary">Klik untuk tambah foto baru</span>
                        </p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        @change="handleFiles"
                        class="hidden"
                        multiple
                        accept="image/*"
                      />
                    </label>
                  </div>

                  <!-- New Preview Gallery -->
                  <template v-if="imagePreviews.length > 0">
                    <div
                      class="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:grid-cols-4 md:grid-cols-6"
                    >
                      <div
                        v-for="(preview, index) in imagePreviews"
                        :key="index"
                        class="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-md"
                      >
                        <img :src="preview.url" loading="lazy" class="h-full w-full object-cover" />
                        <button
                          type="button"
                          @click="removeNewFile(index)"
                          class="absolute right-2 top-2 z-10 rounded-full bg-destructive p-1.5 text-white shadow-lg transition-transform hover:bg-destructive/80 active:scale-95"
                        >
                          <X class="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </template>

                  <InputError class="mt-2" :message="form.errors.images" />
                </div>
              </div>

              <div class="mt-10 flex items-center gap-6 border-t border-border pt-6">
                <PrimaryButton :disabled="form.processing" class="h-12 px-8">
                  Simpan Perubahan
                </PrimaryButton>
                <Link
                  :href="route('dashboard')"
                  class="text-sm font-bold text-muted-foreground hover:text-foreground"
                  >Batal</Link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
