<script setup>
import { ref, watch, computed } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Modal from '@/Components/Modal.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  files: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'cropped', 'finished'])

const currentIdx = ref(0)
const cropperRef = ref(null)
const currentImageUrl = ref('')

// Load image whenever index changes
const loadCurrentImage = () => {
  if (props.files && props.files[currentIdx.value]) {
    const file = props.files[currentIdx.value]
    const reader = new FileReader()
    reader.onload = (e) => {
      currentImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      currentIdx.value = 0
      loadCurrentImage()
    }
  }
)

watch(currentIdx, () => {
  loadCurrentImage()
})

const handleNext = () => {
  if (currentIdx.value < props.files.length - 1) {
    currentIdx.value++
  } else {
    emit('finished')
    emit('close')
  }
}

const crop = () => {
  const { canvas } = cropperRef.value.getResult()
  if (canvas) {
    const maxDim = 1080
    const tempCanvas = document.createElement('canvas')
    let width = canvas.width
    let height = canvas.height

    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height *= maxDim / width
        width = maxDim
      } else {
        width *= maxDim / height
        height = maxDim
      }
    }

    tempCanvas.width = width
    tempCanvas.height = height
    const ctx = tempCanvas.getContext('2d')
    ctx.drawImage(canvas, 0, 0, width, height)

    tempCanvas.toBlob(
      (blob) => {
        if (blob) {
          emit('cropped', {
            blob,
            originalFile: props.files[currentIdx.value],
          })
          handleNext()
        }
      },
      'image/jpeg',
      0.8
    )
  }
}

const skip = () => {
  handleNext()
}
</script>

<template>
  <Modal :show="show" @close="emit('close')" maxWidth="xl">
    <div class="p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-bold">
          Sesuaikan Foto
          <span v-if="files.length > 1" class="text-sm font-normal text-muted-foreground">
            ({{ currentIdx + 1 }} / {{ files.length }})
          </span>
        </h3>
        <p class="text-xs text-muted-foreground">Seret dan zoom untuk hasil 1:1</p>
      </div>

      <div class="overflow-hidden rounded-2xl border border-border bg-black/5 shadow-inner">
        <Cropper
          v-if="currentImageUrl"
          ref="cropperRef"
          class="h-[400px] w-full"
          :src="currentImageUrl"
          :stencil-props="{
            aspectRatio: 1 / 1,
          }"
          :canvas="{
            minHeight: 300,
            minWidth: 300,
            maxHeight: 2000,
            maxWidth: 2000,
          }"
        />
        <div v-else class="flex h-[400px] items-center justify-center italic text-muted-foreground">
          Memuat gambar...
        </div>
      </div>

      <div class="mt-8 flex items-center justify-end gap-3">
        <SecondaryButton @click="skip">
          {{ currentIdx < files.length - 1 ? 'Lewati' : 'Batal' }}
        </SecondaryButton>
        <PrimaryButton @click="crop" class="px-8">
          {{ currentIdx < files.length - 1 ? 'Lanjut' : 'Selesai & Simpan' }}
        </PrimaryButton>
      </div>
    </div>
  </Modal>
</template>

<style>
.vue-advanced-cropper {
  background: transparent !important;
}
.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  background: rgba(0, 0, 0, 0.7) !important;
}
</style>
