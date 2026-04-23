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
import { Search, UserX, ShieldCheck, Mail, MapPin, ArrowUp, ArrowDown } from 'lucide-vue-next'
import debounce from 'lodash/debounce'

const props = defineProps({
  users: Object,
  filters: Object,
})

const searchTerm = ref(props.filters.search || '')
const filterRole = ref(props.filters.role || '')

const sortBy = ref(props.filters.sort_by || 'id')
const sortDir = ref(props.filters.sort_dir || 'asc')
const loading = ref(false)

const headers = [
  { text: "ID", value: "id", sortable: true },
  { text: "Pengguna", value: "name", sortable: true },
  { text: "Kontak & Lokasi", value: "contact" },
  { text: "Role", value: "role", sortable: true },
  { text: "Produk", value: "products_count", sortable: true },
  { text: "Status", value: "is_suspended", sortable: true },
  { text: "Aksi", value: "actions", width: 120 },
]

const performSearch = debounce(() => {
  router.get(route('admin.users.index'), { 
    search: searchTerm.value, 
    role: filterRole.value,
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

watch([searchTerm, filterRole], () => {
  performSearch()
})

const selectedUser = ref(null)
const isSuspendModalOpen = ref(false)
const suspendForm = useForm({
  suspension_reason: '',
})

const openSuspendModal = (user) => {
  selectedUser.value = user
  isSuspendModalOpen.value = true
}

const closeSuspendModal = () => {
  isSuspendModalOpen.value = false
  selectedUser.value = null
  suspendForm.reset()
}

const submitSuspension = () => {
  suspendForm.post(route('admin.users.suspend', selectedUser.value.id), {
    onSuccess: () => closeSuspendModal(),
  })
}

const unsuspend = (user) => {
  if (confirm(`Apakah Anda yakin ingin mencabut suspensi untuk ${user.name}?`)) {
    router.post(route('admin.users.unsuspend', user.id))
  }
}
</script>

<template>
  <Head title="Manajemen Pengguna" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 class="text-xl font-semibold leading-tight text-foreground">
          Manajemen Pengguna
        </h2>
        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <TextInput 
              v-model="searchTerm" 
              placeholder="Cari nama atau email..." 
              class="pl-9 h-10 w-full sm:w-64"
            />
          </div>
          <select 
            v-model="filterRole"
            class="h-10 rounded-xl border-border bg-card text-sm text-foreground focus:border-primary focus:ring-primary"
          >
            <option value="">Semua Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
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
                :items="users.data"
                :loading="loading"
                hide-footer
                border-cell
                buttons-pagination
                table-class-name="customize-table"
                header-class-name="customize-header"
              >
                <template #item-id="{ id }">
                  <span class="font-bold text-muted-foreground/70">#{{ id }}</span>
                </template>

                <template #item-name="{ name, email, profile }">
                  <div class="flex items-center gap-3 py-2">
                    <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 overflow-hidden border border-border shadow-sm">
                      <img v-if="profile?.avatar" :src="`/storage/${profile.avatar}`" class="h-full w-full object-cover" />
                      <template v-else>{{ name.charAt(0) }}</template>
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold truncate text-foreground">{{ name }}</p>
                      <p class="text-[10px] text-muted-foreground/80 truncate">{{ email }}</p>
                    </div>
                  </div>
                </template>

                <template #item-contact="{ email, profile }">
                  <div class="flex flex-col gap-1 text-[10px] py-2 text-muted-foreground">
                    <span class="flex items-center gap-1.5"><Mail class="h-3 w-3 text-primary/70" /> {{ email }}</span>
                    <span class="flex items-center gap-1.5"><MapPin class="h-3 w-3 text-primary/70" /> {{ profile?.city || 'Lokasi belum diset' }}</span>
                  </div>
                </template>

                <template #item-role="{ role }">
                  <div class="py-2">
                    <span class="text-xs font-black uppercase tracking-widest text-primary">{{ role }}</span>
                  </div>
                </template>

                <template #item-products_count="{ products_count }">
                  <div class="py-2">
                    <span class="text-[10px] font-bold text-muted-foreground">{{ products_count }} Produk</span>
                  </div>
                </template>

                <template #item-is_suspended="item">
                  <div v-if="item.is_suspended" class="flex flex-col gap-1 py-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      <UserX class="h-3 w-3" /> Suspended
                    </span>
                    <p class="text-[9px] text-red-500 max-w-[120px] truncate" :title="item.suspension_reason">Ket: {{ item.suspension_reason }}</p>
                  </div>
                  <span v-else class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck class="h-3 w-3" /> Aktif
                  </span>
                </template>

                <template #item-actions="item">
                  <div class="flex justify-end gap-2 py-2">
                    <button 
                      v-if="!item.is_suspended && item.role !== 'admin'"
                      @click="openSuspendModal(item)"
                      class="rounded-lg bg-red-500/10 p-2 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                      title="Suspend User"
                    >
                      <UserX class="h-4 w-4" />
                    </button>
                    <button 
                      v-if="item.is_suspended"
                      @click="unsuspend(item)"
                      class="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                      title="Cabut Suspensi"
                    >
                      <ShieldCheck class="h-4 w-4" />
                    </button>
                    <Link 
                      v-if="item.role === 'seller'"
                      :href="route('store.show', item.id)" 
                      class="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white transition-all"
                      title="Lihat Toko"
                    >
                      <Search class="h-4 w-4" />
                    </Link>
                  </div>
                </template>
              </EasyDataTable>
            </div>

            <!-- Pagination -->
            <div v-if="users.links.length > 3" class="mt-6 flex justify-center gap-1">
              <Link
                v-for="(link, k) in users.links"
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

    <!-- Suspend Modal -->
    <Modal :show="isSuspendModalOpen" @close="closeSuspendModal" maxWidth="md">
      <div class="p-6">
        <h2 class="text-lg font-bold text-foreground">
          Suspend Pengguna: {{ selectedUser?.name }}
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Pengguna yang disuspend tidak akan bisa login ke aplikasi.
        </p>

        <div class="mt-6">
          <InputLabel for="suspension_reason" value="Alasan Suspensi" />
          <textarea
            id="suspension_reason"
            v-model="suspendForm.suspension_reason"
            class="mt-1 block w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary"
            rows="3"
            placeholder="Misal: Pelanggaran syarat & ketentuan, indikasi penipuan, dsb."
            required
          ></textarea>
          <InputError class="mt-2" :message="suspendForm.errors.suspension_reason" />
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <SecondaryButton @click="closeSuspendModal">Batal</SecondaryButton>
          <DangerButton @click="submitSuspension" :disabled="suspendForm.processing">
            Suspend Sekarang
          </DangerButton>
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
  --easy-table-body-row-height: 60px;
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

.dark .customize-table {
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.3);
  --easy-table-border: 1px solid hsl(var(--border) / 0.3);
}
</style>
