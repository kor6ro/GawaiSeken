<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import TextInput from '@/Components/TextInput.vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'
import { Building, MapPin, Navigation } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  prefix: {
    type: String,
    default: '' // '' for personal (e.g. 'province'), 'store_' for store (e.g. 'store_province')
  }
})

const emit = defineEmits(['update:modelValue'])

const form = props.modelValue

// Helper to get/set form properties dynamically based on prefix
const getField = (field) => form[`${props.prefix}${field}`]
const setField = (field, value) => { form[`${props.prefix}${field}`] = value }
const getError = (field) => form.errors?.[`${props.prefix}${field}`]

const provinces = ref([])
const cities = ref([])
const districts = ref([])
const villages = ref([])
const isInitializing = ref(true)

const selectedProvinceId = ref('')
const selectedCityId = ref('')
const selectedDistrictId = ref('')
const selectedVillageId = ref('')

const fetchProvinces = async () => {
  try {
    const response = await axios.get('/api/regions/provinces')
    provinces.value = response.data
    
    if (getField('province')) {
      const found = provinces.value.find(p => p.name === getField('province'))
      if (found) {
        selectedProvinceId.value = found.id
        await fetchCities(found.id, true)
      }
    }
  } catch (error) {
    console.error('Error fetching provinces:', error)
  }
}

const fetchCities = async (provinceId, isInit = false) => {
  if (!provinceId) {
    cities.value = []
    return
  }
  try {
    const response = await axios.get(`/api/regions/regencies/${provinceId}`)
    cities.value = response.data
    
    if (isInit && getField('city')) {
      const found = cities.value.find(c => c.name === getField('city'))
      if (found) {
        selectedCityId.value = found.id
        await fetchDistricts(found.id, true)
      }
    }
  } catch (error) {
    console.error('Error fetching cities:', error)
  }
}

const fetchDistricts = async (cityId, isInit = false) => {
  if (!cityId) {
    districts.value = []
    return
  }
  try {
    const response = await axios.get(`/api/regions/districts/${cityId}`)
    districts.value = response.data
    
    if (isInit && getField('district')) {
      const found = districts.value.find(d => d.name === getField('district'))
      if (found) {
        selectedDistrictId.value = found.id
        await fetchVillages(found.id, true)
      }
    }
  } catch (error) {
    console.error('Error fetching districts:', error)
  }
}

const fetchVillages = async (districtId, isInit = false) => {
  if (!districtId) {
    villages.value = []
    return
  }
  try {
    const response = await axios.get(`/api/regions/villages/${districtId}`)
    villages.value = response.data
    
    if (isInit && getField('village')) {
      const found = villages.value.find(v => v.name === getField('village'))
      if (found) {
        selectedVillageId.value = found.id
      }
    }
  } catch (error) {
    console.error('Error fetching villages:', error)
  }
}

watch(selectedProvinceId, (newId) => {
  if (newId) {
    const prov = provinces.value.find(p => p.id === newId)
    if (prov) setField('province', prov.name)
    if (!isInitializing.value) {
      selectedCityId.value = ''
      selectedDistrictId.value = ''
      selectedVillageId.value = ''
      setField('city', '')
      setField('district', '')
      setField('village', '')
      fetchCities(newId)
    }
  } else {
    setField('province', '')
    cities.value = []
    districts.value = []
    villages.value = []
  }
  emit('update:modelValue', form)
})

watch(selectedCityId, (newId) => {
  if (newId) {
    const city = cities.value.find(c => c.id === newId)
    if (city) setField('city', city.name)
    if (!isInitializing.value) {
      selectedDistrictId.value = ''
      selectedVillageId.value = ''
      setField('district', '')
      setField('village', '')
      fetchDistricts(newId)
    }
  } else {
    setField('city', '')
    districts.value = []
    villages.value = []
  }
  emit('update:modelValue', form)
})

watch(selectedDistrictId, (newId) => {
  if (newId) {
    const dist = districts.value.find(d => d.id === newId)
    if (dist) setField('district', dist.name)
    if (!isInitializing.value) {
      selectedVillageId.value = ''
      setField('village', '')
      fetchVillages(newId)
    }
  } else {
    setField('district', '')
    villages.value = []
  }
  emit('update:modelValue', form)
})

watch(selectedVillageId, (newId) => {
  if (newId) {
    const vil = villages.value.find(v => v.id === newId)
    if (vil) setField('village', vil.name)
  } else {
    setField('village', '')
  }
  emit('update:modelValue', form)
})

onMounted(async () => {
  await fetchProvinces()
  isInitializing.value = false
})
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- Data Wilayah -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Provinsi -->
      <div class="space-y-2">
        <InputLabel for="province" value="Provinsi" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
        <div class="relative group">
          <SearchableSelect
            v-model="selectedProvinceId"
            :options="provinces"
            placeholder="Pilih Provinsi"
          >
            <template #icon>
              <Building class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            </template>
          </SearchableSelect>
        </div>
        <InputError class="mt-2" :message="getError('province')" />
      </div>

      <!-- Kabupaten/Kota -->
      <div class="space-y-2">
        <InputLabel for="city" value="Kabupaten / Kota" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
        <div class="relative group">
          <SearchableSelect
            v-model="selectedCityId"
            :options="cities"
            :disabled="!selectedProvinceId"
            placeholder="Pilih Kota/Kabupaten"
          >
            <template #icon>
              <Building class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            </template>
          </SearchableSelect>
        </div>
        <InputError class="mt-2" :message="getError('city')" />
      </div>

      <!-- Kecamatan -->
      <div class="space-y-2">
        <InputLabel for="district" value="Kecamatan" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
        <div class="relative group">
          <SearchableSelect
            v-model="selectedDistrictId"
            :options="districts"
            :disabled="!selectedCityId"
            placeholder="Pilih Kecamatan"
          >
            <template #icon>
              <Navigation class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            </template>
          </SearchableSelect>
        </div>
        <InputError class="mt-2" :message="getError('district')" />
      </div>

      <!-- Kelurahan/Desa -->
      <div class="space-y-2">
        <InputLabel for="village" value="Kelurahan / Desa" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
        <div class="relative group">
          <SearchableSelect
            v-model="selectedVillageId"
            :options="villages"
            :disabled="!selectedDistrictId"
            placeholder="Pilih Kelurahan/Desa"
          >
            <template #icon>
              <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            </template>
          </SearchableSelect>
        </div>
        <InputError class="mt-2" :message="getError('village')" />
      </div>
    </div>

    <!-- Patokan Lokasi -->
    <div class="space-y-2">
      <InputLabel for="landmark" value="Patokan Lokasi (Opsional)" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
      <div class="relative group">
        <TextInput
          id="landmark"
          type="text"
          class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
          :model-value="getField('landmark')"
          @update:model-value="(val) => setField('landmark', val)"
          autocomplete="off"
          placeholder="Contoh: Samping masjid agung, rumah cat biru pagar hitam"
          @input="emit('update:modelValue', form)"
        />
        <Building class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <InputError class="mt-2" :message="getError('landmark')" />
    </div>

    <!-- Alamat Lengkap -->
    <div class="space-y-2">
      <InputLabel for="address" value="Alamat Lengkap (Jalan, No Rumah, RT/RW)" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
      <div class="relative group">
        <TextInput
          id="address"
          type="text"
          class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
          :model-value="getField('address')"
          @update:model-value="(val) => setField('address', val)"
          autocomplete="address"
          placeholder="Contoh: Jl. Sudirman No. 123, RT 01/RW 02"
          @input="emit('update:modelValue', form)"
        />
        <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <InputError class="mt-2" :message="getError('address')" />
    </div>
  </div>
</template>
