<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import {
    ChevronLeft, ImageIcon, Send, X, Package, CheckCheck,
    Clock, Smile, Phone, Video, MoreVertical, Download, AlertTriangle
} from 'lucide-vue-next';

const props = defineProps({
    chat: Object,
    isNewChat: Boolean,
});

const auth = usePage().props.auth;
const isDark = computed(() => document.documentElement.classList.contains('dark'));
const messages = ref(props.chat.messages || []);
const newMessage = ref('');
const isTyping = ref(false);
const isOpponentOnline = ref(false);
const lightboxUrl = ref(null);
const chatId = ref(props.isNewChat ? `product-${props.chat.product_id}` : props.chat.id);
const currentIsNewChat = ref(props.isNewChat);

const chatContainer = ref(null);
const messagesEnd = ref(null);
const fileInput = ref(null);
const messageInput = ref(null);

const opponent = computed(() => auth.user.id === props.chat.buyer_id ? props.chat.seller : props.chat.buyer);
const oppName = computed(() => opponent.value.profile?.store_name || opponent.value.name);
const oppAvatar = computed(() => opponent.value.profile?.avatar ? `/storage/${opponent.value.profile.avatar}` : null);
const oppInitial = computed(() => oppName.value.charAt(0).toUpperCase());

const product = props.chat.product;
const productImage = product?.images?.[0]?.image_path;

// Color palette for avatars
const avatarColors = [
    ['#FF6B35', '#FF8E53'], ['#6C63FF', '#9B93FF'], ['#00C9A7', '#00E5C0'],
    ['#FF3CAC', '#FF79C6'], ['#2196F3', '#42ABFF'], ['#FF9800', '#FFC947'], ['#4CAF50', '#76C442'],
];
const oppAvatarGradient = computed(() => {
    const idx = oppName.value.charCodeAt(0) % avatarColors.length;
    const [c1, c2] = avatarColors[idx];
    return `linear-gradient(135deg, ${c1}, ${c2})`;
});

const scrollToBottom = (behavior = 'smooth') => {
    nextTick(() => {
        if (messagesEnd.value) {
            messagesEnd.value.scrollIntoView({ behavior, block: 'end' });
        }
    });
};

// Watch for new messages and auto-scroll
watch(() => messages.value.length, () => {
    scrollToBottom();
});

const formatTime = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return 'Hari Ini';
    if (date.toDateString() === yesterday.toDateString()) return 'Kemarin';
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const showDateSeparator = (index) => {
    if (index === 0) return true;
    return new Date(messages.value[index].created_at).toDateString() !==
        new Date(messages.value[index - 1].created_at).toDateString();
};

let typingTimeout = null;
let lastTypingWhisper = 0;

const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

const handleTyping = () => {
    resizeTextarea();
    if (window.Echo && !currentIsNewChat.value && newMessage.value.trim().length > 0) {
        const now = Date.now();
        if (now - lastTypingWhisper > 2000) {
            lastTypingWhisper = now;
            window.Echo.join(`chat.${chatId.value}`).whisper('typing', { name: 'user' });
        }
    }
};

const resizeTextarea = () => {
    if (messageInput.value) {
        messageInput.value.style.height = 'auto';
        messageInput.value.style.height = Math.min(messageInput.value.scrollHeight, 120) + 'px';
    }
};

const setupEcho = () => {
    if (!window.Echo) return;

    window.Echo.join(`chat.${chatId.value}`)
        .here((users) => { isOpponentOnline.value = users.some(u => u.id !== auth.user.id); })
        .joining((user) => { if (user.id !== auth.user.id) isOpponentOnline.value = true; })
        .leaving((user) => { if (user.id !== auth.user.id) isOpponentOnline.value = false; })
        .listen('MessageSent', (e) => {
            if (e.message.sender_id !== auth.user.id) {
                messages.value.push(e.message);
                scrollToBottom();
                axios.post(route('chat.read', chatId.value));
            }
        })
        .listen('MessageRead', () => {
            messages.value.forEach(m => {
                if (m.sender_id === auth.user.id && !m.read_at) {
                    m.read_at = new Date().toISOString();
                }
            });
        })
        .listenForWhisper('typing', () => {
            isTyping.value = true;
            if (typingTimeout) clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => { isTyping.value = false; }, 3000);
        });
};

const sendMessage = async () => {
    const text = newMessage.value.trim();
    if (!text) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const tempMsg = {
        temp_id: tempId,
        id: null,
        sender_id: auth.user.id,
        type: 'text',
        message: text,
        created_at: new Date().toISOString(),
        status: 'sending',
    };
    
    messages.value.push(tempMsg);

    newMessage.value = '';
    resizeTextarea();
    scrollToBottom();

    try {
        const { data } = await axios.post(route('chat.store', chatId.value), { message: text });
        
        if (currentIsNewChat.value) {
            currentIsNewChat.value = false;
            chatId.value = data.id;
            setupEcho();
            window.history.replaceState(null, '', route('chat.show', data.id));
        }

        const idx = messages.value.findIndex(m => m.temp_id === tempId);
        if (idx !== -1) {
            messages.value[idx] = { ...data, status: 'sent' };
        }
    } catch (e) {
        console.error('Send failed:', e);
        const idx = messages.value.findIndex(m => m.temp_id === tempId);
        if (idx !== -1) {
            messages.value[idx].status = 'error';
        }
    }
};

const sendImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const localUrl = URL.createObjectURL(file);

    messages.value.push({
        temp_id: tempId,
        id: null,
        sender_id: auth.user.id,
        type: 'image',
        image_url: localUrl,
        created_at: new Date().toISOString(),
        status: 'sending',
    });
    scrollToBottom();

    const fd = new FormData();
    fd.append('image', file);
    if (fileInput.value) fileInput.value.value = '';

    try {
        const { data } = await axios.post(route('chat.image', chatId.value), fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (currentIsNewChat.value) {
            currentIsNewChat.value = false;
            chatId.value = data.id;
            setupEcho();
            window.history.replaceState(null, '', route('chat.show', data.id));
        }

        const idx = messages.value.findIndex(m => m.temp_id === tempId);
        if (idx !== -1) {
            messages.value[idx] = { ...data, status: 'sent' };
        }
    } catch (e) {
        console.error('Image upload failed:', e);
        const idx = messages.value.findIndex(m => m.temp_id === tempId);
        if (idx !== -1) {
            messages.value[idx].status = 'error';
        }
    }
};

const openLightbox = (url) => { lightboxUrl.value = url; };

const downloadImage = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image';
    a.click();
};

onMounted(() => {
    scrollToBottom('auto');
    if (!currentIsNewChat.value) {
        const checkEcho = setInterval(() => {
            if (window.Echo) { clearInterval(checkEcho); setupEcho(); }
        }, 100);
        setTimeout(() => clearInterval(checkEcho), 5000);
    }
});

onUnmounted(() => {
    if (window.Echo && !currentIsNewChat.value) {
        window.Echo.leave(`chat.${chatId.value}`);
    }
});
</script>

<template>
    <!-- Standalone full-screen layout (no AppLayout wrapper) -->
    <div class="chat-view-root">
        <Head :title="oppName" />

        <!-- ===================== HEADER ===================== -->
        <header class="chat-header">
            <!-- Back button -->
            <Link :href="route('chat.index')" class="chat-header-back">
                <ChevronLeft class="w-5 h-5" />
            </Link>

            <!-- Opponent info -->
            <Link :href="route('store.show', opponent.id)" class="chat-header-info">
                <!-- Avatar -->
                <div class="chat-header-avatar-wrap">
                    <img v-if="oppAvatar" :src="oppAvatar" class="chat-header-avatar" />
                    <div v-else class="chat-header-avatar-fallback" :style="{ background: oppAvatarGradient }">
                        {{ oppInitial }}
                    </div>
                    <span v-if="isOpponentOnline" class="chat-header-online-dot"></span>
                </div>

                <!-- Name + status -->
                <div class="min-w-0 flex-1">
                    <h3 class="chat-header-name">{{ oppName }}</h3>
                    <p class="chat-header-status"
                       :class="isTyping ? 'text-primary' : isOpponentOnline ? 'text-green-500' : 'text-muted-foreground'">
                        <span v-if="isTyping" class="flex items-center gap-1">
                            <span class="typing-dots">
                                <span></span><span></span><span></span>
                            </span>
                            sedang mengetik...
                        </span>
                        <span v-else-if="isOpponentOnline">Online</span>
                        <span v-else>{{ auth.user.id === chat.buyer_id ? 'Penjual' : 'Pembeli' }}</span>
                    </p>
                </div>
            </Link>

            <!-- Product thumbnail (small) -->
            <div class="flex items-center gap-1 flex-shrink-0">
                <Link v-if="product" :href="route('products.show', product.slug)"
                      class="chat-header-product"
                      :title="product.title">
                    <img v-if="productImage" :src="'/storage/' + productImage" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full bg-muted flex items-center justify-center">
                        <Package class="w-4 h-4 text-muted-foreground" />
                    </div>
                </Link>
            </div>
        </header>

        <!-- ===================== MESSAGES ===================== -->
        <main ref="chatContainer" class="chat-messages-area"
              :style="{ backgroundColor: isDark ? '#0b141a' : '#eae6df' }">

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
                    <div class="chat-msg-row"
                         :class="msg.sender_id === auth.user.id ? 'justify-end' : 'justify-start'">

                        <!-- IMAGE BUBBLE -->
                        <div v-if="msg.type === 'image'"
                             class="chat-bubble-image"
                             :class="msg.sender_id === auth.user.id ? 'chat-bubble-image--mine' : 'chat-bubble-image--theirs'"
                             @click="openLightbox(msg.image_url)">

                            <img :src="msg.image_url" class="chat-bubble-image-content" />

                            <!-- Sending overlay -->
                            <div v-if="msg.status === 'sending'" class="chat-bubble-sending-overlay">
                                <div class="uploading-spinner"></div>
                            </div>
                            
                            <!-- Error overlay -->
                            <div v-if="msg.status === 'error'" class="chat-bubble-sending-overlay bg-red-500/20">
                                <AlertTriangle class="w-8 h-8 text-white" />
                            </div>

                            <!-- Bottom meta strip -->
                            <div class="chat-bubble-image-meta">
                                <span class="text-[10px] text-white/90 font-medium">{{ formatTime(msg.created_at) }}</span>
                                <template v-if="msg.sender_id === auth.user.id">
                                    <CheckCheck v-if="msg.status !== 'sending' && msg.status !== 'error' && msg.read_at" class="w-3.5 h-3.5 text-blue-300" />
                                    <CheckCheck v-else-if="msg.status !== 'sending' && msg.status !== 'error'" class="w-3.5 h-3.5 text-white/60" />
                                    <Clock v-else-if="msg.status === 'sending'" class="w-3 h-3 text-white/60 animate-spin" />
                                    <AlertTriangle v-else class="w-3.5 h-3.5 text-red-400" />
                                </template>
                            </div>
                        </div>

                        <!-- TEXT BUBBLE -->
                        <div v-else
                             class="chat-bubble"
                             :class="msg.sender_id === auth.user.id ? 'chat-bubble--mine' : 'chat-bubble--theirs'">

                            <p class="chat-bubble-text">{{ msg.message }}</p>

                            <!-- Time + ticks -->
                            <div class="chat-bubble-meta">
                                <span class="chat-bubble-time"
                                      :class="msg.sender_id === auth.user.id ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'">{{ formatTime(msg.created_at) }}</span>
                                <template v-if="msg.sender_id === auth.user.id">
                                    <Clock v-if="msg.status === 'sending'" class="w-3 h-3 text-white/50 animate-spin" />
                                    <CheckCheck v-else-if="msg.read_at" class="w-3.5 h-3.5 text-blue-300" />
                                    <AlertTriangle v-else-if="msg.status === 'error'" class="w-3.5 h-3.5 text-red-400" />
                                    <CheckCheck v-else class="w-3.5 h-3.5 text-white/50" />
                                </template>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Typing indicator bubble -->
                <transition name="typing-fade">
                    <div v-if="isTyping" class="chat-msg-row justify-start">
                        <div class="chat-bubble chat-bubble--theirs">
                            <div class="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
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
                    <ImageIcon class="w-5 h-5" />
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
                    :class="newMessage.trim() ? 'chat-send-btn--active' : 'chat-send-btn--disabled'">
                    <Send class="w-5 h-5" />
                </button>
            </div>
        </footer>

        <!-- ===================== LIGHTBOX ===================== -->
        <Teleport to="body">
            <transition name="lightbox-fade">
                <div v-if="lightboxUrl"
                     class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
                     @click.self="lightboxUrl = null">

                    <!-- Controls -->
                    <div class="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-4">
                        <button @click="lightboxUrl = null"
                                class="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all">
                            <X class="w-5 h-5" />
                        </button>
                        <button @click="downloadImage(lightboxUrl)"
                                class="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all">
                            <Download class="w-5 h-5" />
                        </button>
                    </div>

                    <img :src="lightboxUrl"
                         class="max-w-[95vw] max-h-[88vh] object-contain rounded-lg shadow-2xl" />
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
    background-image: radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px);
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
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
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
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
    .chat-bubble { max-width: 55%; }
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
    box-shadow: 0 1px 1px rgba(0,0,0,0.06);
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
    .chat-bubble-image { max-width: 50%; }
}

.chat-bubble-image--mine {
    border-bottom-right-radius: 3px;
    margin-left: auto;
}
.chat-bubble-image--theirs {
    border-bottom-left-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
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
    background: rgba(0,0,0,0.4);
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
    background: linear-gradient(transparent, rgba(0,0,0,0.45));
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
.typing-indicator span:nth-child(1) { animation-delay: 0s; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

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
.typing-dots span:nth-child(2) { animation-delay: 0.15s; }
.typing-dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes typing-bounce {
    0%, 70%, 100% { transform: translateY(0); opacity: 0.4; }
    35% { transform: translateY(-4px); opacity: 1; }
}

/* ============================================
   UPLOAD SPINNER
   ============================================ */
.uploading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============================================
   TRANSITIONS
   ============================================ */
.typing-fade-enter-active, .typing-fade-leave-active {
    transition: all 0.25s ease;
}
.typing-fade-enter-from, .typing-fade-leave-to {
    opacity: 0;
    transform: translateY(4px) scale(0.95);
}

.lightbox-fade-enter-active, .lightbox-fade-leave-active {
    transition: opacity 0.2s ease;
}
.lightbox-fade-enter-from, .lightbox-fade-leave-to {
    opacity: 0;
}
</style>
