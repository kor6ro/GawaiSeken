<?php

namespace App\Http\Controllers;

// Pastikan ini ada
use App\Models\ChatMessage;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('profile');

        // Data 1: Produk Aktif (Available & Approved)
        $productsCount = Product::where('user_id', $user->id)
            ->where('availability', 'available')
            ->where('status', 'active')
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

        $isMobile = preg_match('/Mobile|Android|iPhone/i', request()->userAgent());
        $perPage = $isMobile ? 6 : 10;

        $myProducts = Product::where('user_id', $user->id)
            ->with(['category', 'images', 'store'])
            ->latest()
            ->paginate($perPage, ['*'], 'products');

        $transactions = Transaction::where('seller_id', $user->id)
            ->with(['product.images', 'buyer.profile', 'dispute'])
            ->latest()
            ->paginate($perPage, ['*'], 'transactions');

        return Inertia::render('Dashboard', [
            'user' => $user,
            'productsCount' => $productsCount,
            'transactionsCount' => $transactionsCount,
            'unreadMessagesCount' => $unreadMessagesCount,
            'myProducts' => $myProducts,
            'transactions' => $transactions
        ]);
    }
}
