<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Mulai query produk yang statusnya available
        $query = Product::with(['images', 'category', 'seller.profile'])
                    ->where('status', 'available');

        // 1. Filter Pencarian (Search)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2. Filter Kategori
        if ($request->filled('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // 3. Filter Spesifikasi (JSON) - Contoh: RAM
        if ($request->filled('ram')) {
            // Mencari nilai di dalam kolom JSON 'specifications->ram'
            $query->where('specifications->ram', $request->ram);
        }

        // Ambil data produk (paginate)
        $products = $query->latest()->paginate(12)->withQueryString();

        // Ambil semua kategori untuk sidebar filter
        $categories = Category::all();

        return view('home', compact('products', 'categories'));
    }
}