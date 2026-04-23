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
            ->with([
                'images',
                'category',
                'store' => function ($query) {
                    $query->with('profile')
                        ->withCount('transactionsAsSeller')
                        ->withAvg('reviewsAsSeller', 'rating');
                },
            ])
            ->where('availability', 'available')
            ->where('status', 'active')
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
            'store_bio' => ['nullable', 'string', 'max:1000'],
            'store_address' => ['nullable', 'string', 'max:500'],
            'store_landmark' => ['nullable', 'string', 'max:255'],
            'store_province' => ['nullable', 'string', 'max:255'],
            'store_city' => ['nullable', 'string', 'max:255'],
            'store_district' => ['nullable', 'string', 'max:255'],
            'store_village' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'store_logo' => ['nullable', 'image', 'max:2048'], // Max 2MB
        ]);

        $user = $request->user();
        $profile = $user->profile()->firstOrCreate(['user_id' => $user->id]);

        // Handle Store Logo Upload
        $logoPath = $profile->store_logo;
        if ($request->hasFile('store_logo')) {
            $file = $request->file('store_logo');
            if ($file->isValid()) {
                if ($logoPath && Storage::disk('public')->exists($logoPath)) {
                    Storage::disk('public')->delete($logoPath);
                }
                $logoPath = $file->store('avatars/store', 'public');
            }
        }

        // Update UserProfile
        $profile->update([
            'store_name' => $request->store_name,
            'store_bio' => $request->store_bio,
            'store_address' => $request->store_address,
            'store_landmark' => $request->store_landmark,
            'store_province' => $request->store_province,
            'store_city' => $request->store_city,
            'store_district' => $request->store_district,
            'store_village' => $request->store_village,
            'store_logo' => $logoPath,
        ]);

        return Redirect::back()->with('status', 'store-updated');
    }
}
