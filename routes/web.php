<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StoreController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'seller'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    // --- FITUR AKUN (User Personal) ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Hanya update Nama Asli & Email
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/upgrade', [ProfileController::class, 'upgradeToSeller'])->name('profile.upgrade');

    // Route baru untuk update profil toko (Nama Toko, Bio, Avatar)
    Route::patch('/store/settings', [StoreController::class, 'update'])->name('store.update');

    // --- FITUR PRODUK & CHAT ---
    Route::get('/gsmarena/search', [ProductController::class, 'searchGsmArena'])->name('gsmarena.search');
    Route::get('/gsmarena/details', [ProductController::class, 'getGsmArenaDetails'])->name('gsmarena.details');
    Route::resource('products', ProductController::class)->except(['index', 'show']);

    Route::get('/favorites', [ProductController::class, 'favorites'])->name('products.favorites');
    Route::post('/products/{product:id}/favorite', [ProductController::class, 'toggleFavorite'])->name('products.toggle-favorite');
    Route::post('/products/{product:id}/report', [ProductController::class, 'report'])->name('products.report');

    Route::get('/chats', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chats/new/{product}', [ChatController::class, 'initiate'])->name('chat.new');
    Route::get('/chats/{chat}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chats/{chat}/message', [ChatController::class, 'store'])->name('chat.store');
    Route::post('/chats/{chat}/image', [ChatController::class, 'storeImage'])->name('chat.image');
    Route::post('/chats/{chat}/read', [ChatController::class, 'markAsRead'])->name('chat.read');
    Route::post('/chat/initiate/{product}', [ChatController::class, 'initiate'])->name('chat.initiate');
});

// --- PUBLIC PRODUCT DETAIL (Moved here to avoid conflict with /products/create) ---
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// --- FITUR TOKO (Seller Public) ---
Route::get('/store/{user}', [StoreController::class, 'show'])->name('store.show');

require __DIR__ . '/auth.php';