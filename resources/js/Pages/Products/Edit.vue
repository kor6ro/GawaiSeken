<script setup>
import { ref, computed, watch } from 'vue'
import { Head, useForm, Link } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import BackButton from '@/Components/BackButton.vue'
import { ChevronRight, ChevronLeft, Check, Tag, Wrench, Package, Camera, CircleDollarSign, Info } from 'lucide-vue-next'
import ImageCropperModal from '@/Components/ImageCropperModal.vue'

// Import Step Components (Reusable)
import SpecsStep from './Partials/SpecsStep.vue'
import SalesStep from './Partials/SalesStep.vue'
import KelengkapanStep from './Partials/KelengkapanStep.vue'
import EditMediaStep from './Partials/EditMediaStep.vue'

import {
  getCategoryById,
  getFieldsByCategory,
} from '@/constants'

const props = defineProps({
  product: Object,
  categories: Array,
})

const form = useForm({
  _method: 'PUT',
  category_id: props.product.category_id,
  brand: props.product.brand,
  custom_brand: props.product.custom_brand || '',
  type: props.product.type,
  condition: props.product.condition,
  availability: props.product.availability,
  is_cod: !!props.product.is_cod,
  is_negotiable: !!props.product.is_negotiable,
  price: props.product.price,
  description: props.product.description,
  specifications: {
    ...props.product.specifications,
    kelengkapan: props.product.specifications?.kelengkapan || [],
  },
  images: [],
  delete_images: [],
})

// ─── Stepper ───────────────────────────────────────────────────────────────
const currentStep = ref(1)
const STEPS = [
  { id: 'category',   label: 'Kategori',     icon: Tag },
  { id: 'specs',      label: 'Spesifikasi',  icon: Wrench },
  { id: 'sales',      label: 'Penjualan',    icon: CircleDollarSign },
  { id: 'kelengkapan',label: 'Kelengkapan',  icon: Package },
  { id: 'media',      label: 'Foto',         icon: Camera },
]

const goNext = () => { if (currentStep.value < STEPS.length - 1) currentStep.value++ }
const goPrev = () => { if (currentStep.value > 1) currentStep.value-- }
const goTo   = (i) => { if (i > 0 && i <= maxReachedStep.value) currentStep.value = i }

const maxReachedStep = ref(1)
watch(currentStep, (v) => { if (v > maxReachedStep.value) maxReachedStep.value = v })

const canGoNext = computed(() => {
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
const showCropper = ref(false)
const pendingFiles = ref([])

const handleFiles = (event) => {
  const files = Array.from(event.target.files)
  const currentTotal = props.product.images.length - form.delete_images.length + form.images.length
  const remaining = 10 - currentTotal
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

const removeNewFile = (index) => { form.images.splice(index, 1); imagePreviews.value.splice(index, 1) }
const toggleDeleteExisting = (id) => {
  const idx = form.delete_images.indexOf(id)
  if (idx > -1) form.delete_images.splice(idx, 1)
  else form.delete_images.push(id)
}
const isExistingDeleted = (id) => form.delete_images.includes(id)

const submit = () => {
  form.post(route('products.update', props.product.slug), { forceFormData: true })
}
</script>

<template>
  <AppLayout>
    <Head title="Edit Produk" />

    <template #header>
      <div class="flex items-center gap-3">
        <BackButton fallbackRoute="dashboard" />
        <h2 class="text-xl font-semibold leading-tight text-foreground">Edit Produk</h2>
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
                  type="button" @click="goTo(i)" :disabled="i === 0 || i > maxReachedStep"
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

          <EditMediaStep 
            v-show="currentStep === 4" 
            :product="product"
            :form="form" 
            :image-previews="imagePreviews"
            :is-existing-deleted="isExistingDeleted"
            @handle-files="handleFiles"
            @remove-new-file="removeNewFile"
            @toggle-delete-existing="toggleDeleteExisting"
          />

          <!-- Navigation -->
          <div class="mt-8 flex items-center justify-between border-t border-border pt-5">
            <button
              v-if="currentStep > 1"
              type="button" @click="goPrev"
              class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-muted"
            >
              <ChevronLeft class="h-4 w-4" /> Sebelumnya
            </button>
            <div v-else />

            <div class="flex items-center gap-3">
              <span class="text-xs text-muted-foreground">{{ currentStep + 1 }} / {{ STEPS.length }}</span>
              <button
                v-if="currentStep < STEPS.length - 1"
                type="button" @click="goNext" :disabled="!canGoNext"
                class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                Selanjutnya <ChevronRight class="h-4 w-4" />
              </button>
              <PrimaryButton v-else :disabled="form.processing" @click="submit">
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
      @close="showCropper = false"
      @cropped="handleCropped"
      @finished="handleCropperFinished"
    />
  </AppLayout>
</template>
