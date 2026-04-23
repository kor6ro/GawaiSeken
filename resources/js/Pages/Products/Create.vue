<script setup>
import { ref, computed, watch } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import CurrencyInput from '@/Components/CurrencyInput.vue'
import { ExternalLink, ImagePlus, X, Info } from 'lucide-vue-next'
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
  categories: Array,
})

const form = useForm({
  category_id: '',
  brand: '',
  custom_brand: '',
  type: '',
  condition: 'second_like_new',
  is_cod: false,
  is_negotiable: true,
  price: '',
  description: '',
  specifications: {
    sub_type: '',
    ram: '',
    custom_ram: '',
    storage: '',
    custom_storage: '',
    battery_health: '',
    screen_size: '',
    connectivity: '',
    power_source: '',
    switch_type: '',
    cfw_status: '',
    shutter_count: '',
    is_battery_balanced: false,
    is_drift_free: false,
    has_original_lens: false,
    kelengkapan: [], // Now an array for multi-select
    kelengkapan_note: '',
  },
  images: [],
})

// Auto-check Negotiable if condition is "Bekas"
watch(
  () => form.condition,
  (newVal) => {
    if (newVal && newVal !== 'new') {
      form.is_negotiable = true
    }
  }
)

const currentCategory = computed(() => getCategoryById(form.category_id))
const selectedCategoryName = computed(() => currentCategory.value?.label.toLowerCase() || '')

const formSections = computed(() => {
  return getFieldsByCategory(form.category_id, form)
})

// Legacy helper for mixed categories
const showField = (cats) => {
  if (!selectedCategoryName.value) return false
  const allowed = cats.split(',')
  return allowed.some((cat) => selectedCategoryName.value.includes(cat))
}

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

const imagePreviews = ref([])
const fileInput = ref(null)

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
    if (fileInput.value) fileInput.value.value = ''
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
  if (fileInput.value) fileInput.value.value = ''
}

const removeFile = (index) => {
  form.images.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const submit = () => {
  form.post(route('products.store'), {
    forceFormData: true,
    onSuccess: () => {},
  })
}

watch(
  () => form.category_id,
  () => {
    form.brand = ''
    form.custom_brand = ''
    form.type = ''
    form.specifications = {
      sub_type: '',
      ram: '',
      custom_ram: '',
      storage: '',
      custom_storage: '',
      battery_health: '',
      screen_size: '',
      connectivity: '',
      power_source: '',
      switch_type: '',
      cfw_status: '',
      shutter_count: '',
      is_battery_balanced: false,
      is_drift_free: false,
      has_original_lens: false,
      kelengkapan: [],
    }
  }
)

const isTopLevel = (key) => ['brand', 'type'].includes(key)

const getFieldModel = (key) => {
  return isTopLevel(key) ? form[key] : form.specifications[key]
}

const updateFieldModel = (key, value) => {
  if (isTopLevel(key)) {
    form[key] = value
    if (value !== 'Other') form['custom_' + key] = ''
  } else {
    form.specifications[key] = value
    if (value !== 'Other') form.specifications['custom_' + key] = ''
  }
}

const getCustomModel = (key) => {
  return isTopLevel(key) ? form['custom_' + key] : form.specifications['custom_' + key]
}

const updateCustomModel = (key, value) => {
  if (isTopLevel(key)) {
    form['custom_' + key] = value
  } else {
    form.specifications['custom_' + key] = value
  }
}

const filteredBrands = computed(() => {
  if (!currentCategory.value) return []
  const subTypeKey = form.specifications.sub_type
  const subType = currentCategory.value.sub_types?.find((st) => st.value === subTypeKey)
  return subType?.brands || currentCategory.value.brands || []
})
</script>

<template>
  <AppLayout>
    <Head title="Jual Produk" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Jual Produk</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="border border-border bg-card p-4 text-card-foreground shadow sm:rounded-2xl sm:p-8"
        >
          <div class="mx-auto max-w-2xl">
            <header>
              <div
                class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h2 class="text-2xl font-bold">Informasi Produk</h2>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Lengkapi detail gawai yang ingin Anda jual.
                  </p>
                </div>
                <button
                  type="button"
                  @click="openGsmSearch"
                  class="inline-flex items-center gap-2 rounded-xl border border-border bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"
                >
                  <ExternalLink class="h-4 w-4" />
                  <span>{{
                    selectedCategoryName.includes('smartphone') ||
                    selectedCategoryName.includes('tablet')
                      ? 'Cari di GSM Arena'
                      : 'Cari Spesifikasi'
                  }}</span>
                </button>
              </div>
            </header>

            <form @submit.prevent="submit" class="space-y-8">
              <!-- SECTION 0: KATEGORI (MUST BE VISIBLE) -->
              <div class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm sm:p-8">
                <h3 class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">0</span>
                  Pilih Kategori
                </h3>
                <div>
                  <InputLabel for="category_id" value="Kategori Produk" />
                  <select
                    id="category_id"
                    v-model="form.category_id"
                    class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    required
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                  <InputError class="mt-2" :message="form.errors.category_id" />
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
                    <!-- Standard Select Renderer -->
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
                          <option v-for="brand in filteredBrands" :key="brand" :value="brand">
                            {{ brand }}
                          </option>
                        </template>
                        <template v-else>
                          <option v-for="opt in field.options" :key="opt" :value="opt">
                            {{ opt }}
                          </option>
                        </template>
                      </select>
                      
                      <!-- Auto-Other Text Input -->
                      <div v-if="field.allowOther && getFieldModel(field.key) === 'Other'" 
                        class="mt-2 animate-in fade-in slide-in-from-top-1"
                      >
                        <TextInput 
                          :value="getCustomModel(field.key)"
                          @input="updateCustomModel(field.key, $event.target.value)"
                          :placeholder="'Sebutkan ' + field.label" 
                          class="h-10" 
                          required
                        />
                      </div>
                      <InputError class="mt-2" :message="isTopLevel(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
                    </div>

                    <!-- Standard Text/Number Renderer -->
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
                      <InputError class="mt-2" :message="isTopLevel(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
                    </div>

                    <!-- Boolean Renderer -->
                    <div v-else-if="field.type === 'boolean'" class="flex items-center gap-3 pt-8">
                      <input
                        type="checkbox"
                        :checked="getFieldModel(field.key)"
                        @change="updateFieldModel(field.key, $event.target.checked)"
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
                  <div v-for="item in currentCategory.checklists" :key="item"
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
              <div
                class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"
              >
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
                  <InputLabel for="images" value="Upload Foto Produk (Min 1)" />
                  <div class="mt-2 flex w-full items-center justify-center">
                    <label
                      for="images"
                      class="group flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-all hover:bg-muted/50"
                    >
                      <div class="flex flex-col items-center justify-center pb-6 pt-5">
                        <ImagePlus
                          class="mb-3 h-10 w-10 text-muted-foreground transition-all group-hover:scale-110 group-hover:text-primary"
                        />
                        <p class="text-sm text-muted-foreground">
                          <span class="font-bold text-primary">Klik untuk tambah</span> atau seret
                          ke sini
                        </p>
                        <p class="mt-1 text-[10px] text-muted-foreground">
                          JPG, PNG up to 2MB. Maksimal 10 foto.
                        </p>
                      </div>
                      <input
                        id="images"
                        ref="fileInput"
                        type="file"
                        @change="handleFiles"
                        class="hidden"
                        multiple
                        accept="image/jpeg,image/png,image/jpg"
                        :required="form.images.length === 0"
                      />
                    </label>
                  </div>

                  <!-- Preview Gallery -->
                  <template v-if="imagePreviews.length > 0">
                    <div
                      class="animate-fade-in mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-muted/50 p-4 sm:grid-cols-4 md:grid-cols-5"
                    >
                      <div
                        v-for="(preview, index) in imagePreviews"
                        :key="index"
                        class="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                      >
                        <img
                          :src="preview.url"
                          loading="lazy"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button
                          type="button"
                          @click="removeFile(index)"
                          class="absolute right-2 top-2 z-10 flex items-center justify-center rounded-full border border-border bg-background/90 p-1.5 text-foreground shadow-lg transition-all hover:bg-destructive hover:text-white"
                        >
                          <X class="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </template>

                  <InputError class="mt-2" :message="form.errors.images" />
                  <div v-for="(error, index) in form.errors" :key="index">
                    <InputError v-if="index.startsWith('images.')" class="mt-1" :message="error" />
                  </div>
                </div>
              </div>

              <div class="mt-10 flex items-center gap-6 border-t border-border pt-4">
                <PrimaryButton :disabled="form.processing" class="h-12 px-8 text-sm">
                  {{ form.processing ? 'Sedang Memproses...' : 'Tayangkan Produk' }}
                </PrimaryButton>
                <Link
                  :href="route('dashboard')"
                  class="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
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
