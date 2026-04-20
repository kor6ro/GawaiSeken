<script setup>
import { ref, computed } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { MessageSquare, Search, X, CheckCheck, Check } from 'lucide-vue-next'

const props = defineProps({
  chats: Array,
})

const auth = usePage().props.auth
const searchQuery = ref('')

const getOpponent = (chat) => {
  return auth.user.id === chat.buyer_id ? chat.seller : chat.buyer
}

const getDisplayName = (chat) => {
  const opponent = getOpponent(chat)
  return opponent.profile?.store_name || opponent.name
}

const getDisplayAvatar = (chat) => {
  const opponent = getOpponent(chat)
  return opponent.profile?.avatar ? `/storage/${opponent.profile.avatar}` : null
}

const getInitial = (chat) => {
  return getDisplayName(chat).charAt(0).toUpperCase()
}

const getPreviewContent = (chat) => {
  const lastMessage = chat.messages[0]
  if (!lastMessage) return 'Belum ada percakapan'
  if (lastMessage.type === 'image') return '📷 Foto'
  return lastMessage.message
}

const isMine = (chat) => {
  return chat.messages[0]?.sender_id === auth.user.id
}

const isRead = (chat) => {
  return chat.messages[0]?.read_at != null
}

const formatTime = (chat) => {
  const lastMessage = chat.messages[0]
  if (!lastMessage) return ''
  const date = new Date(lastMessage.created_at)
  const now = new Date()
  const diff = now - date
  const oneDay = 24 * 60 * 60 * 1000

  if (diff < oneDay && now.getDate() === date.getDate()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  } else if (diff < oneDay * 2) {
    return 'Kemarin'
  } else if (diff < oneDay * 7) {
    return date.toLocaleDateString('id-ID', { weekday: 'short' })
  } else {
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' })
  }
}

// Color palette for avatars based on first letter
const avatarColors = [
  ['#FF6B35', '#FF8E53'],
  ['#6C63FF', '#9B93FF'],
  ['#00C9A7', '#00E5C0'],
  ['#FF3CAC', '#FF79C6'],
  ['#2196F3', '#42ABFF'],
  ['#FF9800', '#FFC947'],
  ['#4CAF50', '#76C442'],
]

const getAvatarGradient = (chat) => {
  const name = getDisplayName(chat)
  const idx = name.charCodeAt(0) % avatarColors.length
  const [c1, c2] = avatarColors[idx]
  return `linear-gradient(135deg, ${c1}, ${c2})`
}

const filteredChats = computed(() => {
  if (!searchQuery.value.trim()) return props.chats
  const q = searchQuery.value.toLowerCase()
  return props.chats.filter((chat) => {
    const name = getDisplayName(chat).toLowerCase()
    const preview = getPreviewContent(chat).toLowerCase()
    const product = (chat.product?.title || '').toLowerCase()
    return name.includes(q) || preview.includes(q) || product.includes(q)
  })
})
</script>

<template>
  <AppLayout>
    <Head title="Pesan" />

    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-black leading-tight text-foreground">Pesan</h2>
        <div class="flex items-center gap-2">
          <span
            class="flex h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
          ></span>
          <span class="text-sm font-semibold text-muted-foreground"
            >{{ props.chats.length }} Chat</span
          >
        </div>
      </div>
    </template>

    <div class="py-0 md:py-6">
      <div class="mx-auto max-w-2xl sm:px-4">
        <!-- Card wrapper -->
        <div class="chat-card">
          <!-- Search Bar -->
          <div class="chat-search-bar">
            <div class="relative">
              <Search
                class="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari percakapan..."
                class="w-full rounded-lg border border-transparent bg-muted/60 py-2 pl-10 pr-10 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-primary/20 focus:bg-muted focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Chat List -->
          <div class="chat-list-container">
            <!-- Empty State -->
            <div
              v-if="filteredChats.length === 0"
              class="flex flex-col items-center justify-center px-8 py-20 text-center"
            >
              <div class="relative mb-6">
                <div
                  class="absolute inset-0 scale-150 animate-pulse rounded-full bg-primary/20 opacity-50 blur-3xl"
                ></div>
                <div class="relative rounded-[2rem] border border-border bg-muted p-6 shadow-xl">
                  <MessageSquare class="h-12 w-12 text-primary" />
                </div>
              </div>
              <h3 class="mb-2 text-xl font-black text-foreground">
                {{ searchQuery ? 'Tidak ditemukan' : 'Belum ada percakapan' }}
              </h3>
              <p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {{
                  searchQuery
                    ? 'Coba kata kunci lain.'
                    : 'Temukan produk dan mulai mengobrol dengan penjual.'
                }}
              </p>
              <Link
                v-if="!searchQuery"
                :href="route('home')"
                class="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
              >
                Jelajahi Produk
              </Link>
            </div>

            <!-- Chat Items -->
            <div v-for="chat in filteredChats" :key="chat.id" class="chat-list-item">
              <Link :href="route('chat.show', chat.id)" class="chat-list-link">
                <!-- Avatar -->
                <div class="chat-avatar-wrap">
                  <img
                    v-if="getDisplayAvatar(chat)"
                    :src="getDisplayAvatar(chat)"
                    loading="lazy"
                    class="chat-avatar-img"
                  />
                  <div
                    v-else
                    class="chat-avatar-fallback"
                    :style="{ background: getAvatarGradient(chat) }"
                  >
                    {{ getInitial(chat) }}
                  </div>

                  <!-- Unread badge -->
                  <span v-if="chat.unread_count > 0" class="chat-unread-badge">
                    {{ chat.unread_count > 99 ? '99+' : chat.unread_count }}
                  </span>
                </div>

                <!-- Content -->
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 flex items-center justify-between">
                    <h3 class="chat-item-name" :class="chat.unread_count > 0 ? 'font-bold' : ''">
                      {{ getDisplayName(chat) }}
                    </h3>
                    <span
                      class="chat-item-time"
                      :class="
                        chat.unread_count > 0
                          ? 'font-semibold text-primary'
                          : 'text-muted-foreground'
                      "
                    >
                      {{ formatTime(chat) }}
                    </span>
                  </div>

                  <div class="flex min-w-0 items-center gap-1.5">
                    <!-- My message ticks -->
                    <template v-if="isMine(chat)">
                      <CheckCheck v-if="isRead(chat)" class="h-4 w-4 flex-shrink-0 text-primary" />
                      <CheckCheck v-else class="h-4 w-4 flex-shrink-0 text-muted-foreground/50" />
                    </template>

                    <p
                      class="chat-item-preview"
                      :class="
                        chat.unread_count > 0
                          ? 'font-medium text-foreground'
                          : 'text-muted-foreground'
                      "
                    >
                      {{ getPreviewContent(chat) }}
                    </p>
                  </div>

                  <!-- Product tag -->
                  <div v-if="chat.product?.title" class="mt-1">
                    <span class="chat-item-product"> 📦 {{ chat.product.title }} </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
/* ============================================
   CARD WRAPPER
   ============================================ */
.chat-card {
  overflow: hidden;
  border-radius: 0;
}
@media (min-width: 640px) {
  .chat-card {
    border-radius: 12px;
    border: 1px solid hsl(var(--border) / 0.4);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    background: hsl(var(--card));
  }
}

/* ============================================
   SEARCH BAR
   ============================================ */
.chat-search-bar {
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 30;
  background: hsl(var(--background) / 0.97);
  backdrop-filter: blur(16px);
}

/* ============================================
   CHAT LIST CONTAINER
   ============================================ */
.chat-list-container {
  background: hsl(var(--card));
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

/* ============================================
   CHAT LIST ITEMS
   ============================================ */
.chat-list-item {
  position: relative;
  border-bottom: 1px solid hsl(var(--border) / 0.3);
  transition: background 0.1s ease;
}
.chat-list-item:last-child {
  border-bottom: none;
}
.chat-list-item:active {
  transform: scale(0.995);
}

.chat-list-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  transition: background 0.12s ease;
}
.chat-list-link:hover {
  background: hsl(var(--muted) / 0.4);
}
.chat-list-link:active {
  background: hsl(var(--muted) / 0.6);
}

/* ============================================
   AVATAR — Fixed sizing, no stretch
   ============================================ */
.chat-avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
}

.chat-avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.chat-avatar-fallback {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 20px;
  line-height: 1;
}

.chat-unread-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-size: 10px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* ============================================
   CHAT ITEM TEXT
   ============================================ */
.chat-item-name {
  font-weight: 600;
  color: hsl(var(--foreground));
  font-size: 15px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item-time {
  font-size: 12px;
  margin-left: 8px;
  flex-shrink: 0;
  white-space: nowrap;
}

.chat-item-preview {
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item-product {
  font-size: 11px;
  color: hsl(var(--muted-foreground) / 0.7);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}
</style>
