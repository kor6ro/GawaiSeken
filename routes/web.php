<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NegotiationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TransactionController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/products', [AdminController::class, 'products'])->name('products.index');
    Route::post('/products/{product}/status', [AdminController::class, 'updateProductStatus'])->name('products.update-status');
    Route::post('/verifications/{verification}/approve', [AdminController::class, 'approveVerification'])->name('verifications.approve');
    Route::post('/verifications/{verification}/reject', [AdminController::class, 'rejectVerification'])->name('verifications.reject');
    
    // User Management
    Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    Route::post('/users/{user}/suspend', [AdminController::class, 'suspendUser'])->name('users.suspend');
    Route::post('/users/{user}/unsuspend', [AdminController::class, 'unsuspendUser'])->name('users.unsuspend');

    // Product Deletion
    Route::delete('/products/{product}', [AdminController::class, 'destroyProduct'])->name('products.destroy');

    // Dispute Management
    Route::get('/disputes', [AdminController::class, 'disputes'])->name('disputes.index');
    Route::get('/disputes/{dispute}', [AdminController::class, 'showDispute'])->name('disputes.show');
    Route::post('/disputes/{dispute}/resolve', [AdminController::class, 'resolveDispute'])->name('disputes.resolve');

    // Settings
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');
});

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'seller'])
    ->name('dashboard');

// --- STATIC PAGES ---
Route::inertia('/about', 'Static/About')->name('about');
Route::inertia('/contact', 'Static/Contact')->name('contact');
Route::inertia('/privacy', 'Static/Privacy')->name('privacy');
Route::inertia('/terms', 'Static/Terms')->name('terms');

Route::middleware('auth')->group(function () {
    // --- FITUR AKUN (User Personal) ---
    Route::get('/aktivitas', [ProfileController::class, 'dashboard'])->name('buyer.dashboard');
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
    Route::post('/products/{product}/checkout', [TransactionController::class, 'checkout'])->name('transactions.checkout');
    Route::get('/profile/orders', [TransactionController::class, 'orders'])->name('profile.orders');
    Route::post('/transactions/{transaction}/status', [TransactionController::class, 'updateStatus'])->name('transactions.update-status');
    Route::post('/transactions/{transaction}/dispute', [TransactionController::class, 'storeDispute'])->name('transactions.dispute');

    // COD flow
    Route::post('/transactions/{transaction}/cod-confirm', [TransactionController::class, 'confirmCod'])->name('transactions.cod-confirm');
    Route::post('/transactions/{transaction}/cod-reject', [TransactionController::class, 'rejectCod'])->name('transactions.cod-reject');
    Route::post('/transactions/{transaction}/cod-seller-done', [TransactionController::class, 'sellerCompleteCod'])->name('transactions.cod-seller-done'); // Seller: tandai meetup selesai
    Route::post('/transactions/{transaction}/cod-complete', [TransactionController::class, 'completeCod'])->name('transactions.cod-complete');             // Buyer: konfirmasi final

    // --- NEGO ---
    Route::get('/profile/negotiations', [NegotiationController::class, 'index'])->name('profile.negotiations');
    Route::post('/products/{product}/negotiate', [NegotiationController::class, 'store'])->name('negotiations.store');
    Route::post('/negotiations/{negotiation}/accept', [NegotiationController::class, 'accept'])->name('negotiations.accept');
    Route::post('/negotiations/{negotiation}/reject', [NegotiationController::class, 'reject'])->name('negotiations.reject');
    Route::post('/negotiations/{negotiation}/counter', [NegotiationController::class, 'counter'])->name('negotiations.counter');
    Route::post('/negotiations/{negotiation}/accept-counter', [NegotiationController::class, 'acceptCounter'])->name('negotiations.accept-counter');
    Route::get('/seller/negotiations', [NegotiationController::class, 'sellerIndex'])->name('seller.negotiations')->middleware('seller');

    // --- REGIONS API ---
    Route::get('/api/regions/provinces', function () {
        return response()->json(cache()->rememberForever('regions_provinces', function () {
            return \Illuminate\Support\Facades\DB::table('provinces')->select('id', 'name')->get();
        }));
    })->name('api.regions.provinces');
    
    Route::get('/api/regions/regencies/{provinceId}', function ($provinceId) {
        return response()->json(cache()->rememberForever("regions_regencies_{$provinceId}", function () use ($provinceId) {
            return \Illuminate\Support\Facades\DB::table('regencies')->where('province_id', $provinceId)->select('id', 'name')->get();
        }));
    })->name('api.regions.regencies');
    
    Route::get('/api/regions/districts/{regencyId}', function ($regencyId) {
        return response()->json(cache()->rememberForever("regions_districts_{$regencyId}", function () use ($regencyId) {
            return \Illuminate\Support\Facades\DB::table('districts')->where('regency_id', $regencyId)->select('id', 'name')->get();
        }));
    })->name('api.regions.districts');
    
    Route::get('/api/regions/villages/{districtId}', function ($districtId) {
        return response()->json(cache()->rememberForever("regions_villages_{$districtId}", function () use ($districtId) {
            return \Illuminate\Support\Facades\DB::table('villages')->where('district_id', $districtId)->select('id', 'name')->get();
        }));
    })->name('api.regions.villages');
});

// --- PUBLIC PRODUCT DETAIL (Moved here to avoid conflict with /products/create) ---
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// --- FITUR TOKO (Seller Public) ---
Route::get('/store/{user}', [StoreController::class, 'show'])->name('store.show');

require __DIR__.'/auth.php';
