<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Pesan Saya') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div
                class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <div class="space-y-4">
                        @forelse ($chats as $chat)
                            @php
                                // Tentukan lawan bicara
                                $opponent = Auth::id() == $chat->buyer_id ? $chat->seller : $chat->buyer;
                                $lastMessage = $chat->messages->first();

                                // AMBIL DATA TOKO
                                // Jika punya profil toko & store_name diisi, gunakan itu. Jika tidak, pakai nama asli.
                                $displayName = $opponent->profile->store_name ?? $opponent->name;
                                $displayAvatar = $opponent->profile->avatar ?? null;
                                $initial = substr($displayName, 0, 1);
                            @endphp

                            {{-- CARD CHAT WRAPPER --}}
                            <div
                                class="relative group block p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">

                                {{-- 1. LINK UTAMA (BACKGROUND CLICK) -> KE CHAT --}}
                                <a href="{{ route('chat.show', $chat) }}" class="absolute inset-0 z-0"></a>

                                <div class="flex items-center justify-between relative z-10 pointer-events-none">
                                    <div class="flex items-center space-x-4">

                                        {{-- 2. LINK KE TOKO (AVATAR) --}}
                                        <a href="{{ route('store.show', $opponent) }}"
                                            class="pointer-events-auto flex-shrink-0 group/avatar">
                                            @if ($displayAvatar)
                                                <img src="{{ Storage::url($displayAvatar) }}"
                                                    class="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-600 group-hover/avatar:opacity-80 transition">
                                            @else
                                                <div
                                                    class="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold text-lg ring-2 ring-transparent group-hover/avatar:ring-primary-500 transition-all">
                                                    {{ $initial }}
                                                </div>
                                            @endif
                                        </a>

                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2">
                                                {{-- 3. LINK KE TOKO (NAMA) --}}
                                                <a href="{{ route('store.show', $opponent) }}"
                                                    class="pointer-events-auto font-bold text-gray-900 dark:text-gray-100 truncate hover:text-primary-600 hover:underline">
                                                    {{ $displayName }}
                                                </a>

                                                <span
                                                    class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                    {{ $chat->product->title }}
                                                </span>
                                            </div>

                                            <p class="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                                @if ($lastMessage)
                                                    <span
                                                        class="{{ $lastMessage->sender_id !== Auth::id() ? 'font-medium text-gray-800 dark:text-gray-200' : '' }}">
                                                        {{ $lastMessage->sender_id === Auth::id() ? 'Anda: ' : '' }}{{ $lastMessage->message }}
                                                    </span>
                                                @else
                                                    <span class="italic text-gray-400">Belum ada percakapan</span>
                                                @endif
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex-shrink-0 flex flex-col items-end space-y-2">
                                        <span
                                            class="text-xs text-gray-400 group-hover:text-primary-600 transition-colors">
                                            {{ $lastMessage ? $lastMessage->created_at->diffForHumans() : '' }}
                                        </span>
                                        <svg class="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Belum ada percakapan
                                </h3>
                                <p class="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                                    Mulai tawar menawar barang atau diskusikan produk dengan penjual sekarang.
                                </p>
                            </div>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
