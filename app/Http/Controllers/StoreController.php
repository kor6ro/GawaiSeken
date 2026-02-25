<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class StoreController extends Controller
{
    /**
     * Menampilkan Halaman Toko Publik
     */
    public function show(User $user)
    {
        $products = $user->products()->where('status', 'available')->latest()->get(); 
        
        $stats = [
            'sold' => $user->transactionsAsSeller()->count(), // Menggunakan data real dari relasi
            'rating' => 4.8, // Nanti bisa diganti logic rating real
            'joined' => $user->created_at->translatedFormat('d F Y'),
        ];

        return view('store.show', compact('user', 'products', 'stats'));
    }

    /**
     * Update Pengaturan Toko (Dashboard)
     */
    public function update(Request $request)
    {
        $request->validate([
            'store_name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:1000'],
            'address' => ['nullable', 'string', 'max:500'],
            'avatar' => ['nullable', 'image', 'max:2048'], // Max 2MB
        ]);

        $user = $request->user();

        // Handle Avatar Upload
        $avatarPath = $user->profile ? $user->profile->avatar : null;
        if ($request->hasFile('avatar')) {
            // Hapus avatar lama jika ada
            if ($avatarPath && Storage::exists('public/' . $avatarPath)) {
                Storage::delete('public/' . $avatarPath);
            }
            // Simpan yang baru
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        // Update atau Create UserProfile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'store_name' => $request->store_name,
                'bio' => $request->bio,
                'address' => $request->address,
                'avatar' => $avatarPath,
                // Pastikan 'phone' dihandle jika ada inputnya, atau biarkan existing
            ]
        );

        return Redirect::back()->with('status', 'store-updated');
    }
}