<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'
import BackButton from '@/Components/BackButton.vue'
import { Head, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import { ChevronLeft, User, Lock, Trash2, ShieldCheck, Mail, MapPin } from 'lucide-vue-next'

const props = defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  profile: {
    type: Object,
  },
})

const activeTab = ref('profile')
</script>

<template>
  <Head title="Pengaturan Profil" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center gap-3">
        <BackButton fallbackRoute="buyer.dashboard" />
        <h2 class="text-xl font-semibold leading-tight text-foreground">Pengaturan Akun</h2>
      </div>
    </template>

    <div class="py-6 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row gap-6 md:gap-8">
          <!-- Navigation (Mobile: Dropdown, Desktop: Sidebar) -->
          <aside class="w-full md:w-64">
            <!-- Mobile Select -->
            <div class="md:hidden">
              <div class="relative">
                <select
                  v-model="activeTab"
                  class="w-full rounded-2xl border-border bg-card py-3 pl-4 pr-10 text-sm font-bold text-foreground focus:border-primary focus:ring-primary shadow-sm"
                >
                  <option value="profile">Informasi Profil</option>
                  <option value="password">Keamanan & Sandi</option>
                  <option value="danger">Hapus Akun</option>
                </select>
              </div>
            </div>

            <!-- Desktop Sidebar -->
            <div class="hidden md:block space-y-2">
              <button
                @click="activeTab = 'profile'"
                :class="activeTab === 'profile' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
                class="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"
              >
                <User class="h-5 w-5" />
                Informasi Profil
              </button>
              <button
                @click="activeTab = 'password'"
                :class="activeTab === 'password' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
                class="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"
              >
                <Lock class="h-5 w-5" />
                Keamanan & Sandi
              </button>
              <button
                @click="activeTab = 'danger'"
                :class="activeTab === 'danger' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-red-500 hover:bg-red-50'"
                class="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200"
              >
                <Trash2 class="h-5 w-5" />
                Hapus Akun
              </button>
            </div>
          </aside>

          <!-- Content Area -->
          <main class="flex-1">
            <div class="overflow-hidden bg-card border border-border shadow-sm rounded-3xl sm:rounded-[2.5rem]">
              <div class="p-5 sm:p-10">
                <Transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="opacity-0 translate-y-4"
                  enter-to-class="opacity-100 translate-y-0"
                  mode="out-in"
                >
                  <div :key="activeTab">
                    <div v-if="activeTab === 'profile'">
                      <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        :profile="profile"
                      />
                    </div>

                    <div v-if="activeTab === 'password'">
                      <UpdatePasswordForm />
                    </div>

                    <div v-if="activeTab === 'danger'">
                      <DeleteUserForm />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

