<script setup>
import { ref, computed, watch } from 'vue'
import { Head, useForm, Link } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import BackButton from '@/Components/BackButton.vue'
import { ChevronRight, ChevronLeft, Check, Tag, Wrench, Package, Camera, CircleDollarSign } from 'lucide-vue-next'
import ImageCropperModal from '@/Components/ImageCropperModal.vue'

// Import Step Components
import CategoryStep from './Partials/CategoryStep.vue'
import SpecsStep from './Partials/SpecsStep.vue'
import SalesStep from './Partials/SalesStep.vue'
import KelengkapanStep from './Partials/KelengkapanStep.vue'
import MediaStep from './Partials/MediaStep.vue'

import {
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
    kelengkapan: [],
    kelengkapan_note: '',
  },
  images: [],
})

// ─── Stepper ───────────────────────────────────────────────────────────────
const currentStep = ref(0)
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

const maxReachedStep = ref(0)
watch(currentStep, (v) => { if (v > maxReachedStep.value) maxReachedStep.value = v })

const canGoNext = computed(() => {
  if (currentStep.value === 0) return !!form.category_id
  if (currentStep.value === 1) {
    const ok = !!form.brand && !!form.type
    return form.brand === 'Other' ? ok && !!form.custom_brand : ok
  }
  if (currentStep.value === 2) return !!form.price && !!form.description
  return true
})

// ─── Shared Logic ─────────────────────────────────────────────────────────
const currentCategory = computed(() => getCategoryById(form.category_id))
const selectedCategoryName = computed(() => currentCategory.value?.label.toLowerCase() || '')
const formSections = computed(() => {
  return getFieldsByCategory(form.category_id, {
    specifications: {
      sub_type: form.specifications.sub_type,
      connectivity: form.specifications.connectivity
    }
  })
})

const filteredBrands = computed(() => {
  if (!currentCategory.value) return []
  const subTypeKey = form.specifications.sub_type
  const subType = currentCategory.value.sub_types?.find(st => st.value === subTypeKey)
  return subType?.brands || currentCategory.value.brands || []
})

// Reset on category change
watch(() => form.category_id, () => {
  form.brand = ''; form.custom_brand = ''; form.type = ''
  form.specifications = {
    sub_type: '', ram: '', custom_ram: '', storage: '', custom_storage: '',
    battery_health: '', screen_size: '', connectivity: '', power_source: '',
    switch_type: '', cfw_status: '', shutter_count: '',
    is_battery_balanced: false, is_drift_free: false, has_original_lens: false,
    kelengkapan: [], kelengkapan_note: '',
  }
})

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
const imagePreviews = ref([])
const fileInput = ref(null)
const showCropper = ref(false)
const pendingFiles = ref([])

const handleFiles = (event) => {
  const files = Array.from(event.target.files)
  const remaining = 10 - form.images.length
  if (remaining <= 0) { alert('Maksimal 10 foto diperbolehkan.'); return }
  const toAdd = files.slice(0, remaining)
  if (toAdd.length > 0) { pendingFiles.value = toAdd; showCropper.value = true }
}

const handleCropped = ({ blob, originalFile }) => {
  const fileName = originalFile.name.replace(/\.[^/.]+$/, '') + '.jpg'
  const file = new File([blob], fileName, { type: 'image/jpeg' })
  
  // Directly push the file. Inertia handles reactive File objects correctly in FormData.
  form.images.push(file)
  
  // Use URL.createObjectURL for instant, synchronous preview
  imagePreviews.value.push({ url: URL.createObjectURL(blob), name: fileName })
}

const handleCropperFinished = () => {
  showCropper.value = false; pendingFiles.value = []
}

const removeFile = (index) => { form.images.splice(index, 1); imagePreviews.value.splice(index, 1) }

const confirmCancel = () => {
  if (confirm('Apakah Anda yakin ingin membatalkan? Data yang telah diisi akan hilang.')) {
    window.location.href = route('dashboard')
  }
}

const submit = () => {
  form.post(route('products.store'), { forceFormData: true })
}
</script>

<template>
  <AppLayout>
    <Head title="Jual Produk" />

    <template #header>
      <div class="flex items-center gap-3">
        <BackButton fallbackRoute="dashboard" />
        <h2 class="text-xl font-semibold leading-tight text-foreground">Jual Produk</h2>
      </div>
    </template>

    <div class="py-8">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

        <!-- Stepper Header -->
        <nav aria-label="Form steps" class="mb-8">
          <ol class="flex items-center justify-between gap-1">
            <li v-for="(step, i) in STEPS" :key="step.id" class="flex flex-1 flex-col items-center gap-1.5">
              <div class="flex w-full items-center">
                <div class="flex-1 h-px" :class="i === 0 ? 'invisible' : (i <= currentStep ? 'bg-primary' : 'bg-border')" />
                <button
                  type="button" @click="goTo(i)" :disabled="i > maxReachedStep"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all"
                  :class="[
                    i === currentStep
                      ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30'
                      : i < currentStep
                        ? 'border-primary bg-primary/10 text-primary cursor-pointer hover:bg-primary/20'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  ]"
                >
                  <Check v-if="i < currentStep" class="h-4 w-4" />
                  <component v-else :is="step.icon" class="h-4 w-4" />
                </button>
                <div class="flex-1 h-px" :class="i === STEPS.length - 1 ? 'invisible' : (i < currentStep ? 'bg-primary' : 'bg-border')" />
              </div>
              <span class="text-[10px] font-semibold" :class="i === currentStep ? 'text-primary' : 'text-muted-foreground'">{{ step.label }}</span>
            </li>
          </ol>
        </nav>

        <!-- Step Card -->
        <div class="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          
          <CategoryStep 
            v-show="currentStep === 0" 
            :form="form" 
            :categories="categories" 
          />

          <SpecsStep 
            v-show="currentStep === 1" 
            :form="form" 
            :form-sections="formSections"
            :filtered-brands="filteredBrands"
            :current-category="currentCategory"
            :selected-category-name="selectedCategoryName"
            @open-gsm-search="openGsmSearch"
          />

          <SalesStep 
            v-show="currentStep === 2" 
            :form="form" 
          />

          <KelengkapanStep 
            v-show="currentStep === 3" 
            :form="form" 
            :current-category="currentCategory"
          />

          <MediaStep 
            v-show="currentStep === 4" 
            :form="form" 
            :image-previews="imagePreviews"
            @handle-files="handleFiles"
            @remove-file="removeFile"
          />

          <!-- Navigation -->
          <div class="mt-8 flex items-center justify-between border-t border-border pt-5">
            <button
              v-if="currentStep > 0"
              type="button" @click="goPrev"
              class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"
            >
              <ChevronLeft class="h-4 w-4" /> Sebelumnya
            </button>
            <button v-else type="button" @click="confirmCancel" class="text-sm font-bold text-muted-foreground hover:text-destructive">Batal</button>

            <div class="flex items-center gap-3">
              <span class="text-xs text-muted-foreground">{{ currentStep + 1 }} / {{ STEPS.length }}</span>
              <button
                v-if="currentStep < STEPS.length - 1"
                type="button" @click="goNext" :disabled="!canGoNext"
                class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                Selanjutnya <ChevronRight class="h-4 w-4" />
              </button>
              <PrimaryButton v-else :disabled="form.processing || form.images.length === 0" @click="submit">
                {{ form.processing ? 'Memproses...' : 'Tayangkan Produk' }}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ImageCropperModal
      :show="showCropper"
      :files="pendingFiles"
      @close="showCropper = false"
      @cropped="handleCropped"
      @finished="handleCropperFinished"
    />
  </AppLayout>
</template>
