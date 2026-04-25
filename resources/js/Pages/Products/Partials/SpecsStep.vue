<script setup>
import { computed } from 'vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import InputError from '@/Components/InputError.vue'
import { ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  form: Object,
  formSections: Array,
  filteredBrands: Array,
  currentCategory: Object,
  selectedCategoryName: String
})

const emit = defineEmits(['openGsmSearch'])

// Native v-model handles the reactivity now, eliminating keystroke drops.
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold">Spesifikasi Produk</h3>
        <p class="text-sm text-muted-foreground">Isi detail teknis gawai Anda.</p>
      </div>
      <button type="button" @click="$emit('openGsmSearch')"
        class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/80"
      >
        <ExternalLink class="h-3.5 w-3.5" />
        <span>{{ selectedCategoryName.includes('smartphone') || selectedCategoryName.includes('tablet') ? 'GSM Arena' : 'Cari Spek' }}</span>
      </button>
    </div>

    <!-- Sub-Type pill selector -->
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

    <!-- Dynamic Fields -->
    <div class="space-y-8">
      <div v-for="section in formSections" :key="section.id">
        <p class="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{{ section.label }}</p>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div v-for="field in section.fields" :key="field.key">
            
            <!-- Select -->
            <div v-if="field.type === 'select'">
              <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
              
              <!-- Top Level Select (brand, type) -->
              <select
                v-if="['brand', 'type'].includes(field.key)"
                v-model="form[field.key]"
                @change="form[field.key] !== 'Other' ? form['custom_' + field.key] = '' : null"
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

              <!-- Specifications Select -->
              <select
                v-else
                v-model="form.specifications[field.key]"
                @change="form.specifications[field.key] !== 'Other' ? form.specifications['custom_' + field.key] = '' : null"
                :id="field.key"
                class="mt-1 block h-11 w-full rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                :required="field.required"
              >
                <option value="">{{ field.placeholder || 'Pilih...' }}</option>
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              
              <!-- Custom Input if 'Other' is selected -->
              <div v-if="field.allowOther && (['brand', 'type'].includes(field.key) ? form[field.key] : form.specifications[field.key]) === 'Other'" class="mt-2">
                <TextInput
                  v-if="['brand', 'type'].includes(field.key)"
                  v-model="form['custom_' + field.key]"
                  :placeholder="'Sebutkan ' + field.label"
                  class="h-10"
                  required
                />
                <TextInput
                  v-else
                  v-model="form.specifications['custom_' + field.key]"
                  :placeholder="'Sebutkan ' + field.label"
                  class="h-10"
                  required
                />
              </div>
              <InputError class="mt-1" :message="['brand', 'type'].includes(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
            </div>

            <!-- Text / Number -->
            <div v-else-if="['number', 'text'].includes(field.type)">
              <InputLabel :for="field.key" :value="field.label + (field.unit ? ` (${field.unit})` : '')" />
              
              <TextInput
                v-if="['brand', 'type'].includes(field.key)"
                v-model="form[field.key]"
                :id="field.key"
                :type="field.type"
                class="mt-1 block h-11 w-full"
                :placeholder="field.placeholder"
                :required="field.required"
              />
              <TextInput
                v-else
                v-model="form.specifications[field.key]"
                :id="field.key"
                :type="field.type"
                class="mt-1 block h-11 w-full"
                :placeholder="field.placeholder"
                :required="field.required"
              />

              <InputError class="mt-1" :message="['brand', 'type'].includes(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
            </div>

            <!-- Boolean -->
            <div v-else-if="field.type === 'boolean'" class="flex items-center gap-3 pt-6">
              <input
                v-if="['brand', 'type'].includes(field.key)"
                type="checkbox"
                v-model="form[field.key]"
                :id="field.key"
                class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              <input
                v-else
                type="checkbox"
                v-model="form.specifications[field.key]"
                :id="field.key"
                class="h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              
              <label :for="field.key" class="cursor-pointer text-sm font-medium leading-none">
                {{ field.label }}
                <span v-if="field.placeholder" class="block text-[10px] font-normal text-muted-foreground">{{ field.placeholder }}</span>
              </label>
              <InputError class="mt-1" :message="['brand', 'type'].includes(field.key) ? form.errors[field.key] : form.errors['specifications.' + field.key]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
