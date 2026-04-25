<script setup>
import { ImagePlus, X } from 'lucide-vue-next'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
  form: Object,
  imagePreviews: Array,
  fileInput: Object
})

const emit = defineEmits(['handleFiles', 'removeFile'])
</script>

<template>
  <div>
    <h3 class="mb-1 text-lg font-bold">Foto Produk</h3>
    <p class="mb-6 text-sm text-muted-foreground">Upload minimal 1 foto. Foto pertama jadi cover.</p>

    <label
      for="images"
      class="group flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all hover:border-primary hover:bg-primary/5"
    >
      <ImagePlus class="mb-2 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
      <p class="text-sm font-semibold text-muted-foreground group-hover:text-primary">Klik untuk tambah foto</p>
      <p class="mt-1 text-[10px] text-muted-foreground">JPG, PNG – Maks 10 foto</p>
      <input
        id="images"
        type="file"
        @change="$emit('handleFiles', $event)"
        class="hidden"
        multiple
        accept="image/jpeg,image/png,image/jpg"
        :required="form.images.length === 0"
      />
    </label>

    <!-- Preview -->
    <div v-if="imagePreviews.length > 0" class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      <div
        v-for="(preview, index) in imagePreviews"
        :key="index"
        class="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <img :src="preview.url" loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <button
          type="button"
          @click="$emit('removeFile', index)"
          class="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg transition-transform hover:scale-110"
        >
          <X class="h-3 w-3" />
        </button>
        <div v-if="index === 0" class="absolute bottom-0 left-0 right-0 bg-primary/80 py-0.5 text-center text-[9px] font-bold text-white">COVER</div>
      </div>
    </div>

    <InputError class="mt-2" :message="form.errors.images" />
    <div v-for="(error, index) in form.errors" :key="index">
      <InputError v-if="String(index).startsWith('images.')" class="mt-1" :message="error" />
    </div>
  </div>
</template>
