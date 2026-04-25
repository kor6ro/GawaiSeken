<script setup>
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import InputError from '@/Components/InputError.vue'
import CurrencyInput from '@/Components/CurrencyInput.vue'
import { PRODUCT_CONDITIONS } from '@/constants'

const props = defineProps({
  form: Object
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="mb-1 text-lg font-bold">Informasi Penjualan</h3>
      <p class="mb-6 text-sm text-muted-foreground">Tetapkan harga dan kondisi produk Anda.</p>
    </div>

    <div class="space-y-5">
      <!-- Price -->
      <div>
        <InputLabel for="price" value="Harga Produk (Rp)" />
        <CurrencyInput id="price" v-model="form.price" :required="true" placeholder="0" />
        <InputError class="mt-1" :message="form.errors.price" />
      </div>

      <!-- Condition -->
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

      <!-- Toggles -->
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

      <!-- Description -->
      <div>
        <InputLabel for="description" value="Deskripsi Produk" />
        <textarea
          id="description"
          v-model.lazy="form.description"
          rows="5"
          class="mt-1 block w-full rounded-xl border-border bg-background p-3 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
          required
          :placeholder="form.condition === 'second_good' || form.condition === 'minus'
            ? 'WAJIB: Jelaskan semua minus secara jujur (LCD retak, baterai drop, dll)...'
            : 'Jelaskan kelengkapan, garansi, and kondisi fisik secara detail...'"
        />
        <InputError class="mt-1" :message="form.errors.description" />
      </div>
    </div>
  </div>
</template>
