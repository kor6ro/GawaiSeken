<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Dashboard Aktivitas Pembeli (Keranjang, Penawaran, Pesanan).
     */
    public function dashboard(Request $request): Response
    {
        $user = $request->user();

        // 1. Keranjang (Favorit)
        $favoriteIds = $user->favorites ?? [];
        $favorites = \App\Models\Product::whereIn('id', $favoriteIds)
            ->with(['images', 'user.profile', 'category'])
            ->get();

        // 2. Penawaran (Negotiations as Buyer)
        $negotiations = \App\Models\Negotiation::where('buyer_id', $user->id)
            ->with(['product.images', 'seller.profile'])
            ->latest()
            ->get();

        // 3. Pesanan (Transactions as Buyer)
        $orders = \App\Models\Transaction::where('buyer_id', $user->id)
            ->with(['product.images', 'seller.profile', 'negotiation'])
            ->latest()
            ->get();

        return Inertia::render('Buyer/Dashboard', [
            'favorites' => $favorites,
            'negotiations' => $negotiations,
            'orders' => $orders,
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $request->user()->profile,
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Handle Personal Avatar Upload
        $profile = $user->profile()->firstOrCreate(['user_id' => $user->id]);
        $avatarPath = $profile->avatar;

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            // Check isValid() and getRealPath() to avoid ValueError on PHP 8.4
            if ($file->isValid() && $file->getRealPath()) {
                if ($avatarPath && Storage::disk('public')->exists($avatarPath)) {
                    Storage::disk('public')->delete($avatarPath);
                }
                $avatarPath = $file->store('avatars/personal', 'public');
            }
        }

        // Update profile data
        $profile->update(array_merge(
            $request->only(['address', 'province', 'city', 'district', 'village', 'landmark', 'date_of_birth', 'gender', 'phone', 'bio']),
            ['avatar' => $avatarPath]
        ));

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Upgrade user account to seller.
     */
    public function upgradeToSeller(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->role !== 'seller') {
            $user->role = 'seller';
            $user->save();
        }

        return Redirect::back()->with('success', 'Akun berhasil ditingkatkan menjadi Akun Penjual!');
    }
}
