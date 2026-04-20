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
import {
  PRODUCT_BRANDS,
  PRODUCT_CONDITIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  KELENGKAPAN_OPTIONS,
} from '@/constants'

const props = defineProps({
  categories: Array,
})

const form = useForm({
  category_id: '',
  brand: '',
  type: '',
  condition: 'Bekas Mulus',
  is_cod: false,
  is_negotiable: true,
  price: '',
  description: '',
  specifications: {
    ram: '',
    storage: '',
    battery_health: '',
    screen_size: '',
    processor: '',
    gpu: '',
    kelengkapan: '',
  },
  images: [],
})

// Auto-check Negotiable if condition is "Bekas"
watch(
  () => form.condition,
  (newVal) => {
    if (newVal && newVal.includes('Bekas')) {
      form.is_negotiable = true
    }
  }
)

const filteredBrands = computed(() => {
  return PRODUCT_BRANDS[form.category_id] || PRODUCT_BRANDS['default']
})

const selectedCategoryName = computed(() => {
  const cat = props.categories.find((c) => c.id == form.category_id)
  return cat ? cat.name.toLowerCase() : ''
})

const showSpecs = computed(() => form.category_id !== '')

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
  } else {
    const suffix = selectedCategoryName.value.includes('laptop') ? ' specs laptopmedia' : ' specs'
    window.open(`https://www.google.com/search?q=${query}${suffix}`, '_blank')
  }
}

const imagePreviews = ref([])
const fileInput = ref(null)

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
    form.specifications = {
      ram: '',
      storage: '',
      battery_health: '',
      screen_size: '',
      processor: '',
      gpu: '',
      kelengkapan: '',
    }
  }
)
</script>

<template>
  <AppLayout>
    <Head title="Jual Produk Baru" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Jual Produk Baru</h2>
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
              <!-- SECTION 1: IDENTITAS PRODUK -->
              <div
                class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"
              >
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
                    <InputLabel for="category_id" value="Kategori" />
                    <select
                      id="category_id"
                      v-model="form.category_id"
                      class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                      </option>
                    </select>
                    <InputError class="mt-2" :message="form.errors.category_id" />
                  </div>

                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <InputLabel for="brand" value="Merek / Brand" />
                      <select
                        id="brand"
                        v-model="form.brand"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm transition-all focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">-- Pilih Merek --</option>
                        <option
                          v-for="brandName in filteredBrands"
                          :key="brandName"
                          :value="brandName"
                        >
                          {{ brandName }}
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
              <div
                class="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm transition-all duration-300 sm:p-8"
              >
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
                    <p class="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Info class="h-3 w-3" />
                      Isi harga dengan wajar sesuai kondisi gadget Second.
                    </p>
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
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div
                  v-if="showSpecs"
                  class="rounded-3xl border border-border bg-primary/5 p-6 shadow-sm transition-all duration-300 sm:p-8"
                >
                  <h3
                    class="mb-6 flex items-center gap-2 border-b border-border pb-3 text-lg font-bold"
                  >
                    <span
                      class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                      >3</span
                    >
                    3. Spesifikasi {{ selectedCategoryName }}
                  </h3>
                  <p class="mb-6 text-xs text-muted-foreground">
                    Informasi spesifikasi membantu calon pembeli mengenal produk lebih dalam.
                  </p>

                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div v-if="showField('smartphone,laptop,tablet')">
                      <InputLabel for="spec_ram" value="RAM" />
                      <select
                        v-model="form.specifications.ram"
                        id="spec_ram"
                        class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="">Pilih RAM</option>
                        <option v-for="ram in RAM_OPTIONS" :key="ram" :value="ram">
                          {{ ram }}
                        </option>
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

                    <div v-if="showField('laptop')">
                      <InputLabel for="spec_screen" value="Ukuran Layar (Inch)" />
                      <TextInput
                        v-model="form.specifications.screen_size"
                        type="text"
                        class="mt-1 block h-11 w-full"
                        placeholder="Misal: 14"
                      />
                    </div>

                    <div v-if="showField('laptop')">
                      <InputLabel for="spec_processor" value="Processor" />
                      <TextInput
                        v-model="form.specifications.processor"
                        type="text"
                        class="mt-1 block h-11 w-full"
                        placeholder="Contoh: Intel Core i5 Gen 12"
                      />
                    </div>

                    <div v-if="showField('laptop')">
                      <InputLabel for="spec_gpu" value="VGA / GPU" />
                      <TextInput
                        v-model="form.specifications.gpu"
                        type="text"
                        class="mt-1 block h-11 w-full"
                        placeholder="Contoh: NVIDIA RTX 3050"
                      />
                    </div>

                    <div v-if="showField('smartphone,laptop,tablet,aksesoris')">
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
              </Transition>

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
                        <p class="mt-1 text-[10px] text-muted-foreground">JPG, PNG up to 2MB</p>
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
  </AppLayout>
</template>
