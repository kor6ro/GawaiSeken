<script setup>
import { computed } from 'vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
  form: Object,
  categories: Array
})
</script>

<template>
  <div>
    <h3 class="mb-1 text-lg font-bold">Pilih Kategori</h3>
    <p class="mb-6 text-sm text-muted-foreground">Pilih kategori gawai yang ingin Anda jual.</p>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        @click="form.category_id = cat.id"
        class="rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all hover:border-primary/60"
        :class="form.category_id === cat.id
          ? 'border-primary bg-primary/10 text-primary shadow-sm'
          : 'border-border bg-muted/40 text-foreground'"
      >
        {{ cat.name }}
      </button>
    </div>
    <InputError class="mt-3" :message="form.errors.category_id" />
  </div>
</template>
