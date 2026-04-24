<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import CurrencyInput from '@/Components/CurrencyInput.vue'
import { 
  ExternalLink, ImagePlus, X, ChevronRight, ChevronLeft, Check, 
  Tag, Wrench, Package, Camera, CircleDollarSign, Info 
} from 'lucide-vue-next'
import ImageCropperModal from '@/Components/ImageCropperModal.vue'
import {
  PRODUCT_CONDITIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  getCategoryById,
  getFieldsByCategory,
} from '@/constants'

const props = defineProps({
  product: Object,
  categories: Array,
})

// Helper to map DB condition strings to form values if they differ
const formatCondition = (cond) => {
  if (!cond) return 'second_like_new'
  const mapping = {
    'Bekas Mulus': 'second_like_new',
    'Bekas - Mulus': 'second_like_new',
    'Bekas Ada minus': 'second_good',
    'Bekas - Ada minus': 'second_good',
    'Minus': 'minus',
    'Baru': 'new',
  }
  // If cond is an object (enum), get its value
  const condValue = typeof cond === 'object' ? cond.value : cond
  return mapping[condValue] || condValue
}

const getInitialKelengkapan = () => {
  const k = props.product.specifications?.kelengkapan
  if (Array.isArray(k)) return k
  if (typeof k === 'string') {
    return k.split(',').map(s => s.trim()).filter(Boolean)
  }
  return []
}

const initialRam = props.product.specifications?.ram || ''
const initialStorage = props.product.specifications?.storage || ''
const isRamInList = RAM_OPTIONS.includes(initialRam)
const isStorageInList = STORAGE_OPTIONS.includes(initialStorage)

const form = useForm({
  _method: 'put',
  category_id: props.product.category_id,
  brand: props.product.brand || '',
  custom_brand: '', 
  type: props.product.type || '',
  condition: formatCondition(props.product.condition),
  is_cod: props.product.is_cod ?? false,
  is_negotiable: props.product.is_negotiable ?? true,
  price: props.product.price || '',
  availability: props.product.availability || 'available',
  description: props.product.description || '',
  specifications: {
    sub_type: props.product.specifications?.sub_type || '',
    ram: isRamInList ? initialRam : (initialRam ? 'Other' : ''),
    custom_ram: isRamInList ? '' : initialRam,
    storage: isStorageInList ? initialStorage : (initialStorage ? 'Other' : ''),
    custom_storage: isStorageInList ? '' : initialStorage,
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
    kelengkapan: getInitialKelengkapan(),
    kelengkapan_note: props.product.specifications?.kelengkapan_note || '',
  },
  images: [],
  delete_images: [],
})

// Handle 'Other' logic on mount
onMounted(() => {
  // Brand Other Logic
  const currentCat = getCategoryById(form.category_id)
  if (currentCat && props.product.brand) {
    const brands = currentCat.brands || []
    if (!brands.includes(props.product.brand) && props.product.brand !== 'Other') {
      form.brand = 'Other'
      form.custom_brand = props.product.brand
    }
  }

  // RAM Other Logic
  if (initialRam && !isRamInList && initialRam !== 'Other') {
    form.specifications.ram = 'Other'
    form.specifications.custom_ram = initialRam
  }

  // Storage Other Logic
  if (initialStorage && !isStorageInList && initialStorage !== 'Other') {
    form.specifications.storage = 'Other'
    form.specifications.custom_storage = initialStorage
  }
})

// ─── Stepper ───────────────────────────────────────────────────────────────
const currentStep = ref(1) // Start at Step 1 (Specs) as Category is fixed

const STEPS = [
  { id: 'category',   label: 'Kategori',     icon: Tag },
  { id: 'specs',      label: 'Spesifikasi',  icon: Wrench },
  { id: 'sales',      label: 'Penjualan',    icon: CircleDollarSign },
  { id: 'kelengkapan',label: 'Kelengkapan',  icon: Package },
  { id: 'media',      label: 'Foto',         icon: Camera },
]

const goNext = () => { if (currentStep.value < STEPS.length - 1) currentStep.value++ }
const goPrev = () => { if (currentStep.value > 0) currentStep.value-- } 
const goTo   = (i) => { if (i <= maxReachedStep.value) currentStep.value = i }

const maxReachedStep = ref(STEPS.length - 1) // In edit mode, all steps are reachable

const canProceedStep1 = computed(() => {
  const ok = !!form.brand && !!form.type
  if (form.brand === 'Other') return ok && !!form.custom_brand
  return ok
})
const canProceedStep2 = computed(() => !!form.price && !!form.description)
const canProceedStep3 = computed(() => true)

const canGoNext = computed(() => {
  if (currentStep.value === 1) return canProceedStep1.value
  if (currentStep.value === 2) return canProceedStep2.value
  if (currentStep.value === 3) return canProceedStep3.value
  return true
})

// ─── Category & Form Sections ──────────────────────────────────────────────
const currentCategory = computed(() => getCategoryById(form.category_id))
const selectedCategoryName = computed(() => currentCategory.value?.label.toLowerCase() || '')
const formSections = computed(() => getFieldsByCategory(form.category_id, form))

// ─── Brand / Field helpers ─────────────────────────────────────────────────
const filteredBrands = computed(() => {
  if (!currentCategory.value) return []
  const subTypeKey = form.specifications.sub_type
  const subType = currentCategory.value.sub_types?.find(st => st.value === subTypeKey)
  return subType?.brands || currentCategory.value.brands || []
})

const isTopLevel = (key) => ['brand', 'type'].includes(key)
const getFieldModel   = (key) => isTopLevel(key) ? form[key] : form.specifications[key]
const updateFieldModel = (key, value) => {
  if (isTopLevel(key)) { form[key] = value; if (value !== 'Other') form['custom_' + key] = '' }
  else { form.specifications[key] = value; if (value !== 'Other') form.specifications['custom_' + key] = '' }
}
const getCustomModel    = (key) => isTopLevel(key) ? form['custom_' + key] : form.specifications['custom_' + key]
const updateCustomModel = (key, value) => {
  if (isTopLevel(key)) form['custom_' + key] = value
  else form.specifications['custom_' + key] = value
}

// ─── GSM Search ───────────────────────────────────────────────────────────
const openGsmSearch = () => {
  if (!form.brand || !form.type) { alert('Pilih Merek dan isi Tipe terlebih dahulu.'); return }
  const query = encodeURIComponent(form.brand + ' ' + form.type)
  if (selectedCategoryName.value.includes('smartphone') || selectedCategoryName.value.includes('tablet')) {
    window.open(`https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`, '_blank')
  } else if (selectedCategoryName.value.includes('camera')) {
    window.open(`https://www.google.com/search?q=${query}+specs+dpreview`, '_blank')
  } else {
    const suffix = selectedCategoryName.value.includes('laptop') ? ' specs laptopmedia' : ' specs'
    window.open(`https://www.google.com/search?q=${query}${suffix}`, '_blank')
  }
}

// ─── Image Handling ───────────────────────────────────────────────────────
const imagePreviews  = ref([])
const fileInput      = ref(null)
const showCropper    = ref(false)
const pendingFiles   = ref([])

const handleFiles = (event) => {
  const files     = Array.from(event.target.files)
  const existingCount = props.product.images.length - form.delete_images.length
  const currentNewCount = form.images.length
  const remaining = 10 - (existingCount + currentNewCount)
  
  if (remaining <= 0) { alert('Maksimal 10 foto diperbolehkan.'); if (fileInput.value) fileInput.value.value = ''; return }
  const toAdd = files.slice(0, remaining)
  if (toAdd.length > 0) { pendingFiles.value = toAdd; showCropper.value = true }
}

const handleCropped = ({ blob, originalFile }) => {
  const fileName = originalFile.name.replace(/\.[^/.]+$/, '') + '.jpg'
  const file = new File([blob], fileName, { type: 'image/jpeg' })
  form.images.push(file)
  const reader = new FileReader()
  reader.onload = (e) => imagePreviews.value.push({ url: e.target.result, name: fileName })
  reader.readAsDataURL(file)
}

const handleCropperFinished = () => {
  showCropper.value = false; pendingFiles.value = []
  if (fileInput.value) fileInput.value.value = ''
}

const removeNewFile = (index) => { form.images.splice(index, 1); imagePreviews.value.splice(index, 1) }

const toggleDeleteExisting = (imageId) => {
  const index = form.delete_images.indexOf(imageId)
  if (index > -1) form.delete_images.splice(index, 1)
  else form.delete_images.push(imageId)
}
const isExistingDeleted = (imageId) => form.delete_images.includes(imageId)

// ─── Cancel Confirmation ──────────────────────────────────────────────────
const confirmCancel = () => {
  if (confirm('Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.')) {
    window.location.href = route('dashboard')
  }
}

// ─── Submit ───────────────────────────────────────────────────────────────
const submit = () => {
  form.post(route('products.update', props.product.slug), { 
    forceFormData: true, 
    preserveScroll: true,
    onSuccess: () => {} 
  })
}
</script>

<template>
  <AppLayout>
    <Head title="Edit Produk" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Edit Produk</h2>
    </template>

    <div class="py-8">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

        <!-- ── Stepper Header ── -->
        <nav aria-label="Form steps" class="mb-8">
          <ol class="flex items-center justify-between gap-1">
            <li
              v-for="(step, i) in STEPS"
              :key="step.id"
              class="flex flex-1 flex-col items-center gap-1.5"
            >
              <div class="flex w-full items-center">
                <div class="flex-1 h-px" :class="i === 0 ? 'invisible' : (i <= currentStep ? 'bg-primary' : 'bg-border')" />
                <button
                  type="button"
                  @click="goTo(i)"
                  :disabled="i === 0 || i > maxReachedStep"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all"
                  :class="[
                    i === currentStep
                      ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30'
                      : i < currentStep
                        ? 'border-primary bg-primary/10 text-primary cursor-pointer hover:bg-primary/20'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  ]"
                  :title="step.label"
                >
                  <Check v-if="i < currentStep" class="h-4 w-4" />
                  <component v-else :is="step.icon" class="h-4 w-4" />
                </button>
                <div class="flex-1 h-px" :class="i === STEPS.length - 1 ? 'invisible' : (i < currentStep ? 'bg-primary' : 'bg-border')" />
              </div>
              <span
                class="text-[10px] font-semibold transition-colors"
                :class="i === currentStep ? 'text-primary' : i < currentStep ? 'text-primary/70' : 'text-muted-foreground'"
              >{{ step.label }}</span>
            </li>
          </ol>
        </nav>

        <!-- ── Step Card ── -->
        <div class="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">

          <!-- STEP 0 — KATEGORI (READONLY) -->
          <div v-show="currentStep === 0">
            <h3 class="mb-1 text-lg font-bold">Kategori Produk</h3>
            <p class="mb-6 text-sm text-muted-foreground">Kategori tidak dapat diubah.</p>
            <div class="rounded-xl border-2 border-primary bg-primary/10 p-4 text-sm font-bold text-primary">
              {{ product.category.name }}
            </div>
            <p class="mt-4 flex items-center gap-2 text-xs italic text-muted-foreground">
              <Info class="h-3 w-3" /> Kategori tetap untuk menjaga integritas spesifikasi.
            </p>
          </div>

          <!-- STEP 1 — SPESIFIKASI -->
          <div v-show="currentStep === 1">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold">Spesifikasi Produk</h3>
                <p class="text-sm text-muted-foreground">Perbarui detail teknis gawai Anda.</p>
              </div>
              <button type="button" @click="openGsmSearch"
                class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"
              >
                <ExternalLink class="h-3.5 w-3.5" />
                <span>{{ selectedCategoryName.includes('smartphone') || selectedCategoryName.includes('tablet') ? 'GSM Arena' : 'Cari Spek' }}</span>
              </button>
            </div>

            <div v-if="currentCategory?.sub_types" class="mb-6">
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
                >{{ st.label }}</button>
              </div>
            </div>

            <div class="space-y-8">
              <div v-for="section in formSections" :key="section.id">
                <p class="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{{ section.label }}</p>
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <template v-for="field in section.fields" :key="field.key">
                    <div v-if="field.type === 'select'">
                      <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
                      <select
                        :value="getFieldModel(field.key)"
                        @input="updateFieldModel(field.key, $event.target.value)"
                        :id="field.key"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        :required="field.required"
                      >
                        <option value="">{{ field.placeholder || 'Pilih...' }}</option>
                        <template v-if="field.key === 'brand'">
                          <option v-for="brand in filteredBrands" :key="brand" :value="brand">{{ brand }}</option>
                        </template>
                        <template v-else>
                          <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                        </template>
                      </select>
                      <div v-if="field.allowOther && getFieldModel(field.key) === 'Other'" class="mt-2">
                        <TextInput
                          :value="getCustomModel(field.key)"
                          @input="updateCustomModel(field.key, $event.target.value)"
                          :placeholder="'Sebutkan ' + field.label"
                          class="h-10"
                          required
                        />
                      </div>
                      <InputError class="mt-1" :message="isTopLevel(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
                    </div>

                    <div v-else-if="['number', 'text'].includes(field.type)">
                      <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
                      <TextInput
                        :value="getFieldModel(field.key)"
                        @input="updateFieldModel(field.key, $event.target.value)"
                        :id="field.key"
                        :type="field.type"
                        class="mt-1 block h-11 w-full"
                        :placeholder="field.placeholder"
                        :required="field.required"
                      />
                      <InputError class="mt-1" :message="isTopLevel(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
                    </div>

                    <div v-else-if="field.type === 'boolean'" class="flex items-center gap-3 sm:col-span-1 pt-6">
                      <input
                        type="checkbox"
                        :checked="getFieldModel(field.key)"
                        @change="updateFieldModel(field.key, $event.target.checked)"
                        :id="field.key"
                        class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                      />
                      <label :for="field.key" class="cursor-pointer text-sm font-medium leading-none">
                        {{ field.label }}
                        <span v-if="field.placeholder" class="block text-[10px] font-normal text-muted-foreground">{{ field.placeholder }}</span>
                      </label>
                      <InputError class="mt-1" :message="form.errors['specifications.' + field.key]" />
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2 — PENJUALAN -->
          <div v-show="currentStep === 2">
            <h3 class="mb-1 text-lg font-bold">Informasi Penjualan</h3>
            <p class="mb-6 text-sm text-muted-foreground">Tetapkan harga dan kondisi produk Anda.</p>

            <div class="space-y-5">
              <div>
                <InputLabel for="price" value="Harga Produk (Rp)" />
                <CurrencyInput id="price" v-model="form.price" :required="true" placeholder="0" />
                <InputError class="mt-1" :message="form.errors.price" />
              </div>

              <div>
                <InputLabel for="condition" value="Kondisi Barang" />
                <select id="condition" v-model="form.condition"
                  class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option v-for="item in PRODUCT_CONDITIONS" :key="item.value" :value="item.value">{{ item.label }}</option>
                </select>
                <InputError class="mt-1" :message="form.errors.condition" />
              </div>

              <div>
                <InputLabel for="availability" value="Status Ketersediaan" />
                <select id="availability" v-model="form.availability"
                  class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="available">Tersedia (Available)</option>
                  <option value="sold">Terjual (Sold)</option>
                </select>
                <InputError class="mt-1" :message="form.errors.availability" />
              </div>

              <div class="flex flex-wrap gap-3">
                <label
                  class="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"
                  :class="form.is_cod ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'"
                >
                  <input type="checkbox" id="is_cod" v-model="form.is_cod" class="h-5 w-5 rounded border-border text-primary focus:ring-primary" />
                  <div>
                    <p class="text-sm font-bold">COD</p>
                    <p class="text-[10px] text-muted-foreground">Cash On Delivery</p>
                  </div>
                </label>
                <label
                  class="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all flex-1 min-w-[140px]"
                  :class="form.is_negotiable ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'"
                >
                  <input type="checkbox" id="is_negotiable" v-model="form.is_negotiable" class="h-5 w-5 rounded border-border text-primary focus:ring-primary" />
                  <div>
                    <p class="text-sm font-bold">Bisa Nego</p>
                    <p class="text-[10px] text-muted-foreground">Harga dapat dinegosiasikan</p>
                  </div>
                </label>
              </div>

              <div>
                <InputLabel for="description" value="Deskripsi Produk" />
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="5"
                  class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                  required
                  :placeholder="form.condition === 'second_good' || form.condition === 'minus'
                    ? 'WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)...'
                    : 'Jelaskan kelengkapan, garansi, dan kondisi fisik secara detail...'"
                />
                <InputError class="mt-1" :message="form.errors.description" />
              </div>
            </div>
          </div>

          <!-- STEP 3 — KELENGKAPAN -->
          <div v-show="currentStep === 3">
            <h3 class="mb-1 text-lg font-bold">Kelengkapan Produk</h3>
            <p class="mb-6 text-sm text-muted-foreground">Centang semua item yang tersedia dalam paket penjualan.</p>

            <div v-if="currentCategory" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <label
                v-for="item in currentCategory.checklists"
                :key="item"
                class="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all"
                :class="form.specifications.kelengkapan.includes(item)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-muted/30 hover:border-primary/40'"
              >
                <input
                  type="checkbox"
                  :value="item"
                  v-model="form.specifications.kelengkapan"
                  class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                />
                <span class="text-sm font-semibold">{{ item }}</span>
              </label>
            </div>

            <div class="mt-5">
              <InputLabel value="Keterangan Lain (Opsional)" />
              <TextInput v-model="form.specifications.kelengkapan_note" placeholder="Misal: Dus ada penyok dikit" class="mt-1" />
              <InputError class="mt-1" :message="form.errors['specifications.kelengkapan_note']" />
            </div>
            <InputError class="mt-3" :message="form.errors['specifications.kelengkapan']" />
          </div>

          <!-- STEP 4 — MEDIA -->
          <div v-show="currentStep === 4">
            <h3 class="mb-1 text-lg font-bold">Foto Produk</h3>
            <p class="mb-6 text-sm text-muted-foreground">Kelola foto produk Anda. Maksimal 10 foto.</p>

            <!-- Existing Photos -->
            <div v-if="product.images.length > 0" class="mb-8">
              <InputLabel value="Foto Saat Ini (Klik untuk hapus)" class="mb-3" />
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                <div
                  v-for="img in product.images"
                  :key="img.id"
                  class="group relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm transition-all"
                  :class="{'opacity-30 grayscale scale-95 border-destructive': isExistingDeleted(img.id)}"
                >
                  <img :src="'/storage/' + img.image_path" class="h-full w-full object-cover" />
                  <button
                    type="button"
                    @click="toggleDeleteExisting(img.id)"
                    class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all"
                    :class="isExistingDeleted(img.id) ? 'bg-primary text-white' : 'bg-background/80 text-foreground hover:bg-destructive hover:text-white'"
                  >
                    <Check v-if="isExistingDeleted(img.id)" class="h-3 w-3" />
                    <X v-else class="h-3 w-3" />
                  </button>
                  <div v-if="isExistingDeleted(img.id)" class="absolute inset-0 flex items-center justify-center">
                    <span class="bg-destructive px-1.5 py-0.5 text-[8px] font-bold text-white rounded">DIHAPUS</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Upload New -->
            <label
              for="images"
              class="group flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5"
            >
              <ImagePlus class="mb-2 h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" />
              <p class="text-sm font-semibold text-muted-foreground group-hover:text-primary">Tambah foto baru</p>
              <input
                id="images"
                ref="fileInput"
                type="file"
                @change="handleFiles"
                class="hidden"
                multiple
                accept="image/jpeg,image/png,image/jpg"
              />
            </label>

            <!-- New Previews -->
            <div v-if="imagePreviews.length > 0" class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              <div
                v-for="(preview, index) in imagePreviews"
                :key="index"
                class="group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-card shadow-sm"
              >
                <img :src="preview.url" class="h-full w-full object-cover" />
                <button
                  type="button"
                  @click="removeNewFile(index)"
                  class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg"
                >
                  <X class="h-3 w-3" />
                </button>
                <div class="absolute bottom-0 left-0 right-0 bg-emerald-500/80 py-0.5 text-center text-[9px] font-bold text-white">BARU</div>
              </div>
            </div>

            <InputError class="mt-2" :message="form.errors.images" />
          </div>

          <!-- ── Navigation ── -->
          <div class="mt-8 flex items-center justify-between border-t border-border pt-5">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="goPrev"
              class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"
            >
              <ChevronLeft class="h-4 w-4" />
              Sebelumnya
            </button>
            <button
              v-else
              type="button"
              @click="confirmCancel"
              class="text-sm font-bold text-muted-foreground transition-colors hover:text-destructive"
            >Batal</button>

            <div class="flex items-center gap-3">
              <span class="text-xs text-muted-foreground">{{ currentStep + 1 }} / {{ STEPS.length }}</span>
              <button
                v-if="currentStep < STEPS.length - 1"
                type="button"
                @click="goNext"
                :disabled="!canGoNext"
                class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Selanjutnya
                <ChevronRight class="h-4 w-4" />
              </button>
              <PrimaryButton
                v-else
                :disabled="form.processing"
                @click="submit"
                class="h-11 px-6 text-sm"
              >
                {{ form.processing ? 'Memproses...' : 'Simpan Perubahan' }}
              </PrimaryButton>
            </div>
          </div>
        </div>

      </div>
    </div>

    <ImageCropperModal
      :show="showCropper"
      :files="pendingFiles"
      @close="handleCropperFinished"
      @cropped="handleCropped"
      @finished="handleCropperFinished"
    />
  </AppLayout>
</template>
