<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\SellerVerification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SellerVerificationController extends Controller
{
    /**
     * Tampilkan halaman form verifikasi seller.
     */
    public function create(): Response
    {
        return Inertia::render('Profile/VerifySeller', [
            'verification' => auth()->user()->sellerVerification,
        ]);
    }

    /**
     * Simpan dokumen verifikasi (KYC).
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'ktp_image' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'face_image' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $user = auth()->user();

        // Hapus file lama jika ada
        if ($user->sellerVerification) {
            Storage::disk('public')->delete([
                $user->sellerVerification->ktp_image_path,
                $user->sellerVerification->face_image_path
            ]);
        }

        // Simpan file baru ke storage/app/public/kyc
        $ktpPath = $request->file('ktp_image')->store('kyc/ktp', 'public');
        $facePath = $request->file('face_image')->store('kyc/face', 'public');

        SellerVerification::updateOrCreate(
            ['user_id' => $user->id],
            [
                'ktp_image_path' => $ktpPath,
                'face_image_path' => $facePath,
                'status' => 'pending',
                'rejection_note' => null,
            ]
        );

        return back()->with('success', 'Dokumen KYC berhasil diunggah. Mohon tunggu verifikasi admin.');
    }
}
