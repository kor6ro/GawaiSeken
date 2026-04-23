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
import { Search, Trash2, Eye, CheckCircle, Ban, XCircle, ArrowUp, ArrowDown } from 'lucide-vue-next'
import debounce from 'lodash/debounce'

const props = defineProps({
  products: Object,
  filters: Object,
})

const searchTerm = ref(props.filters.search || '')
const filterStatus = ref(props.filters.status || '')

const sortBy = ref(props.filters.sort_by || 'id')
const sortDir = ref(props.filters.sort_dir || 'desc')
const loading = ref(false)

const headers = [
  { text: "ID", value: "id", sortable: true },
  { text: "Produk", value: "title", sortable: true },
  { text: "Seller / Pengguna", value: "user" },
  { text: "Status", value: "status", sortable: true },
  { text: "Aksi", value: "actions", width: 220 },
]

const performSearch = debounce(() => {
  router.get(route('admin.products.index'), { 
    search: searchTerm.value, 
    status: filterStatus.value,
    sort_by: sortBy.value,
    sort_dir: sortDir.value
  }, { 
    preserveState: true,
    replace: true
  })
}, 300)

const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDir.value = 'asc'
  }
  performSearch()
}

watch([searchTerm, filterStatus], () => {
  performSearch()
})

const selectedProduct = ref(null)
const isActionModalOpen = ref(false)
const actionType = ref('') // 'active', 'rejected', 'banned', 'delete'

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
  if (actionType.value === 'delete') {
    router.delete(route('admin.products.destroy', selectedProduct.value.id), {
      onSuccess: () => closeActionModal(),
    })
  } else {
    form.post(route('admin.products.update-status', selectedProduct.value.id), {
      onSuccess: () => closeActionModal(),
    })
  }
}
</script>

<template>
  <Head title="Manajemen Produk" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 class="text-xl font-semibold leading-tight text-foreground">
          Manajemen Produk
        </h2>
        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <TextInput 
              v-model="searchTerm" 
              placeholder="Cari judul atau seller..." 
              class="pl-9 h-10 w-full sm:w-64"
            />
          </div>
          <select 
            v-model="filterStatus"
            class="h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary"
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
            <div class="easy-table-wrapper">
              <EasyDataTable
                :headers="headers"
                :items="products.data"
                :loading="loading"
                hide-footer
                border-cell
                buttons-pagination
                table-class-name="customize-table"
                header-class-name="customize-header"
              >
                <template #item-id="{ id }">
                  <span class="text-[10px] text-muted-foreground font-bold">#{{ id }}</span>
                </template>

                <template #item-title="{ title, price, category, images }">
                  <div class="flex items-center gap-4 py-2">
                    <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
                      <img 
                        v-if="images.length" 
                        :src="'/storage/' + images[0].image_path" 
                        class="h-full w-full object-cover" 
                      />
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold text-sm leading-tight line-clamp-1 text-foreground">{{ title }}</p>
                      <p class="text-[10px] text-muted-foreground/80 mt-1 truncate">Rp {{ price.toLocaleString('id-ID') }} | {{ category?.name }}</p>
                    </div>
                  </div>
                </template>

                <template #item-user="{ user }">
                  <div class="flex items-center gap-2 py-2">
                    <div class="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                      {{ user.name.charAt(0) }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-xs font-medium truncate text-foreground">{{ user.name }}</p>
                      <p class="text-[9px] text-muted-foreground/80 truncate">{{ user.profile?.city || 'No City' }}</p>
                    </div>
                  </div>
                </template>

                <template #item-status="{ status }">
                  <span 
                    :class="{
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': status === 'pending',
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': status === 'active',
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': status === 'rejected' || status === 'banned',
                    }"
                    class="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  >
                    {{ status }}
                  </span>
                </template>

                <template #item-actions="item">
                  <div class="flex justify-end gap-1.5 py-2">
                    <Link 
                      :href="route('products.show', item.slug)" 
                      class="rounded-lg bg-muted p-2 text-muted-foreground hover:text-primary transition-all"
                      title="Lihat Detail"
                    >
                      <Eye class="h-4 w-4" />
                    </Link>
                    
                    <button 
                      v-if="item.status !== 'active'"
                      @click="openActionModal(item, 'active')"
                      class="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                      title="Setujui (Live)"
                    >
                      <CheckCircle class="h-4 w-4" />
                    </button>
                    
                    <button 
                      v-if="item.status === 'pending'"
                      @click="openActionModal(item, 'rejected')"
                      class="rounded-lg bg-amber-500/10 p-2 text-amber-600 hover:bg-amber-500 hover:text-white transition-all"
                      title="Tolak Produk"
                    >
                      <XCircle class="h-4 w-4" />
                    </button>

                    <button 
                      v-if="item.status === 'active'"
                      @click="openActionModal(item, 'banned')"
                      class="rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                      title="Ban Produk"
                    >
                      <Ban class="h-4 w-4" />
                    </button>

                    <button 
                      @click="openActionModal(item, 'delete')"
                      class="rounded-lg bg-red-600/10 p-2 text-red-700 hover:bg-red-700 hover:text-white transition-all"
                      title="Hapus Permanen"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </template>
              </EasyDataTable>
            </div>

            <!-- Pagination -->
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
          <template v-if="actionType === 'delete'">Hapus Produk Permanen</template>
          <template v-else-if="actionType === 'active'">Setujui Produk</template>
          <template v-else-if="actionType === 'rejected'">Tolak Produk</template>
          <template v-else-if="actionType === 'banned'">Ban Produk</template>
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Produk: <span class="font-semibold text-foreground">{{ selectedProduct?.title }}</span>
        </p>

        <div v-if="actionType === 'delete'" class="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          <p class="font-bold mb-1">Peringatan!</p>
          Tindakan ini akan menghapus produk dan semua gambarnya secara permanen dari server. Tindakan ini tidak dapat dibatalkan.
        </div>

        <div v-else-if="actionType !== 'active'" class="mt-6">
          <InputLabel for="moderation_note" value="Catatan Moderasi" />
          <textarea
            id="moderation_note"
            v-model="form.moderation_note"
            class="mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary"
            rows="3"
            placeholder="Berikan alasan agar seller tahu..."
            required
          ></textarea>
          <InputError class="mt-2" :message="form.errors.moderation_note" />
        </div>
        
        <div v-else class="mt-6">
          <p class="text-sm text-muted-foreground">Apakah Anda yakin ingin menyetujui produk ini agar tayang ke publik?</p>
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <SecondaryButton @click="closeActionModal">Batal</SecondaryButton>
          <DangerButton v-if="actionType !== 'active'" @click="submitAction" :disabled="form.processing">
            {{ actionType === 'delete' ? 'Hapus Sekarang' : 'Konfirmasi' }}
          </DangerButton>
          <PrimaryButton v-else @click="submitAction" :disabled="form.processing">
            Setujui Sekarang
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  </AuthenticatedLayout>
</template>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid hsl(var(--border));
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: hsl(var(--muted-foreground));
  --easy-table-header-background-color: hsl(var(--muted));
  
  --easy-table-body-row-font-size: 13px;
  --easy-table-body-font-color: hsl(var(--foreground));
  --easy-table-body-row-height: 70px;
  --easy-table-body-row-background-color: hsl(var(--card));
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.5);
  
  --easy-table-footer-background-color: hsl(var(--card));
  --easy-table-footer-font-color: hsl(var(--muted-foreground));
  --easy-table-footer-font-size: 12px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  border-radius: 12px;
  overflow: hidden;
}

:deep(.customize-header) {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.easy-table-wrapper {
  @apply rounded-xl overflow-hidden border border-border shadow-sm bg-card;
}

/* Dark mode specific overrides */
.dark .customize-table {
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.3);
}
</style>
