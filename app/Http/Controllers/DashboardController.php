<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller; // Pastikan ini ada
use App\Models\Product;
use App\Models\Transaction;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Data 1: Produk Aktif
        $productsCount = Product::where('user_id', $user->id)
            ->where('status', 'available')
            ->count();

        // Data 2: Barang Terjual
        // Pastikan tabel transactions ada kolom 'seller_id'
        // Jika error, coba ganti jadi 0 dulu untuk testing: $transactionsCount = 0;
        $transactionsCount = Transaction::where('seller_id', $user->id)
            ->count();

        // Data 3: Pesan Belum Dibaca
        // PENTING: Ini akan error jika Anda belum menjalankan migrasi 'read_at'
        try {
            $unreadMessagesCount = ChatMessage::whereHas('chat', function ($query) use ($user) {
                    $query->where('buyer_id', $user->id)
                          ->orWhere('seller_id', $user->id);
                })
                ->where('sender_id', '!=', $user->id)
                ->whereNull('read_at')
                ->count();
        } catch (\Exception $e) {
            // Jika tabel belum di-update, set ke 0 agar dashboard tidak error
            $unreadMessagesCount = 0; 
        }

        $myProducts = Product::where('user_id', $user->id)
                ->with(['category', 'images'])
                ->latest()
                ->paginate(5); // Tampilkan 5 per halaman di tabel

    return view('dashboard', compact(
        'user', 
        'productsCount', 
        'transactionsCount', 
        'unreadMessagesCount', 
        'myProducts'
    ));
    }
}