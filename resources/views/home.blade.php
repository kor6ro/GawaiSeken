<x-app-layout>
    <div class="max-w-7xl mx-auto px-4 py-6">

        <!-- HERO -->
        <div class="bg-white rounded-xl shadow p-6 mb-8">
            <h1 class="text-2xl font-bold mb-2">
                Jual & Beli Gawai Bekas
            </h1>
            <p class="text-gray-600 mb-4">
                Temukan HP, laptop, dan gadget bekas berkualitas
            </p>

            <div class="flex gap-2">
                <input type="text" placeholder="Cari produk..." class="w-full border rounded-lg px-4 py-2">
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Cari
                </button>
            </div>
        </div>

        <!-- KATEGORI -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold mb-4">Kategori</h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                @foreach (['HP', 'Laptop', 'Tablet', 'Aksesoris'] as $cat)
                    <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer hover:bg-indigo-50">
                        {{ $cat }}
                    </div>
                @endforeach
            </div>
        </div>

        <!-- PRODUK LIST -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Produk Terbaru</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                @for ($i = 1; $i <= 8; $i++)
                    <div class="bg-white rounded-xl shadow overflow-hidden">
                        <img src="https://via.placeholder.com/300x200" class="w-full h-40 object-cover">

                        <div class="p-4">
                            <h3 class="font-semibold">
                                iPhone 11 128GB
                            </h3>
                            <p class="text-indigo-600 font-bold">
                                Rp 6.500.000
                            </p>
                            <p class="text-sm text-gray-500">
                                Jakarta
                            </p>

                            <div class="mt-3 flex justify-between">
                                <a href="#" class="text-sm text-indigo-600">
                                    Lihat
                                </a>
                                <a href="#" class="text-sm text-gray-600">
                                    Chat
                                </a>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        <!-- CTA JUAL -->
        <div class="mt-12 bg-indigo-600 text-white rounded-xl p-6 text-center">
            <h2 class="text-xl font-bold mb-2">
                Punya gawai bekas?
            </h2>
            <p class="mb-4">
                Jual sekarang dan temukan pembeli dengan mudah
            </p>

            @auth
                <a href="/my-products/create" class="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
                    Jual Sekarang
                </a>
            @else
                <a href="/login" class="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
                    Login untuk Jual
                </a>
            @endauth
        </div>

    </div>
</x-app-layout>
