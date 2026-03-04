<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-bold text-2xl text-foreground leading-tight">
                {{ __('Pesan Saya') }}
            </h2>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span>Online</span>
            </div>
        </div>
    </x-slot>

    <div class="py-10">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-card text-card-foreground overflow-hidden shadow-sm sm:rounded-2xl border border-border">
                <div class="divide-y divide-border">
                    @forelse ($chats as $chat)
                        @php
                            $opponent = Auth::id() == $chat->buyer_id ? $chat->seller : $chat->buyer;
                            $lastMessage = $chat->messages->first();
                            $unread = $chat->unread_count ?? 0;
                            $isUnread = $unread > 0;

                            $displayName = $opponent->profile->store_name ?? $opponent->name;
                            $displayAvatar = $opponent->profile->avatar ?? null;
                            $initial = strtoupper(substr($displayName, 0, 1));

                            // Last message preview text
                            if ($lastMessage) {
                                if ($lastMessage->type === 'image') {
                                    $preview = '📷 Foto';
                                } else {
                                    $preview = $lastMessage->message;
                                }
                            } else {
                                $preview = null;
                            }
                        @endphp

                        <div class="relative group transition-all duration-200 hover:bg-muted/50">
                            <a href="{{ route('chat.show', $chat) }}" class="absolute inset-0 z-20"></a>

                            <div class="flex items-center p-5 relative z-10">
                                {{-- Avatar --}}
                                <div class="relative flex-shrink-0">
                                    @if($displayAvatar)
                                        <img src="{{ Storage::url($displayAvatar) }}"
                                            class="h-14 w-14 rounded-2xl object-cover ring-2 ring-white dark:ring-gray-700 shadow-sm transition-transform duration-300 group-hover:scale-105">
                                    @else
                                        <div
                                            class="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-inner transition-transform duration-300 group-hover:scale-105">
                                            {{ $initial }}
                                        </div>
                                    @endif

                                    @if($isUnread)
                                        <span
                                            class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold ring-2 ring-background">
                                            {{ $unread > 9 ? '9+' : $unread }}
                                        </span>
                                    @endif
                                </div>

                                {{-- Content --}}
                                <div class="ml-4 flex-1 min-w-0">
                                    <div class="flex items-center justify-between mb-1">
                                        <div class="flex items-center gap-2 min-w-0">
                                            <h3 class="font-bold text-foreground truncate text-base">{{ $displayName }}</h3>
                                            <span
                                                class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-xs font-semibold text-muted-foreground truncate max-w-[120px]">
                                                {{ $chat->product->title }}
                                            </span>
                                        </div>
                                        <span
                                            class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2 flex-shrink-0">
                                            {{ $lastMessage ? $lastMessage->created_at->diffForHumans(null, true) : '' }}
                                        </span>
                                    </div>

                                    <div class="flex items-center justify-between gap-2">
                                        <p
                                            class="text-sm truncate {{ $isUnread ? 'text-foreground font-semibold' : 'text-muted-foreground' }}">
                                            @if($lastMessage)
                                                @if($lastMessage->sender_id === Auth::id())
                                                    <span class="text-xs text-gray-400 italic mr-1">Anda:</span>
                                                @endif
                                                {{ $preview }}
                                            @else
                                                <span class="italic text-gray-400">Belum ada percakapan</span>
                                            @endif
                                        </p>
                                    </div>
                                </div>

                                {{-- Arrow icon --}}
                                <div
                                    class="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                                    <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    @empty
                        <div class="flex flex-col items-center justify-center py-20 text-center">
                            <div class="relative mb-6">
                                <div
                                    class="absolute inset-0 bg-primary/10 dark:bg-primary/30 rounded-full blur-2xl opacity-50 scale-150">
                                </div>
                                <div
                                    class="relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
                                    <svg class="w-12 h-12 text-primary-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 class="text-xl font-bold text-foreground mb-2">Belum ada percakapan</h3>
                            <p class="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
                                Temukan produk dan mulai chat dengan penjual hari ini.
                            </p>
                            <a href="{{ route('home') }}"
                                class="mt-8 inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                                Jelajahi Produk
                            </a>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</x-app-layout>