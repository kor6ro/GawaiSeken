<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $products = Product::with(['images', 'category', 'seller.profile'])
                ->where('status', 'available')
                ->latest()
                ->paginate(12);

    return view('home', compact('products'));
})->name('home');

// Dashboard hanya untuk Seller
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified', 'seller'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/upgrade', [ProfileController::class, 'upgradeToSeller'])->name('profile.upgrade');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';