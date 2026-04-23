<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import axios from 'axios'
const props = defineProps({
  chat: Object,
  isNewChat: Boolean,
  contextProduct: Object,
})

import {
  ChevronLeft,
  ImageIcon,
  Send,
  X,
  Package,
  CheckCheck,
  Clock,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Download,
  AlertTriangle,
  Gavel,
  ShoppingCart,
  ChevronDown,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'

import { onlineUserIds, setupOnlinePresence } from '@/onlineState'
import { isDark } from '@/themeState'

const auth = usePage().props.auth
const messages = ref(props.chat.messages || [])
const newMessage = ref('')
const isTyping = ref(false)
const isOpponentOnline = computed(() =>
  opponent.value ? onlineUserIds.value.includes(Number(opponent.value.id)) : false
)
const lightboxUrl = ref(null)
const chatId = ref(props.isNewChat ? `product-${props.chat.product_id}` : props.chat.id)
const currentIsNewChat = ref(props.isNewChat)

// Context Product State
const showProductContext = ref(!!props.contextProduct)
const isContextMinimized = ref(false)

// Negotiation Modal State
const showNegoModal = ref(false)
const negoPrice = ref(props.contextProduct?.price || 0)
const negoMessage = ref('')
const isSubmittingNego = ref(false)

// Purchase Modal State
const showBuyModal = ref(false)
const isSubmittingBuy = ref(false)

// Notification State
const notification = ref(null)
const showNotification = (type, message) => {
  notification.value = { type, message }
  setTimeout(() => {
    notification.value = null
  }, 4000)
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const toggleProductContext = () => {
  isContextMinimized.value = !isContextMinimized.value
}

const startNego = () => {
  if (!props.contextProduct?.is_negotiable) {
    showNotification('error', 'Produk ini tidak dapat dinegosiasi.')
    return
  }
  showNegoModal.value = true
}

const submitNego = async () => {
  if (isSubmittingNego.value) return
  isSubmittingNego.value = true
  try {
    await axios.post(route('negotiations.store', props.contextProduct.slug), {
      proposed_price: negoPrice.value,
      message: negoMessage.value
    })
    
    // Also send a message to the chat
    newMessage.value = `Saya mengajukan penawaran untuk "${props.contextProduct.title}" seharga Rp ${formatNumber(negoPrice.value)}.`
    await sendMessage()
    
    showNegoModal.value = false
    showNotification('success', 'Penawaran berhasil dikirim!')
  } catch (e) {
    showNotification('error', e.response?.data?.message || 'Gagal mengirim penawaran.')
  } finally {
    isSubmittingNego.value = false
  }
}

const startTransaction = () => {
  if (!props.contextProduct) return
  showBuyModal.value = true
}

const confirmTransaction = () => {
  if (isSubmittingBuy.value) return
  isSubmittingBuy.value = true
  
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = route('transactions.checkout', props.contextProduct.slug)
  
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  if (csrfToken) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = '_token'
    input.value = csrfToken
    form.appendChild(input)
  }
  
  document.body.appendChild(form)
  form.submit()
}


const chatContainer = ref(null)
const messagesEnd = ref(null)
const fileInput = ref(null)
const messageInput = ref(null)

const opponent = computed(() =>
  auth.user.id === props.chat.buyer_id ? props.chat.seller : props.chat.buyer
)
const oppName = computed(() => opponent.value.profile?.store_name || opponent.value.name)
const oppAvatar = computed(() => {
  if (opponent.value.role === 'seller' && opponent.value.profile?.store_logo) {
    return `/storage/${opponent.value.profile.store_logo}`
  }
  return opponent.value.profile?.avatar ? `/storage/${opponent.value.profile.avatar}` : null
})
const oppInitial = computed(() => oppName.value.charAt(0).toUpperCase())

const product = props.chat.product
const productImage = product?.images?.[0]?.image_path

// Color palette for avatars
const avatarColors = [
  ['#FF6B35', '#FF8E53'],
  ['#6C63FF', '#9B93FF'],
  ['#00C9A7', '#00E5C0'],
  ['#FF3CAC', '#FF79C6'],
  ['#2196F3', '#42ABFF'],
  ['#FF9800', '#FFC947'],
  ['#4CAF50', '#76C442'],
]
const oppAvatarGradient = computed(() => {
  const idx = oppName.value.charCodeAt(0) % avatarColors.length
  const [c1, c2] = avatarColors[idx]
  return `linear-gradient(135deg, ${c1}, ${c2})`
})

const scrollToBottom = (behavior = 'smooth') => {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollIntoView({ behavior, block: 'end' })
    }
  })
}

// Watch for new messages and auto-scroll
watch(
  () => messages.value.length,
  () => {
    scrollToBottom()
  }
)

const formatTime = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

const formatDate = (d) => {
  if (!d) return ''
  const date = new Date(d)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Hari Ini'
  if (date.toDateString() === yesterday.toDateString()) return 'Kemarin'
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const showDateSeparator = (index) => {
  if (index === 0) return true
  return (
    new Date(messages.value[index].created_at).toDateString() !==
    new Date(messages.value[index - 1].created_at).toDateString()
  )
}

let typingTimeout = null
let lastTypingWhisper = 0

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const handleTyping = () => {
  resizeTextarea()
  if (window.Echo && !currentIsNewChat.value && newMessage.value.trim().length > 0) {
    const now = Date.now()
    if (now - lastTypingWhisper > 2000) {
      lastTypingWhisper = now
      window.Echo.join(`chat.${chatId.value}`).whisper('typing', { name: 'user' })
    }
  }
}

const resizeTextarea = () => {
  if (messageInput.value) {
    messageInput.value.style.height = 'auto'
    messageInput.value.style.height = Math.min(messageInput.value.scrollHeight, 120) + 'px'
  }
}

const setupEcho = () => {
  if (!window.Echo) return

  window.Echo.join(`chat.${chatId.value}`)
    .here((users) => {
      // We use global presence for online status now
    })
    .joining((user) => {
      // We use global presence for online status now
    })
    .leaving((user) => {
      // We use global presence for online status now
    })
    .listen('MessageSent', (e) => {
      if (e.message.sender_id !== auth.user.id) {
        messages.value.push(e.message)
        scrollToBottom()
        axios.post(route('chat.read', chatId.value))
      }
    })
    .listen('MessageRead', () => {
      messages.value.forEach((m) => {
        if (m.sender_id === auth.user.id && !m.read_at) {
          m.read_at = new Date().toISOString()
        }
      })
    })
    .listenForWhisper('typing', () => {
      isTyping.value = true
      if (typingTimeout) clearTimeout(typingTimeout)
      typingTimeout = setTimeout(() => {
        isTyping.value = false
      }, 3000)
    })
}

const sendMessage = async () => {
  const text = newMessage.value.trim()
  if (!text) return

  const tempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
  const tempMsg = {
    temp_id: tempId,
    id: null,
    sender_id: auth.user.id,
    type: 'text',
    message: text,
    created_at: new Date().toISOString(),
    status: 'sending',
  }

  messages.value.push(tempMsg)

  newMessage.value = ''
  resizeTextarea()
  scrollToBottom()

  try {
    const { data } = await axios.post(route('chat.store', chatId.value), { 
      message: text,
      product_id: props.contextProduct?.id 
    })

    if (currentIsNewChat.value) {
      currentIsNewChat.value = false
      chatId.value = data.id
      setupEcho()
      window.history.replaceState(null, '', route('chat.show', data.id))
    }

    const idx = messages.value.findIndex((m) => m.temp_id === tempId)
    if (idx !== -1) {
      messages.value[idx] = { ...data, status: 'sent' }
    }
  } catch (e) {
    console.error('Send failed:', e)
    const idx = messages.value.findIndex((m) => m.temp_id === tempId)
    if (idx !== -1) {
      messages.value[idx].status = 'error'
    }
  }
}

const sendImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const tempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
  const localUrl = URL.createObjectURL(file)

  messages.value.push({
    temp_id: tempId,
    id: null,
    sender_id: auth.user.id,
    type: 'image',
    image_url: localUrl,
    created_at: new Date().toISOString(),
    status: 'sending',
  })
  scrollToBottom()

  const fd = new FormData()
  fd.append('image', file)
  if (props.contextProduct?.id) {
    fd.append('product_id', props.contextProduct.id)
  }
  if (fileInput.value) fileInput.value.value = ''

  try {
    const { data } = await axios.post(route('chat.image', chatId.value), fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (currentIsNewChat.value) {
      currentIsNewChat.value = false
      chatId.value = data.id
      setupEcho()
      window.history.replaceState(null, '', route('chat.show', data.id))
    }

    const idx = messages.value.findIndex((m) => m.temp_id === tempId)
    if (idx !== -1) {
      messages.value[idx] = { ...data, status: 'sent' }
    }
  } catch (e) {
    console.error('Image upload failed:', e)
    const idx = messages.value.findIndex((m) => m.temp_id === tempId)
    if (idx !== -1) {
      messages.value[idx].status = 'error'
    }
  }
}

const openLightbox = (url) => {
  lightboxUrl.value = url
}

const downloadImage = (url) => {
  const a = document.createElement('a')
  a.href = url
  a.download = 'image'
  a.click()
}

onMounted(() => {
  scrollToBottom('auto')
  const checkEcho = setInterval(() => {
    if (window.Echo) {
      clearInterval(checkEcho)
      setupOnlinePresence()
      if (!currentIsNewChat.value) {
        setupEcho()
      }
    }
  }, 100)
  setTimeout(() => clearInterval(checkEcho), 5000)
})

onUnmounted(() => {
  if (window.Echo && !currentIsNewChat.value) {
    window.Echo.leave(`chat.${chatId.value}`)
  }
})
</script>

<template>
  <!-- Standalone full-screen layout (no AppLayout wrapper) -->
  <div class="chat-view-root">
    <Head :title="oppName" />

    <!-- ===================== HEADER ===================== -->
    <header class="chat-header">
      <!-- Back button -->
      <Link :href="route('chat.index')" class="chat-header-back">
        <ChevronLeft class="h-5 w-5" />
      </Link>

      <!-- Opponent info -->
      <component 
        :is="opponent.id ? Link : 'div'"
        :href="opponent.id ? route('store.show', opponent.id) : null" 
        class="chat-header-info"
      >
        <!-- Avatar -->
        <div class="chat-header-avatar-wrap">
          <img v-if="oppAvatar" :src="oppAvatar" loading="lazy" class="chat-header-avatar" />
          <div
            v-else
            class="chat-header-avatar-fallback"
            :style="{ background: oppAvatarGradient }"
          >
            {{ oppInitial }}
          </div>
          <span v-if="isOpponentOnline" class="chat-header-online-dot"></span>
        </div>

        <!-- Name + status -->
        <div class="min-w-0 flex-1">
          <h3 class="chat-header-name">{{ oppName }}</h3>
          <p
            class="chat-header-status"
            :class="
              isTyping
                ? 'text-primary'
                : isOpponentOnline
                  ? 'text-green-500'
                  : 'text-muted-foreground'
            "
          >
            <span v-if="isTyping" class="flex items-center gap-1">
              <span class="typing-dots"> <span></span><span></span><span></span> </span>
              sedang mengetik...
            </span>
            <span v-else-if="isOpponentOnline">Online</span>
            <span v-else>{{ auth.user.id === chat.buyer_id ? 'Penjual' : 'Pembeli' }}</span>
          </p>
        </div>
      </component>

      <!-- Empty right space for balance -->
      <div class="w-9 flex-shrink-0"></div>
    </header>
    
    <!-- ===================== PRODUCT CONTEXT BAR ===================== -->
    <transition name="context-slide">
      <div v-if="contextProduct && showProductContext" class="product-context-bar" :class="{ 'is-minimized': isContextMinimized }">
        <div class="product-context-content">
          <div class="product-context-main" @click="toggleProductContext">
            <div class="product-context-img">
              <img v-if="contextProduct.images?.[0]?.image_path" :src="'/storage/' + contextProduct.images[0].image_path" loading="lazy" />
              <div v-else class="flex h-full w-full items-center justify-center bg-muted">
                <Package class="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div class="product-context-info">
              <h4 class="product-context-title">{{ contextProduct.title }}</h4>
              <p class="product-context-price">Rp {{ formatNumber(contextProduct.price) }}</p>
            </div>
            <button class="product-context-toggle">
              <ChevronDown class="h-4 w-4 transition-transform duration-300" :class="{ 'rotate-180': isContextMinimized }" />
            </button>
          </div>

          <div v-if="!isContextMinimized" class="product-context-actions">
            <button 
              v-if="auth.user.id !== contextProduct.user_id && contextProduct.is_negotiable" 
              @click="startNego" 
              class="context-btn context-btn-nego"
            >
              <Gavel class="h-3.5 w-3.5" />
              Nego
            </button>
            <button 
              v-if="auth.user.id !== contextProduct.user_id" 
              @click="startTransaction" 
              class="context-btn context-btn-buy"
            >
              <ShoppingCart class="h-3.5 w-3.5" />
              Beli
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ===================== MESSAGES ===================== -->
    <main
      ref="chatContainer"
      class="chat-messages-area"
      :style="{ backgroundColor: isDark ? '#0b141a' : '#eae6df' }"
    >
      <!-- Subtle pattern overlay -->
      <div class="chat-pattern-overlay"></div>

      <div class="chat-messages-inner">
        <!-- Top spacer to push messages to bottom -->
        <div class="flex-grow"></div>

        <template v-for="(msg, index) in messages" :key="msg.id || msg.temp_id">
          <!-- Date pill separator -->
          <div v-if="showDateSeparator(index)" class="chat-date-separator">
            <span class="chat-date-pill">{{ formatDate(msg.created_at) }}</span>
          </div>

          <!-- MESSAGE ROW -->
          <div
            class="chat-msg-row"
            :class="msg.sender_id === auth.user.id ? 'justify-end' : 'justify-start'"
          >
            <!-- IMAGE BUBBLE -->
            <div
              v-if="msg.type === 'image'"
              class="chat-bubble-image"
              :class="
                msg.sender_id === auth.user.id
                  ? 'chat-bubble-image--mine'
                  : 'chat-bubble-image--theirs'
              "
              @click="openLightbox(msg.image_url)"
            >
              <img :src="msg.image_url" loading="lazy" class="chat-bubble-image-content" />

              <!-- Sending overlay -->
              <div v-if="msg.status === 'sending'" class="chat-bubble-sending-overlay">
                <div class="uploading-spinner"></div>
              </div>

              <!-- Error overlay -->
              <div v-if="msg.status === 'error'" class="chat-bubble-sending-overlay bg-red-500/20">
                <AlertTriangle class="h-8 w-8 text-white" />
              </div>

              <!-- Bottom meta strip -->
              <div class="chat-bubble-image-meta">
                <span class="text-[10px] font-medium text-white/90">{{
                  formatTime(msg.created_at)
                }}</span>
                <template v-if="msg.sender_id === auth.user.id">
                  <CheckCheck
                    v-if="msg.status !== 'sending' && msg.status !== 'error' && msg.read_at"
                    class="h-3.5 w-3.5 text-blue-300"
                  />
                  <CheckCheck
                    v-else-if="msg.status !== 'sending' && msg.status !== 'error'"
                    class="h-3.5 w-3.5 text-white/60"
                  />
                  <Clock
                    v-else-if="msg.status === 'sending'"
                    class="h-3 w-3 animate-spin text-white/60"
                  />
                  <AlertTriangle v-else class="h-3.5 w-3.5 text-red-400" />
                </template>
              </div>
            </div>

            <!-- TEXT BUBBLE -->
            <div
              v-else
              class="chat-bubble"
              :class="msg.sender_id === auth.user.id ? 'chat-bubble--mine' : 'chat-bubble--theirs'"
            >
              <p class="chat-bubble-text">{{ msg.message }}</p>

              <!-- Time + ticks -->
              <div class="chat-bubble-meta">
                <span
                  class="chat-bubble-time"
                  :class="
                    msg.sender_id === auth.user.id
                      ? 'text-white/60'
                      : 'text-slate-500 dark:text-slate-400'
                  "
                  >{{ formatTime(msg.created_at) }}</span
                >
                <template v-if="msg.sender_id === auth.user.id">
                  <Clock
                    v-if="msg.status === 'sending'"
                    class="h-3 w-3 animate-spin text-white/50"
                  />
                  <CheckCheck v-else-if="msg.read_at" class="h-3.5 w-3.5 text-blue-300" />
                  <AlertTriangle
                    v-else-if="msg.status === 'error'"
                    class="h-3.5 w-3.5 text-red-400"
                  />
                  <CheckCheck v-else class="h-3.5 w-3.5 text-white/50" />
                </template>
              </div>
            </div>
          </div>
        </template>

        <!-- Typing indicator bubble -->
        <transition name="typing-fade">
          <div v-if="isTyping" class="chat-msg-row justify-start">
            <div class="chat-bubble chat-bubble--theirs">
              <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
          </div>
        </transition>

        <!-- Scroll anchor -->
        <div ref="messagesEnd" class="h-px"></div>
      </div>
    </main>

    <!-- ===================== INPUT ===================== -->
    <footer class="chat-input-bar">
      <div class="chat-input-inner">
        <!-- Image attach button -->
        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="sendImage" />
        <button type="button" @click="fileInput.click()" class="chat-input-attach">
          <ImageIcon class="h-5 w-5" />
        </button>

        <!-- Message input -->
        <div class="chat-input-field-wrap">
          <textarea
            v-model="newMessage"
            ref="messageInput"
            @keydown="handleKeyDown"
            @input="handleTyping"
            class="chat-input-field"
            placeholder="Ketik pesan..."
            rows="1"
          ></textarea>
        </div>

        <!-- Send button -->
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="chat-send-btn"
          :class="newMessage.trim() ? 'chat-send-btn--active' : 'chat-send-btn--disabled'"
        >
          <Send class="h-5 w-5" />
        </button>
      </div>
    </footer>

    <!-- ===================== LIGHTBOX ===================== -->
    <Teleport to="body">
      <transition name="lightbox-fade">
        <div
          v-if="lightboxUrl"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          @click.self="lightboxUrl = null"
        >
          <!-- Controls -->
          <div class="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4">
            <button
              @click="lightboxUrl = null"
              class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90"
            >
              <X class="h-5 w-5" />
            </button>
            <button
              @click="downloadImage(lightboxUrl)"
              class="rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 active:scale-90"
            >
              <Download class="h-5 w-5" />
            </button>
          </div>

          <img
            :src="lightboxUrl"
            class="max-h-[88vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      </transition>
    </Teleport>

    <!-- ===================== NEGO MODAL ===================== -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showNegoModal" class="modal-overlay" @click.self="showNegoModal = false">
          <div class="modal-card">
            <div class="modal-header">
              <h3 class="modal-title">Tawar Produk</h3>
              <button @click="showNegoModal = false" class="modal-close">
                <X class="h-5 w-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="flex items-center gap-4 mb-6 p-3 bg-muted/30 rounded-xl border border-border/50">
                <img :src="'/storage/' + contextProduct.images[0].image_path" class="h-16 w-16 rounded-lg object-cover shadow-sm" />
                <div>
                  <h4 class="font-semibold text-sm line-clamp-1">{{ contextProduct.title }}</h4>
                  <p class="text-xs text-muted-foreground mb-1">Harga Asli: Rp {{ formatNumber(contextProduct.price) }}</p>
                  <p class="text-xs font-bold text-primary">Penawaran Anda:</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Harga yang ditawarkan (Rp)</label>
                  <div class="relative">
                    <span class="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">Rp</span>
                    <input 
                      v-model="negoPrice" 
                      type="number" 
                      class="modal-input"
                      style="padding-left: 60px !important;"
                      placeholder="Masukkan harga..."
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Pesan untuk Penjual (Opsional)</label>
                  <textarea 
                    v-model="negoMessage" 
                    class="modal-input min-h-[100px] py-3" 
                    placeholder="Contoh: Boleh kurang dikit gan? Masih pelajar..."
                  ></textarea>
                </div>

                <div class="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <Info class="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p class="text-[11px] text-amber-700 dark:text-amber-400">
                    Penawaran berlaku selama 24 jam. Penjual dapat menerima, menolak, atau memberikan penawaran balik.
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="showNegoModal = false" class="modal-btn-secondary">Batal</button>
              <button 
                @click="submitNego" 
                :disabled="isSubmittingNego || !negoPrice || negoPrice >= contextProduct.price" 
                class="modal-btn-primary"
              >
                <template v-if="isSubmittingNego">
                  <div class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Mengirim...
                </template>
                <template v-else>
                  Kirim Penawaran
                </template>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ===================== BUY MODAL ===================== -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showBuyModal" class="modal-overlay" @click.self="showBuyModal = false">
          <div class="modal-card">
            <div class="modal-header">
              <h3 class="modal-title">Konfirmasi Pembelian</h3>
              <button @click="showBuyModal = false" class="modal-close">
                <X class="h-5 w-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <ShoppingCart class="h-8 w-8" />
                </div>
                <h4 class="text-lg font-bold">Lanjutkan ke Pembayaran?</h4>
                <p class="text-sm text-muted-foreground">Anda akan diarahkan ke halaman pembayaran untuk menyelesaikan transaksi ini.</p>
              </div>

              <div class="p-4 bg-muted/30 rounded-2xl border border-border/50">
                <div class="flex gap-4 items-center">
                  <img :src="'/storage/' + contextProduct.images[0].image_path" class="h-16 w-16 rounded-xl object-cover" />
                  <div class="min-w-0">
                    <h5 class="font-semibold text-sm truncate">{{ contextProduct.title }}</h5>
                    <p class="text-primary font-black">Rp {{ formatNumber(contextProduct.price) }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex items-start gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Info class="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p class="text-[11px] text-blue-700 dark:text-blue-400">
                  Pembayaran Anda akan ditahan oleh sistem GawaiSeken sampai Anda menerima barang dengan aman.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="showBuyModal = false" class="modal-btn-secondary">Batal</button>
              <button 
                @click="confirmTransaction" 
                :disabled="isSubmittingBuy" 
                class="modal-btn-primary"
              >
                <template v-if="isSubmittingBuy">
                  <div class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </template>
                <template v-else>
                  Beli Sekarang
                </template>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ===================== TOAST NOTIFICATION ===================== -->
    <Teleport to="body">
      <transition name="toast-fade">
        <div v-if="notification" class="toast-container" :class="notification.type">
          <div class="toast-icon">
            <CheckCircle v-if="notification.type === 'success'" class="h-5 w-5" />
            <AlertCircle v-else class="h-5 w-5" />
          </div>
          <div class="toast-message">{{ notification.message }}</div>
          <button @click="notification = null" class="toast-close">
            <X class="h-4 w-4" />
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ============================================
   ROOT LAYOUT — Full viewport, flex column
   ============================================ */
.chat-view-root {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  position: relative;
}

/* ============================================
   HEADER — Compact WhatsApp-like
   ============================================ */
.chat-header {
  flex: none;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: hsl(var(--background) / 0.97);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid hsl(var(--border) / 0.5);
}

.chat-header-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: hsl(var(--muted-foreground));
  flex-shrink: 0;
  transition: background 0.15s;
}
.chat-header-back:hover {
  background: hsl(var(--muted));
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  padding: 4px 6px;
  border-radius: 10px;
  transition: background 0.15s;
}
.chat-header-info:hover {
  background: hsl(var(--muted) / 0.3);
}

.chat-header-avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
}
.chat-header-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
.chat-header-avatar-fallback {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 15px;
}
.chat-header-online-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid hsl(var(--background));
}

.chat-header-name {
  font-weight: 600;
  font-size: 15px;
  color: hsl(var(--foreground));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}
.chat-header-status {
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}

.chat-header-product {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid hsl(var(--border) / 0.5);
  flex-shrink: 0;
  transition: box-shadow 0.15s;
}
.chat-header-product:hover {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.3);
}

/* ============================================
   MESSAGES AREA
   ============================================ */
.chat-messages-area {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.chat-pattern-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  z-index: 0;
}

.chat-messages-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 8px 12px 4px;
}

/* ============================================
   DATE SEPARATOR
   ============================================ */
.chat-date-separator {
  display: flex;
  justify-content: center;
  margin: 12px 0 8px;
  position: sticky;
  top: 8px;
  z-index: 5;
}
.chat-date-pill {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  color: #54656f;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.dark .chat-date-pill {
  background: rgba(30, 42, 54, 0.9);
  color: #8696a0;
}

/* ============================================
   MESSAGE ROW
   ============================================ */
.chat-msg-row {
  display: flex;
  margin-bottom: 2px;
  padding: 0 4px;
  animation: msgSlideIn 0.15s ease-out both;
}

@keyframes msgSlideIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   TEXT BUBBLE — WhatsApp style
   ============================================ */
.chat-bubble {
  max-width: 75%;
  border-radius: 10px;
  position: relative;
  word-break: break-word;
}
@media (min-width: 768px) {
  .chat-bubble {
    max-width: 55%;
  }
}

.chat-bubble--mine {
  background: #005c4b;
  color: #e9edef;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 3px;
  margin-left: auto;
}
.dark .chat-bubble--mine {
  background: #005c4b;
}

.chat-bubble--theirs {
  background: #ffffff;
  color: #111b21;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
}
.dark .chat-bubble--theirs {
  background: #1f2c34;
  color: #e9edef;
}

.chat-bubble-text {
  font-size: 14.5px;
  line-height: 1.45;
  padding: 6px 8px 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
}

.chat-bubble-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  padding: 0 6px 4px;
  margin-top: 1px;
}

.chat-bubble-time {
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
}

/* ============================================
   IMAGE BUBBLE
   ============================================ */
.chat-bubble-image {
  max-width: 70%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
@media (min-width: 768px) {
  .chat-bubble-image {
    max-width: 50%;
  }
}

.chat-bubble-image--mine {
  border-bottom-right-radius: 3px;
  margin-left: auto;
}
.chat-bubble-image--theirs {
  border-bottom-left-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.chat-bubble-image-content {
  width: 100%;
  height: auto;
  max-height: 280px;
  object-fit: cover;
  display: block;
}

.chat-bubble-sending-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.chat-bubble-image-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  padding: 4px 8px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.45));
}

/* ============================================
   INPUT BAR
   ============================================ */
.chat-input-bar {
  flex: none;
  z-index: 30;
  padding: 6px 8px;
  padding-bottom: max(env(safe-area-inset-bottom), 6px);
  background: hsl(var(--background) / 0.97);
  backdrop-filter: blur(16px);
  border-top: 1px solid hsl(var(--border) / 0.3);
}

.chat-input-inner {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.chat-input-attach {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: hsl(var(--muted-foreground));
  flex-shrink: 0;
  transition: all 0.15s;
}
.chat-input-attach:hover {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.1);
}

.chat-input-field-wrap {
  flex: 1;
  display: flex;
  align-items: flex-end;
  background: hsl(var(--muted));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: border-color 0.15s;
}
.chat-input-field-wrap:focus-within {
  border-color: hsl(var(--primary) / 0.2);
}

.chat-input-field {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 16px;
  color: hsl(var(--foreground));
  font-size: 14.5px;
  line-height: 1.4;
  resize: none;
  max-height: 120px;
  min-height: 40px;
  overflow-y: auto;
  outline: none;
}
.chat-input-field::placeholder {
  color: hsl(var(--muted-foreground) / 0.6);
}

.chat-send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.15s;
}
.chat-send-btn--active {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  box-shadow: 0 2px 8px hsl(var(--primary) / 0.3);
}
.chat-send-btn--active:active {
  transform: scale(0.9);
}
.chat-send-btn--disabled {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
}

/* ============================================
   TYPING INDICATOR
   ============================================ */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 18px;
  padding: 8px 12px;
}
.typing-indicator span {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8696a0;
  animation: typing-bounce 1.2s infinite;
}
.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Inline typing dots in header status */
.typing-dots {
  display: inline-flex;
  gap: 2px;
  align-items: center;
}
.typing-dots span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: hsl(var(--primary));
  animation: typing-bounce 1.2s infinite;
}
.typing-dots span:nth-child(2) {
  animation-delay: 0.15s;
}
.typing-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes typing-bounce {
  0%,
  70%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  35% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* ============================================
   UPLOAD SPINNER
   ============================================ */
.uploading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ============================================
   TRANSITIONS
   ============================================ */
.typing-fade-enter-active,
.typing-fade-leave-active {
  transition: all 0.25s ease;
}
.typing-fade-enter-from,
.typing-fade-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.95);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* ============================================
   PRODUCT CONTEXT BAR
   ============================================ */
.product-context-bar {
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  width: 90%;
  max-width: 450px;
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-context-bar.is-minimized {
  width: auto;
  min-width: 200px;
}

.product-context-content {
  padding: 10px 16px;
}

.product-context-main {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.product-context-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid hsl(var(--border) / 0.5);
  background: hsl(var(--muted));
}
.product-context-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-context-info {
  flex: 1;
  min-width: 0;
}

.product-context-title {
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.product-context-price {
  font-size: 13px;
  font-weight: 700;
  color: hsl(var(--primary));
}

.product-context-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: hsl(var(--muted-foreground));
  transition: background 0.15s;
}
.product-context-toggle:hover {
  background: hsl(var(--muted));
}

.product-context-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.context-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.15s;
}

.context-btn-nego {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
.context-btn-nego:hover {
  background: hsl(var(--secondary) / 0.8);
}

.context-btn-buy {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
.context-btn-buy:hover {
  background: hsl(var(--primary) / 0.9);
}

.product-context-bar.is-minimized .product-context-actions {
  display: none;
}

/* ============================================
   MODAL STYLES
   ============================================ */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 420px;
  background: hsl(var(--background));
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid hsl(var(--border) / 0.5);
  animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid hsl(var(--border) / 0.3);
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
}

.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
  transition: all 0.15s;
}
.modal-close:hover {
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
}

.modal-body {
  padding: 24px;
}

.modal-input {
  width: 100%;
  background: hsl(var(--muted) / 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
}
.modal-input:focus {
  border-color: hsl(var(--primary));
  background: hsl(var(--background));
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.1);
}

.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
}

.modal-btn-primary {
  flex: 1;
  height: 44px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s;
}
.modal-btn-primary:hover:not(:disabled) {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}
.modal-btn-primary:active:not(:disabled) {
  transform: translateY(0);
}
.modal-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-btn-secondary {
  flex: 1;
  height: 44px;
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.15s;
}
.modal-btn-secondary:hover {
  background: hsl(var(--muted) / 0.8);
}

/* Transitions */
.context-slide-enter-active, .context-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.context-slide-enter-from, .context-slide-leave-to {
  transform: translate(-50%, -120%);
  opacity: 0;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
.toast-container {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  min-width: 300px;
  max-width: 90vw;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes toastIn {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

.toast-container.success {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}
.toast-container.error {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
}

.toast-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
.toast-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Toast Transitions */
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
