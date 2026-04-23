<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDown, Search } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Pilih opsi...'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const selectRef = ref(null)

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  return props.options.filter(option => 
    option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedOption = computed(() => {
  return props.options.find(option => option.id === props.modelValue)
})

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const selectOption = (option) => {
  emit('update:modelValue', option.id)
  isOpen.value = false
  searchQuery.value = ''
}

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="selectRef">
    <!-- Selected Value Display -->
    <button
      type="button"
      @click="toggleDropdown"
      :disabled="disabled"
      class="block w-full rounded-2xl border-transparent bg-muted/30 py-3 pl-11 pr-10 text-sm focus:border-primary focus:bg-background focus:ring-primary transition-all dark:bg-gray-900 disabled:opacity-50 text-left truncate"
      :class="{ 'ring-2 ring-primary bg-background': isOpen }"
    >
      <span v-if="selectedOption" class="text-foreground">{{ selectedOption.name }}</span>
      <span v-else class="text-muted-foreground">{{ placeholder }}</span>
      
      <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
    </button>

    <slot name="icon"></slot>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" class="absolute z-50 w-full mt-2 rounded-2xl bg-popover text-popover-foreground shadow-lg border border-border overflow-hidden ring-1 ring-black ring-opacity-5">
        <!-- Search Input -->
        <div class="p-2 border-b border-border bg-muted/30 relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            v-model="searchQuery"
            class="w-full bg-background border-transparent rounded-xl text-sm pl-9 pr-3 py-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Cari..."
            @click.stop
          />
        </div>
        
        <!-- Options List -->
        <ul class="max-h-60 overflow-auto py-1">
          <li v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-muted-foreground text-center">
            Tidak ditemukan
          </li>
          <li
            v-for="option in filteredOptions"
            :key="option.id"
            @click="selectOption(option)"
            class="px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
            :class="{ 'bg-primary/5 text-primary font-bold': modelValue === option.id }"
          >
            {{ option.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
