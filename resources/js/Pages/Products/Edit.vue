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
import ImageCropperModal from '@/Components/ImageCropperModal.vue'
import {
  PRODUCT_SCHEMA,
  PRODUCT_CONDITIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  CONNECTIVITY_OPTIONS,
  POWER_SOURCE_OPTIONS,
  SWITCH_TYPE_OPTIONS,
  CFW_STATUS_OPTIONS,
  getCategoryById,
  getFieldsByCategory,
} from '@/constants'

const props = defineProps({
  product: Object,
  categories: Array,
})
const formatCondition = (cond) => {
  if (!cond) return 'second_like_new'
  const mapping = {
    'Bekas Mulus': 'second_like_new',
    'Bekas - Mulus': 'second_like_new',
    'Bekas Ada minus': 'second_good',
    'Bekas - Ada minus': 'second_good',
    Minus: 'minus',
  }
  return mapping[cond] || cond
}

const selectedCategory = computed(() => getCategoryById(props.product.category_id))
const isBrandInList = computed(() => selectedCategory.value?.brands.includes(props.product.brand))
const isRamInList = computed(() => RAM_OPTIONS.includes(props.product.specifications?.ram))
const isStorageInList = computed(() => STORAGE_OPTIONS.includes(props.product.specifications?.storage))

const form = useForm({
  _method: 'put',
  brand: isBrandInList.value ? props.product.brand : 'Other',
  custom_brand: isBrandInList.value ? '' : props.product.brand,
  type: props.product.type,
  condition: formatCondition(props.product.condition),
  is_cod: props.product.is_cod,
  is_negotiable: props.product.is_negotiable,
  price: props.product.price,
  status: props.product.status,
  description: props.product.description,
  specifications: {
    sub_type: props.product.specifications?.sub_type || '',
    ram: isRamInList.value ? (props.product.specifications?.ram || '') : 'Other',
    custom_ram: isRamInList.value ? '' : props.product.specifications?.ram,
    storage: isStorageInList.value ? (props.product.specifications?.storage || '') : 'Other',
    custom_storage: isStorageInList.value ? '' : props.product.specifications?.storage,
    battery_health: props.product.specifications?.battery_health || '',
    screen_size: props.product.specifications?.screen_size || '',
    connectivity: props.product.specifications?.connectivity || '',
    power_source: props.product.specifications?.power_source || '',
    switch_type: props.product.specifications?.switch_type || '',
    cfw_status: props.product.specifications?.cfw_status || '',
    shutter_count: props.product.specifications?.shutter_count || '',
    is_battery_balanced: props.product.specifications?.is_battery_balanced || false,
    is_drift_free: props.product.specifications?.is_drift_free || false,
    has_original_lens: props.product.specifications?.has_original_lens || false,
    kelengkapan: Array.isArray(props.product.specifications?.kelengkapan) 
      ? props.product.specifications.kelengkapan 
      : (props.product.specifications?.kelengkapan ? [props.product.specifications.kelengkapan] : []),
    kelengkapan_note: props.product.specifications?.kelengkapan_note || '',
  },
  images: [],
  delete_images: [],
})

const currentCategory = computed(() => getCategoryById(props.product.category_id))
const selectedCategoryName = computed(() => currentCategory.value?.label.toLowerCase() || '')

const formSections = computed(() => {
  return getFieldsByCategory(props.product.category_id, form)
})

const filteredBrands = computed(() => currentCategory.value?.brands || [])

const imagePreviews = ref([])

// Sequential Cropping Logic
const showCropper = ref(false)
const pendingFiles = ref([])

const handleFiles = (event) => {
  const files = Array.from(event.target.files)
  const maxFiles = 10
  const currentTotal = form.images.length
  const remaining = maxFiles - currentTotal

  if (remaining <= 0) {
    alert(`Maksimal ${maxFiles} foto diperbolehkan.`)
    return
  }

  const filesToAdd = files.slice(0, remaining)
  if (filesToAdd.length > 0) {
    pendingFiles.value = filesToAdd
    showCropper.value = true
  }
}

const handleCropped = ({ blob, originalFile }) => {
  const fileName = originalFile.name.replace(/\.[^/.]+$/, '') + '.jpg'
  const file = new File([blob], fileName, { type: 'image/jpeg' })

  form.images.push(file)

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreviews.value.push({
      url: e.target.result,
      name: fileName,
    })
  }
  reader.readAsDataURL(file)
}

const handleCropperFinished = () => {
  showCropper.value = false
  pendingFiles.value = []
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

const openGsmSearch = () => {
  if (!form.brand || !form.type) {
    alert('Pilih Merek dan isi Tipe terlebih dahulu.')
    return
  }
  const query = encodeURIComponent(form.brand + ' ' + form.type)
  if (
    selectedCategoryName.value.includes('smartphone') ||
    selectedCategoryName.value.includes('tablet')
  ) {
    window.open(`https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`, '_blank')
  } else if (selectedCategoryName.value.includes('camera')) {
    window.open(`https://www.google.com/search?q=${query}+specs+dpreview`, '_blank')
  } else {
    const suffix = selectedCategoryName.value.includes('laptop') ? ' specs laptopmedia' : ' specs'
    window.open(`https://www.google.com/search?q=${query}${suffix}`, '_blank')
  }
}

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
                      </select>
                      <InputError class="mt-2" :message="form.errors.brand" />

                      <div v-if="form.brand === 'Other'" class="mt-3">
                        <TextInput
                          v-model="form.custom_brand"
                          type="text"
                          class="block h-11 w-full"
                          placeholder="Sebutkan Merek Lainnya"
                          required
                        />
                        <InputError class="mt-2" :message="form.errors.custom_brand" />
                      </div>
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
                        form.condition === 'second_good' || form.condition === 'minus'
                          ? 'WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)...'
                          : 'Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...'
                      "
                    ></textarea>
                    <InputError class="mt-2" :message="form.errors.description" />
                  </div>
                </div>
              </div>

              <!-- DYNAMIC SECTIONS & FIELDS -->
              <div v-for="(section, sIndex) in formSections" :key="section.id"
                class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"
              >
                <h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    {{ sIndex + 1 }}
                  </span>
                  {{ section.label }}
                </h3>

                <!-- Sub-Type Selection (If exists) -->
                <div v-if="section.id === 'main' && currentCategory?.sub_types" class="mb-6">
                  <InputLabel value="Tipe Spesifik" />
                  <div class="mt-2 flex flex-wrap gap-2">
                    <button
                      v-for="st in currentCategory.sub_types"
                      :key="st.value"
                      type="button"
                      @click="form.specifications.sub_type = st.value"
                      class="rounded-xl border px-4 py-2 text-sm font-medium transition-all"
                      :class="form.specifications.sub_type === st.value 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-background text-muted-foreground border-border hover:bg-muted'"
                    >
                      {{ st.label }}
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <template v-for="field in section.fields" :key="field.key">
                    <!-- Brand Select -->
                    <div v-if="field.key === 'brand'">
                      <InputLabel :for="field.key" :value="field.label" />
                      <select
                        v-model="form.brand"
                        :id="field.key"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">{{ field.placeholder }}</option>
                        <option v-for="brand in currentCategory.brands" :key="brand" :value="brand">
                          {{ brand }}
                        </option>
                      </select>
                      <InputError class="mt-2" :message="form.errors.brand" />
                      <div v-if="form.brand === 'Other'" class="mt-2">
                        <TextInput v-model="form.custom_brand" placeholder="Sebutkan Merek" class="h-10" />
                        <InputError class="mt-2" :message="form.errors.custom_brand" />
                      </div>
                    </div>

                    <!-- Type Text -->
                    <div v-else-if="field.key === 'type'">
                      <InputLabel :for="field.key" :value="field.label" />
                      <div class="relative">
                        <TextInput
                          v-model="form.type"
                          :id="field.key"
                          type="text"
                          class="mt-1 block h-11 w-full pr-12"
                          :placeholder="field.placeholder"
                          required
                        />
                        <button
                          type="button"
                          @click="openGsmSearch"
                          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-primary hover:bg-primary/10"
                          title="Cari Spek di GSM Arena/Google"
                        >
                          <ExternalLink class="h-4 w-4" />
                        </button>
                      </div>
                      <InputError class="mt-2" :message="form.errors.type" />
                    </div>

                    <!-- Generic Select -->
                    <div v-else-if="field.type === 'select'">
                      <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
                      <select
                        v-model="form.specifications[field.key]"
                        :id="field.key"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="">{{ field.placeholder || 'Pilih...' }}</option>
                        <option v-for="opt in field.options" :key="opt" :value="opt">
                          {{ opt }}
                        </option>
                      </select>
                      <InputError class="mt-2" :message="form.errors['specifications.' + field.key]" />
                      <div v-if="form.specifications[field.key] === 'Other' && ['ram', 'storage'].includes(field.key)" class="mt-2">
                        <TextInput v-model="form.specifications['custom_' + field.key]" placeholder="Input Manual..." class="h-10" />
                        <InputError class="mt-2" :message="form.errors['specifications.custom_' + field.key]" />
                      </div>
                    </div>

                    <!-- Generic Number/Text -->
                    <div v-else-if="['number', 'text'].includes(field.type)">
                      <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
                      <TextInput
                        v-model="form.specifications[field.key]"
                        :id="field.key"
                        :type="field.type"
                        class="mt-1 block h-11 w-full"
                        :placeholder="field.placeholder"
                      />
                      <InputError class="mt-2" :message="form.errors['specifications.' + field.key]" />
                    </div>

                    <!-- Boolean / Checkbox -->
                    <div v-else-if="field.type === 'boolean'" class="flex items-center gap-3 pt-8">
                      <input
                        type="checkbox"
                        v-model="form.specifications[field.key]"
                        :id="field.key"
                        class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                      />
                      <label :for="field.key" class="text-sm font-medium leading-none cursor-pointer">
                        {{ field.label }}
                        <span v-if="field.placeholder" class="block text-[10px] font-normal text-muted-foreground">{{ field.placeholder }}</span>
                      </label>
                      <InputError class="mt-2" :message="form.errors['specifications.' + field.key]" />
                    </div>
                  </template>
                </div>
              </div>

              <!-- SECTION: KELENGKAPAN (SMART CHECKBOX) -->
              <div v-if="currentCategory"
                class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"
              >
                <h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold">
                   <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    {{ formSections.length + 1 }}
                  </span>
                  Kelengkapan Produk
                </h3>
                <p class="mb-6 text-xs text-muted-foreground">Centang semua item yang tersedia dalam paket penjualan.</p>
                
                <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div v-for="item in currentCategory.default_items" :key="item"
                    class="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary/50"
                    :class="{'border-primary bg-primary/5': form.specifications.kelengkapan.includes(item)}"
                  >
                    <input
                      type="checkbox"
                      :id="item"
                      :value="item"
                      v-model="form.specifications.kelengkapan"
                      class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <label :for="item" class="flex-1 cursor-pointer text-sm font-bold">{{ item }}</label>
                  </div>
                </div>
                <div class="mt-4">
                   <InputLabel value="Keterangan Lain (Opsional)" />
                   <TextInput v-model="form.specifications.kelengkapan_note" placeholder="Misal: Dus ada penyok dikit" class="mt-1" />
                   <InputError class="mt-2" :message="form.errors['specifications.kelengkapan_note']" />
                </div>
                <InputError class="mt-4" :message="form.errors['specifications.kelengkapan']" />
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

    <!-- Cropper Modal -->
    <ImageCropperModal
      :show="showCropper"
      :files="pendingFiles"
      @close="handleCropperFinished"
      @cropped="handleCropped"
      @finished="handleCropperFinished"
    />
  </AppLayout>
</template>
