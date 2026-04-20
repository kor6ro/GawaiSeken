<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    /**
     * Menampilkan Halaman Toko Publik
     */
    public function show(User $user): Response
    {
        $user->load('profile');

        $isMobile = preg_match('/Mobile|Android|iPhone/i', request()->userAgent());
        $perPage = $isMobile ? 8 : 15;

        $products = $user->products()
            ->with(['images', 'category', 'seller.profile'])
            ->where('status', 'available')
            ->latest()
            ->paginate($perPage);

        $reviews = \App\Models\Review::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['buyer', 'product'])->latest()->get();

        $rating = $reviews->count() > 0 ? $reviews->avg('rating') : 0;

        $stats = [
            'sold' => $user->transactionsAsSeller()->where('status', 'completed')->count(),
            'rating' => (float) $rating,
            'joined' => $user->created_at->translatedFormat('d F Y'),
            'is_premium' => $user->is_premium,
        ];

        return Inertia::render('Store/Show', [
            'seller' => $user,
            'products' => $products,
            'stats' => $stats,
            'reviews' => $reviews,
        ]);
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
            'city' => ['nullable', 'string', 'max:100'],
            'avatar' => ['nullable', 'image', 'max:2048'], // Max 2MB
        ]);

        $user = $request->user();

        // Handle Avatar Upload
        $avatarPath = $user->profile ? $user->profile->avatar : null;
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            if ($file->isValid()) {
                // Hapus avatar lama jika ada
                if ($avatarPath && Storage::disk('public')->exists($avatarPath)) {
                    Storage::disk('public')->delete($avatarPath);
                }

                // Simpan yang baru dengan cara yang lebih resilient (seperti di ProductController)
                $tempPath = $file->getRealPath() ?: $file->getPathname();
                $fileName = $file->hashName();
                $avatarPath = "avatars/{$fileName}";

                $stream = fopen($tempPath, 'r');
                Storage::disk('public')->put($avatarPath, $stream);
                if (is_resource($stream)) {
                    fclose($stream);
                }
            }
        }

        // Update atau Create UserProfile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'store_name' => $request->store_name,
                'bio' => $request->bio,
                'address' => $request->address,
                'city' => $request->city,
                'avatar' => $avatarPath,
            ]
        );

        return Redirect::back()->with('status', 'store-updated');
    }
}
