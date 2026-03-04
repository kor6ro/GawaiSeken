<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Static values for filters (synced with product creation)
        $filterData = [
            'rams' => ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB'],
            'storages' => ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
            'kelengkapan' => ['Fullset', 'Unit + Charger', 'Batangan']
        ];

        // Mulai query produk yang statusnya available
        $query = Product::with(['images', 'category', 'seller.profile'])
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
        $products = $query->paginate(12)->withQueryString();

        // Jika request AJAX, kembalikan partial view
        if ($request->ajax()) {
            return view('products._list', compact('products'))->render();
        }

        // Ambil semua kategori untuk sidebar filter
        $categories = Category::all();

        return view('home', array_merge(compact('products', 'categories'), $filterData));
    }
}