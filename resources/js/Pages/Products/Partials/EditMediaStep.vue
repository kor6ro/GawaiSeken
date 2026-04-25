<script setup>
import { ImagePlus, X, Check } from 'lucide-vue-next'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'

const props = defineProps({
  product: Object,
  form: Object,
  imagePreviews: Array,
  isExistingDeleted: Function
})

const emit = defineEmits(['handleFiles', 'removeNewFile', 'toggleDeleteExisting'])
</script>

<template>
  <div>
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
            @click="$emit('toggleDeleteExisting', img.id)"
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
        type="file"
        @change="$emit('handleFiles', $event)"
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
          @click="$emit('removeNewFile', index)"
          class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg"
        >
          <X class="h-3 w-3" />
        </button>
        <div class="absolute bottom-0 left-0 right-0 bg-emerald-500/80 py-0.5 text-center text-[9px] font-bold text-white">BARU</div>
      </div>
    </div>

    <InputError class="mt-2" :message="form.errors.images" />
  </div>
</template>
