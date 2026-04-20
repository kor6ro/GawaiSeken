<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Static values for filters (synced with product creation)
        $filterData = [
            'rams' => ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB'],
            'storages' => ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
            'kelengkapan' => ['Fullset', 'Unit + Charger', 'Batangan'],
        ];

        // Mulai query produk yang statusnya available
        $query = Product::with([
            'images',
            'category',
            'store.profile',
            'store' => function ($q) {
                $q->withAvg('reviewsAsSeller', 'rating')
                    ->withCount(['reviewsAsSeller', 'transactionsAsSeller' => function ($tn) {
                        $tn->where('status', 'completed');
                    }]);
            },
        ])
            ->where('status', 'available');

        // 1. Filter Pencarian (Search)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2. Filter Kategori
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // 3. Filter Spesifikasi (JSON)
        if ($request->filled('ram')) {
            $query->where('specifications->ram', $request->ram);
        }

        if ($request->filled('storage')) {
            $query->where('specifications->storage', $request->storage);
        }

        if ($request->filled('kelengkapan')) {
            $query->where('specifications->kelengkapan', $request->kelengkapan);
        }

        // 4. Sorting
        if ($request->sort === 'oldest') {
            $query->oldest();
        } else {
            $query->latest(); // Default latest
        }

        // Ambil data produk (paginate)
        $isMobile = preg_match('/Mobile|Android|iPhone/i', $request->userAgent());
        $perPage = $isMobile ? 8 : 15;
        $products = $query->paginate($perPage)->withQueryString();

        // Ambil semua kategori untuk sidebar filter (Cache 24 jam)
        $categories = Cache::remember('categories', 60 * 60 * 24, fn () => Category::all());

        return Inertia::render('Home', array_merge([
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'ram' => $request->ram,
                'storage' => $request->storage,
                'kelengkapan' => $request->kelengkapan,
                'sort' => $request->sort,
            ],
        ], $filterData));
    }
}
