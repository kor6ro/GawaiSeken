<x-app-layout>
    {{-- SETUP DATA --}}
    @php
        $me = Auth::user();
        $isBuyer = $me->id == $chat->buyer_id;
        $opponent = $isBuyer ? $chat->seller : $chat->buyer;

        // Data Opponent untuk Tampilan (Store Name vs Real Name)
        $oppName = $opponent->profile->store_name ?? $opponent->name;
        $oppAvatar = $opponent->profile->avatar ?? null;
        $oppInitial = substr($oppName, 0, 1);
    @endphp

    {{-- LAYOUT UTAMA: Fixed Height Full Screen minus Header --}}
    <div class="flex flex-col h-[calc(100vh-65px)] bg-[#efeae2] dark:bg-gray-900" x-data="chatSystem({
        chatId: {{ $chat->id }},
        currentUserId: {{ $me->id }},
        initialMessages: {{ Js::from($chat->messages) }},
        opponentName: '{{ $oppName }}',
        opponentAvatar: '{{ $oppAvatar ? Storage::url($oppAvatar) : null }}'
    })">

        {{-- 1. HEADER CHAT (Sticky Top) --}}
        <header
            class="flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm z-10">
            <div class="flex items-center gap-3">
                {{-- Back Button (Mobile) --}}
                <a href="{{ route('chat.index') }}"
                    class="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                </a>

                {{-- Info Lawan --}}
                <a href="{{ route('store.show', $opponent) }}" class="flex items-center gap-3 group">
                    <div class="relative">
                        @if ($oppAvatar)
                            <img src="{{ Storage::url($oppAvatar) }}"
                                class="h-10 w-10 rounded-full object-cover border border-gray-100">
                        @else
                            <div
                                class="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold">
                                {{ $oppInitial }}
                            </div>
                        @endif
                        {{-- Online Status Indicator (Bisa diaktifkan nanti jika ada fitur online) --}}
                        {{-- <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span> --}}
                    </div>
                    <div>
                        <h3
                            class="font-bold text-gray-800 dark:text-gray-100 text-sm md:text-base group-hover:underline">
                            {{ $oppName }}
                        </h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <span>{{ $isBuyer ? 'Penjual' : 'Pembeli' }}</span> &bull; {{ $chat->product->title }}
                        </p>
                    </div>
                </a>
            </div>

            {{-- Action Product --}}
            <div class="flex items-center">
                <a href="{{ route('products.show', $chat->product) }}"
                    class="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition">
                    <img src="{{ $chat->product->images->first() ? asset('storage/' . $chat->product->images->first()->image_path) : '' }}"
                        class="w-6 h-6 rounded object-cover bg-gray-300">
                    <span>Lihat Produk</span>
                </a>
            </div>
        </header>

        {{-- 2. AREA CHAT SCROLLABLE --}}
        {{-- Background pattern ala WA agar tidak terlalu polos --}}
        <main class="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth" x-ref="chatContainer"
            style="background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-blend-mode: overlay; background-repeat: repeat;">

            <template x-for="(msg, index) in messages" :key="msg.id || msg.temp_id">
                <div class="w-full flex flex-col">

                    {{-- Date Separator (Logic Sederhana di JS) --}}
                    <div x-show="showDateSeparator(index)" class="flex justify-center my-4">
                        <span
                            class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide"
                            x-text="formatDate(msg.created_at)"></span>
                    </div>

                    {{-- Chat Bubble --}}
                    <div class="flex w-full mb-1"
                        :class="msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'">

                        <div class="max-w-[85%] md:max-w-[70%] relative group flex items-end gap-1"
                            :class="msg.sender_id === currentUserId ? 'flex-row-reverse' : 'flex-row'">

                            {{-- Bubble --}}
                            <div class="px-3 py-2 shadow-sm text-sm md:text-[15px] leading-relaxed relative min-w-[80px]"
                                :class="msg.sender_id === currentUserId ?
                                    'bg-[#d9fdd3] dark:bg-primary-900 text-gray-900 dark:text-gray-100 rounded-lg rounded-tr-none' :
                                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg rounded-tl-none border border-gray-100 dark:border-gray-700'">

                                <p x-text="msg.message" class="whitespace-pre-wrap break-words pb-3"></p>

                                {{-- Time & Status --}}
                                <div class="absolute bottom-1 right-2 flex items-center gap-1">
                                    <span class="text-[10px] text-gray-500 dark:text-gray-400"
                                        x-text="formatTime(msg.created_at)"></span>

                                    {{-- Checkmarks (Hanya untuk pesan kita) --}}
                                    <template x-if="msg.sender_id === currentUserId">
                                        <span>
                                            <template x-if="msg.is_sending">
                                                <svg class="w-3 h-3 text-gray-400 animate-spin" fill="none"
                                                    viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                    </path>
                                                </svg>
                                            </template>
                                            <template x-if="!msg.is_sending">
                                                <svg class="w-3.5 h-3.5 text-blue-500" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </template>
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </main>

        {{-- 3. FOOTER INPUT (Sticky Bottom) --}}
        <footer class="flex-none bg-gray-100 dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <form @submit.prevent="sendMessage" class="flex items-end gap-2 max-w-7xl mx-auto">
                {{-- Tombol Plus (Untuk attachment file nanti) --}}
                <button type="button"
                    class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>

                {{-- Input Area --}}
                <div
                    class="flex-1 bg-white dark:bg-gray-700 rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500">
                    <textarea x-model="newMessage" x-ref="messageInput" @keydown.enter.prevent="if(!$event.shiftKey) sendMessage()"
                        @input="resizeTextarea"
                        class="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white placeholder-gray-500 resize-none max-h-32 min-h-[24px]"
                        placeholder="Ketik pesan..." rows="1"></textarea>
                </div>

                {{-- Send Button --}}
                <button type="submit" :disabled="!newMessage.trim()"
                    class="p-2.5 rounded-full shadow-md transition-all flex items-center justify-center"
                    :class="newMessage.trim() ? 'bg-primary-600 hover:bg-primary-700 text-white transform hover:scale-105' :
                        'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'">

                    <svg class="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </button>
            </form>
        </footer>
    </div>

    {{-- LOGIC JS --}}
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('chatSystem', (config) => ({
                chatId: config.chatId,
                currentUserId: config.currentUserId,
                messages: config.initialMessages,
                newMessage: '',

                init() {
                    this.scrollToBottom();

                    // Laravel Reverb / Pusher Listener
                    if (typeof Echo !== 'undefined') {
                        Echo.private(`chat.${this.chatId}`)
                            .listen('MessageSent', (e) => {
                                // Hanya masukkan pesan jika pengirim BUKAN kita sendiri
                                // (Karena pesan kita sudah masuk via optimistic UI)
                                const senderId = e.message.sender_id;
                                if (senderId !== this.currentUserId) {
                                    this.messages.push(e.message);
                                    this.$nextTick(() => {
                                        this.scrollToBottom();
                                        // Play notification sound here if needed
                                    });
                                }
                            });
                    }
                },

                scrollToBottom() {
                    this.$nextTick(() => {
                        const container = this.$refs.chatContainer;
                        if (container) {
                            container.scrollTop = container.scrollHeight;
                        }
                    });
                },

                resizeTextarea() {
                    const el = this.$refs.messageInput;
                    el.style.height = 'auto';
                    el.style.height = el.scrollHeight + 'px';
                },

                formatTime(dateString) {
                    if (!dateString) return '...';
                    return new Date(dateString).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                },

                formatDate(dateString) {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);

                    if (date.toDateString() === today.toDateString()) return 'Hari Ini';
                    if (date.toDateString() === yesterday.toDateString()) return 'Kemarin';

                    return date.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                },

                showDateSeparator(index) {
                    if (index === 0) return true; // Pesan pertama selalu tunjukkan tanggal

                    const currentMsgDate = new Date(this.messages[index].created_at).toDateString();
                    const prevMsgDate = new Date(this.messages[index - 1].created_at).toDateString();

                    return currentMsgDate !== prevMsgDate;
                },

                async sendMessage() {
                    const text = this.newMessage.trim();
                    if (!text) return;

                    const tempId = Date.now();

                    // 1. Optimistic UI Update (Langsung muncul di layar)
                    this.messages.push({
                        id: null,
                        temp_id: tempId,
                        sender_id: this.currentUserId,
                        message: text,
                        created_at: new Date().toISOString(), // Pakai waktu lokal
                        is_sending: true
                    });

                    this.newMessage = '';
                    this.$refs.messageInput.style.height = 'auto'; // Reset tinggi textarea
                    this.scrollToBottom();

                    // 2. Kirim ke Server
                    try {
                        const response = await axios.post(`/chats/${this.chatId}/message`, {
                            message: text
                        });

                        // 3. Update status pesan jadi "terkirim" (hilangkan loading)
                        const index = this.messages.findIndex(m => m.temp_id === tempId);
                        if (index !== -1) {
                            // Ganti object dummy dengan object asli dari server (agar punya ID asli)
                            this.messages[index] = {
                                ...response.data,
                                is_sending: false
                            };
                        }
                    } catch (error) {
                        console.error('Gagal mengirim pesan:', error);
                        // Opsional: Beri tanda gagal visual
                    }
                }
            }));
        });
    </script>
</x-app-layout>
