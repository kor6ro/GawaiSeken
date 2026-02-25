<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ $product->title }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {{-- Gambar --}}
                    <div>
                        @if ($product->images->first())
                            <img src="{{ asset('storage/' . $product->images->first()->image_path) }}"
                                class="w-full rounded-lg shadow-md">
                        @else
                            <div class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">No Image
                            </div>
                        @endif
                    </div>

                    {{-- Detail --}}
                    <div class="text-gray-900 dark:text-gray-100">
                        <h1 class="text-3xl font-bold mb-2">{{ $product->title }}</h1>
                        <p class="text-2xl text-primary-600 font-bold mb-4">Rp
                            {{ number_format($product->price, 0, ',', '.') }}</p>

                        <div class="prose dark:prose-invert mb-6">
                            {{ $product->description }}
                        </div>

                        {{-- Tombol Chat (Biar nyambung alurnya) --}}
                        @if (Auth::id() !== $product->user_id)
                            <form action="{{ route('chat.initiate', $product->id) }}" method="POST">
                                @csrf
                                <button type="submit"
                                    class="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 w-full md:w-auto">
                                    Chat Penjual
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
