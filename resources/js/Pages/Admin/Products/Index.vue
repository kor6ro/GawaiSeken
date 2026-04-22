<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, useForm, router } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import Modal from '@/Components/Modal.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
  products: {
    type: Object,
  },
  filters: {
    type: Object,
  },
})

const selectedProduct = ref(null)
const isActionModalOpen = ref(false)
const actionType = ref('') // 'active', 'rejected', 'banned'

const form = useForm({
  status: '',
  moderation_note: '',
})

const openActionModal = (product, type) => {
  selectedProduct.value = product
  actionType.value = type
  form.status = type
  form.moderation_note = product.moderation_note || ''
  isActionModalOpen.value = true
}

const closeActionModal = () => {
  isActionModalOpen.value = false
  selectedProduct.value = null
  form.reset()
}

const submitAction = () => {
  form.post(route('admin.products.update-status', selectedProduct.value.id), {
    onSuccess: () => closeActionModal(),
  })
}

const filterStatus = ref(props.filters.status || '')

watch(filterStatus, (value) => {
  router.get(route('admin.products.index'), { status: value }, { preserveState: true })
})
</script>

<template>
  <Head title="Manajemen Produk" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold leading-tight text-foreground">
          Manajemen Produk
        </h2>
        <div class="flex items-center gap-4">
          <select 
            v-model="filterStatus"
            class="rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary dark:bg-gray-900"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl">
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-foreground">
                <thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
                  <tr>
                    <th class="px-6 py-4">Produk</th>
                    <th class="px-6 py-4">Seller</th>
                    <th class="px-6 py-4">Harga</th>
                    <th class="px-6 py-4">Status</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr v-for="product in products.data" :key="product.id" class="hover:bg-muted/50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <img 
                          v-if="product.images.length" 
                          :src="'/storage/' + product.images[0].image_path" 
                          class="h-10 w-10 rounded-lg object-cover bg-muted" 
                        />
                        <div v-else class="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                          No Img
                        </div>
                        <div>
                          <p class="font-medium line-clamp-1">{{ product.title }}</p>
                          <p class="text-xs text-muted-foreground">{{ product.category?.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">{{ product.user.name }}</td>
                    <td class="px-6 py-4">Rp {{ product.price.toLocaleString('id-ID') }}</td>
                    <td class="px-6 py-4">
                      <span 
                        :class="{
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': product.status === 'pending',
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': product.status === 'active',
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': product.status === 'rejected' || product.status === 'banned',
                        }"
                        class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {{ product.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex justify-end gap-2">
                        <Link 
                          :href="route('products.show', product.slug)" 
                          class="rounded-lg bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80"
                        >
                          Lihat
                        </Link>
                        <button 
                          v-if="product.status !== 'active'"
                          @click="openActionModal(product, 'active')"
                          class="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button 
                          v-if="product.status === 'pending'"
                          @click="openActionModal(product, 'rejected')"
                          class="rounded-lg bg-orange-600 px-3 py-1 text-xs font-medium text-white hover:bg-orange-700"
                        >
                          Reject
                        </button>
                        <button 
                          v-if="product.status === 'active'"
                          @click="openActionModal(product, 'banned')"
                          class="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                        >
                          Ban
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="products.data.length === 0">
                    <td colspan="5" class="px-6 py-8 text-center text-muted-foreground italic">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Simple -->
            <div v-if="products.links.length > 3" class="mt-6 flex justify-center gap-1">
              <Link
                v-for="(link, k) in products.links"
                :key="k"
                :href="link.url || '#'"
                v-html="link.label"
                class="rounded-lg px-3 py-1 text-sm transition-colors"
                :class="{
                  'bg-primary text-primary-foreground font-bold': link.active,
                  'hover:bg-muted text-muted-foreground': !link.active && link.url,
                  'opacity-50 cursor-not-allowed': !link.url
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Modal -->
    <Modal :show="isActionModalOpen" @close="closeActionModal" maxWidth="md">
      <div class="p-6">
        <h2 class="text-lg font-bold text-foreground">
          {{ actionType === 'active' ? 'Setujui Produk' : (actionType === 'rejected' ? 'Tolak Produk' : 'Ban Produk') }}
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Produk: <span class="font-semibold text-foreground">{{ selectedProduct?.title }}</span>
        </p>

        <div v-if="actionType !== 'active'" class="mt-6">
          <InputLabel for="moderation_note" value="Catatan Moderasi" />
          <TextInput
            id="moderation_note"
            type="text"
            class="mt-1 block w-full"
            v-model="form.moderation_note"
            placeholder="Berikan alasan agar seller tahu..."
            required
            autofocus
          />
          <InputError class="mt-2" :message="form.errors.moderation_note" />
        </div>
        <div v-else class="mt-6">
          <p class="text-sm text-muted-foreground">Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?</p>
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <SecondaryButton @click="closeActionModal">Batal</SecondaryButton>
          <DangerButton v-if="actionType !== 'active'" @click="submitAction" :disabled="form.processing">
            Konfirmasi
          </DangerButton>
          <PrimaryButton v-else @click="submitAction" :disabled="form.processing">
            Setujui Sekarang
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  </AuthenticatedLayout>
</template>
