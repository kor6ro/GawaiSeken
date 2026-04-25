<script setup>
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
  form: Object,
  currentCategory: Object
})
</script>

<template>
  <div>
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
    <p v-else class="text-sm italic text-muted-foreground">Pilih kategori terlebih dahulu.</p>

    <div class="mt-5">
      <InputLabel value="Keterangan Lain (Opsional)" />
      <TextInput v-model="form.specifications.kelengkapan_note" placeholder="Misal: Dus ada penyok dikit" class="mt-1" />
      <InputError class="mt-1" :message="form.errors['specifications.kelengkapan_note']" />
    </div>
    <InputError class="mt-3" :message="form.errors['specifications.kelengkapan']" />
  </div>
</template>
