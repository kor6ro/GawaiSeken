<x-app-layout>
    @php
        $me = Auth::user();
        $isBuyer = $me->id == $chat->buyer_id;
        $opponent = $isBuyer ? $chat->seller : $chat->buyer;

        $oppName = $opponent->profile->store_name ?? $opponent->name;
        $oppAvatar = $opponent->profile->avatar ?? null;
        $oppInitial = strtoupper(substr($oppName, 0, 1));

        $product = $chat->product;
        $productImage = $product->images->first();
    @endphp

    {{-- ============================================================= --}}
    {{-- ALPINE COMPONENT ROOT --}}
    {{-- ============================================================= --}}
    <div class="flex flex-col h-[calc(100vh-65px)] bg-background text-foreground" x-data="chatSystem({
            chatId:        {{ $chat->id }},
            currentUserId: {{ $me->id }},
            initialMessages: {{ Js::from($chat->messages->map(fn($m) => array_merge($m->toArray(), ['image_url' => $m->image_path ? Storage::url($m->image_path) : null]))) }},
            sendUrl:  '{{ route('chat.store', $chat) }}',
            imageUrl: '{{ route('chat.image', $chat) }}',
        })">

        {{-- ============================================================= --}}
        {{-- HEADER --}}
        {{-- ============================================================= --}}
        <header
            class="flex-none bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between shadow-sm z-20 gap-3">

            {{-- Back + Opponent Info --}}
            <div class="flex items-center gap-3 min-w-0">
                <a href="{{ route('chat.index') }}"
                    class="p-2 -ml-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground transition-all flex-shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </a>

                <a href="{{ route('store.show', $opponent) }}"
                    class="flex items-center gap-3 min-w-0 active:scale-95 transition-transform">
                    <div class="relative flex-shrink-0">
                        @if($oppAvatar)
                            <img src="{{ Storage::url($oppAvatar) }}"
                                class="h-10 w-10 rounded-2xl object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm">
                        @else
                            <div
                                class="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-base shadow-sm">
                                {{ $oppInitial }}
                            </div>
                        @endif
                        <span
                            class="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-900 bg-green-500"></span>
                    </div>
                    <div class="min-w-0">
                        <h3 class="font-bold text-foreground text-sm leading-tight truncate">{{ $oppName }}</h3>
                        <p class="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                            {{ $isBuyer ? 'Penjual' : 'Pembeli' }}
                        </p>
                    </div>
                </a>
            </div>

            {{-- Product pill --}}
            <a href="{{ route('products.show', $product) }}"
                class="hidden sm:flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-xl border border-border hover:bg-muted transition-all group flex-shrink-0">
                <div class="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                    @if($productImage)
                        <img src="{{ asset('storage/' . $productImage->image_path) }}"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                    @else
                        <div class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    @endif
                </div>
                <div class="max-w-[110px]">
                    <p class="text-[9px] text-gray-400 font-bold uppercase">Produk</p>
                    <p class="text-xs text-foreground font-semibold truncate">{{ $product->title }}</p>
                </div>
                <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </header>

        {{-- ============================================================= --}}
        {{-- MESSAGES AREA --}}
        {{-- ============================================================= --}}
        <main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-1 relative" x-ref="chatContainer">
            {{-- Subtle dot grid background --}}
            <div class="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 24px 24px;"></div>

            <template x-for="(msg, index) in messages" :key="msg.id || msg.temp_id">
                <div class="w-full flex flex-col relative z-10">

                    {{-- Date Separator --}}
                    <div x-show="showDateSeparator(index)" class="flex justify-center my-4">
                        <span
                            class="bg-background/80 backdrop-blur-sm border border-border
                                     text-muted-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-widest"
                            x-text="formatDate(msg.created_at)"></span>
                    </div>

                    {{-- ---- IMAGE BUBBLE ---- --}}
                    <template x-if="msg.type === 'image'">
                        <div class="flex w-full mb-2"
                            :class="msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'">
                            <div class="max-w-[70%] md:max-w-[55%]">
                                <div class="relative rounded-[20px] overflow-hidden shadow-md cursor-pointer group"
                                    :class="msg.sender_id === currentUserId ? 'rounded-br-[4px]' : 'rounded-bl-[4px]'"
                                    @click="openLightbox(msg.image_url)">
                                    <img :src="msg.image_url"
                                        class="w-full h-auto object-cover max-h-72 transition-transform group-hover:scale-[1.02]">
                                    {{-- Zoom overlay --}}
                                    <div
                                        class="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                                        <svg class="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                                <p class="text-[10px] text-gray-400 mt-1 px-1"
                                    :class="msg.sender_id === currentUserId ? 'text-right' : 'text-left'"
                                    x-text="formatTime(msg.created_at)"></p>
                            </div>
                        </div>
                    </template>

                    {{-- ---- TEXT BUBBLE ---- --}}
                    <template x-if="msg.type === 'text' || !msg.type">
                        <div class="flex w-full mb-1"
                            :class="msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'">
                            <div class="max-w-[85%] md:max-w-[70%] flex items-end gap-2"
                                :class="msg.sender_id === currentUserId ? 'flex-row-reverse' : 'flex-row'">

                                <div class="px-4 py-3 shadow-sm text-sm leading-relaxed relative"
                                    :class="msg.sender_id === currentUserId
                                        ? 'bg-primary text-primary-foreground rounded-[20px] rounded-br-[4px]'
                                        : 'bg-muted text-foreground rounded-[20px] rounded-bl-[4px] border border-border'">

                                    <p x-text="msg.message" class="whitespace-pre-wrap break-words pb-4"></p>

                                    {{-- Time & read receipts --}}
                                    <div class="absolute bottom-2 right-3 flex items-center gap-1">
                                        <span class="text-[9px] font-medium"
                                            :class="msg.sender_id === currentUserId ? 'text-primary-foreground/70' : 'text-gray-400 dark:text-gray-500'"
                                            x-text="formatTime(msg.created_at)"></span>

                                        <template x-if="msg.sender_id === currentUserId">
                                            <div>
                                                <template x-if="msg.is_sending">
                                                    <svg class="w-3 h-3 text-primary-foreground/50 animate-spin"
                                                        fill="none" viewBox="0 0 24 24">
                                                        <circle class="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" stroke-width="4"></circle>
                                                        <path class="opacity-75" fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                        </path>
                                                    </svg>
                                                </template>
                                                <template x-if="!msg.is_sending">
                                                    <div class="flex -space-x-1.5">
                                                        <svg class="w-3.5 h-3.5 text-primary-foreground/80" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2.5" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <svg x-show="msg.read_at"
                                                            class="w-3.5 h-3.5 text-primary-foreground/80" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2.5" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                </div>
            </template>
        </main>

        {{-- ============================================================= --}}
        {{-- INPUT FOOTER --}}
        {{-- ============================================================= --}}
        <footer class="flex-none bg-background px-4 py-3 border-t border-border z-20">
            <form @submit.prevent="sendMessage" class="flex items-end gap-3 max-w-5xl mx-auto">

                {{-- Hidden file input --}}
                <input type="file" x-ref="imageInput" class="hidden" accept="image/*" @change="sendImage">

                {{-- Photo button --}}
                <button type="button" @click="$refs.imageInput.click()" title="Kirim foto"
                    class="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-2xl transition-all flex-shrink-0 active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </button>

                {{-- Text area --}}
                <div class="flex-1">
                    <textarea x-model="newMessage" x-ref="messageInput"
                        @keydown.enter.prevent="if(!$event.shiftKey) sendMessage()" @input="resizeTextarea"
                        class="w-full bg-muted border-none rounded-[24px] px-5 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary-500/20 transition-all resize-none max-h-40 min-h-[48px] overflow-hidden text-sm"
                        placeholder="Tulis pesan…" rows="1"></textarea>
                </div>

                {{-- Send button --}}
                <button type="submit" :disabled="!newMessage.trim()"
                    class="flex-shrink-0 p-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                    :class="newMessage.trim() ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-muted text-muted-foreground'">
                    <svg class="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </form>
        </footer>

        {{-- ============================================================= --}}
        {{-- LIGHTBOX --}}
        {{-- ============================================================= --}}
        <div x-show="lightboxUrl" x-cloak
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            @click.self="lightboxUrl = null" @keydown.escape.window="lightboxUrl = null">
            <button @click="lightboxUrl = null"
                class="absolute top-4 right-4 p-2 rounded-full bg-background/10 text-foreground hover:bg-background/20 transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <img :src="lightboxUrl" class="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl">
        </div>

    </div>{{-- end alpine root --}}

    {{-- ============================================================= --}}
    {{-- ALPINE JS LOGIC --}}
    {{-- ============================================================= --}}
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('chatSystem', (config) => ({
                chatId: config.chatId,
                currentUserId: config.currentUserId,
                messages: config.initialMessages,
                newMessage: '',
                lightboxUrl: null,

                // ---------- lifecycle ----------
                init() {
                    this.scrollToBottom();

                    if (typeof Echo !== 'undefined') {
                        Echo.private(`chat.${this.chatId}`)
                            .listen('MessageSent', (e) => {
                                if (e.message.sender_id !== this.currentUserId) {
                                    this.messages.push(e.message);
                                    this.scrollToBottom();
                                }
                            });
                    }
                },

                // ---------- scroll ----------
                scrollToBottom() {
                    this.$nextTick(() => {
                        const el = this.$refs.chatContainer;
                        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
                    });
                },

                // ---------- textarea auto-resize ----------
                resizeTextarea() {
                    const el = this.$refs.messageInput;
                    el.style.height = '48px';
                    el.style.height = el.scrollHeight + 'px';
                },

                // ---------- date/time helpers ----------
                formatTime(d) {
                    if (!d) return '';
                    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                },
                formatDate(d) {
                    if (!d) return '';
                    const date = new Date(d);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    if (date.toDateString() === today.toDateString()) return 'Hari Ini';
                    if (date.toDateString() === yesterday.toDateString()) return 'Kemarin';
                    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                },
                showDateSeparator(i) {
                    if (i === 0) return true;
                    return new Date(this.messages[i].created_at).toDateString() !==
                        new Date(this.messages[i - 1].created_at).toDateString();
                },

                // ---------- SEND TEXT ----------
                async sendMessage() {
                    const text = this.newMessage.trim();
                    if (!text) return;

                    const tempId = Date.now();
                    this.messages.push({
                        temp_id: tempId, id: null,
                        sender_id: this.currentUserId,
                        type: 'text',
                        message: text,
                        created_at: new Date().toISOString(),
                        is_sending: true,
                    });
                    this.newMessage = '';
                    this.$refs.messageInput.style.height = '48px';
                    this.scrollToBottom();

                    try {
                        const { data } = await axios.post(config.sendUrl, { message: text });
                        const idx = this.messages.findIndex(m => m.temp_id === tempId);
                        if (idx !== -1) this.messages[idx] = { ...data, is_sending: false };
                    } catch (e) { console.error('Send failed:', e); }
                },

                // ---------- SEND IMAGE ----------
                async sendImage(event) {
                    const file = event.target.files[0];
                    if (!file) return;

                    const tempId = Date.now();
                    const localUrl = URL.createObjectURL(file);

                    this.messages.push({
                        temp_id: tempId, id: null,
                        sender_id: this.currentUserId,
                        type: 'image',
                        image_url: localUrl,
                        created_at: new Date().toISOString(),
                        is_sending: true,
                    });
                    this.scrollToBottom();

                    const fd = new FormData();
                    fd.append('image', file);
                    this.$refs.imageInput.value = '';

                    try {
                        const { data } = await axios.post(config.imageUrl, fd, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });
                        const idx = this.messages.findIndex(m => m.temp_id === tempId);
                        if (idx !== -1) this.messages[idx] = { ...data, is_sending: false };
                    } catch (e) { console.error('Image upload failed:', e); }
                },

                // ---------- LIGHTBOX ----------
                openLightbox(url) { this.lightboxUrl = url; },
            }));
        });
    </script>
</x-app-layout>