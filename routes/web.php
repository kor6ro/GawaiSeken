<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::post('/midtrans/callback', [\App\Http\Controllers\TransactionController::class, 'callback'])->name('midtrans.callback');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/products', [AdminController::class, 'products'])->name('products.index');
    Route::post('/products/{product}/status', [AdminController::class, 'updateProductStatus'])->name('products.update-status');
    Route::post('/verifications/{verification}/approve', [AdminController::class, 'approveVerification'])->name('verifications.approve');
    Route::post('/verifications/{verification}/reject', [AdminController::class, 'rejectVerification'])->name('verifications.reject');

    // Dispute Management
    Route::get('/disputes', [AdminController::class, 'disputes'])->name('disputes.index');
    Route::get('/disputes/{dispute}', [AdminController::class, 'showDispute'])->name('disputes.show');
    Route::post('/disputes/{dispute}/resolve', [AdminController::class, 'resolveDispute'])->name('disputes.resolve');
});

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

    // --- FITUR VERIFIKASI SELLER (KYC) ---
    Route::get('/seller/verify', [\App\Http\Controllers\SellerVerificationController::class, 'create'])->name('seller.verification.create');
    Route::post('/seller/verify', [\App\Http\Controllers\SellerVerificationController::class, 'store'])->name('seller.verification.store');

    // --- FITUR PRODUK & CHAT ---
    Route::get('/gsmarena/search', [ProductController::class, 'searchGsmArena'])->name('gsmarena.search');
    Route::get('/gsmarena/details', [ProductController::class, 'getGsmArenaDetails'])->name('gsmarena.details');
    Route::resource('products', ProductController::class)->except(['index', 'show']);

    Route::get('/favorites', [ProductController::class, 'favorites'])->name('products.favorites');
    Route::post('/products/{product:id}/favorite', [ProductController::class, 'toggleFavorite'])->name('products.toggle-favorite');
    Route::post('/products/{product:id}/report', [ProductController::class, 'report'])->name('products.report');
    Route::patch('/products/{product:id}/status', [ProductController::class, 'toggleStatus'])->name('products.toggle-status');

    Route::get('/chats', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chats/new/{product}', [ChatController::class, 'initiate'])->name('chat.new');
    Route::get('/chats/{chat}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chats/{chat}/message', [ChatController::class, 'store'])->name('chat.store');
    Route::post('/chats/{chat}/image', [ChatController::class, 'storeImage'])->name('chat.image');
    Route::post('/chats/{chat}/read', [ChatController::class, 'markAsRead'])->name('chat.read');
    Route::post('/chat/initiate/{product}', [ChatController::class, 'initiate'])->name('chat.initiate');

    // --- TRANSACTION & DISPUTE ---
    Route::post('/products/{product}/checkout', [\App\Http\Controllers\TransactionController::class, 'checkout'])->name('transactions.checkout');
    Route::get('/profile/orders', [\App\Http\Controllers\TransactionController::class, 'orders'])->name('profile.orders');
    Route::post('/transactions/{transaction}/status', [\App\Http\Controllers\TransactionController::class, 'updateStatus'])->name('transactions.update-status');
    Route::post('/transactions/{transaction}/repay', [\App\Http\Controllers\TransactionController::class, 'repay'])->name('transactions.repay');
    Route::post('/transactions/{transaction}/dispute', [\App\Http\Controllers\TransactionController::class, 'storeDispute'])->name('transactions.dispute');
});

// --- PUBLIC PRODUCT DETAIL (Moved here to avoid conflict with /products/create) ---
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// --- FITUR TOKO (Seller Public) ---
Route::get('/store/{user}', [StoreController::class, 'show'])->name('store.show');

require __DIR__.'/auth.php';
