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

        $ktp = $request->file('ktp_image');
        $face = $request->file('face_image');

        // Debugging & robust check
        if (!$ktp->isValid()) {
            return back()->withErrors(['ktp_image' => 'Upload KTP gagal: ' . $ktp->getErrorMessage()]);
        }
        if (!$face->isValid()) {
            return back()->withErrors(['face_image' => 'Upload Selfie gagal: ' . $face->getErrorMessage()]);
        }

        $ktpTmp = $ktp->getPathname();
        $faceTmp = $face->getPathname();

        if (!is_readable($ktpTmp) || !is_readable($faceTmp)) {
            return back()->withErrors(['ktp_image' => 'File sementara tidak dapat dibaca oleh server.']);
        }

        // Hapus file lama jika ada
        if ($user->sellerVerification) {
            $oldPaths = array_filter([
                $user->sellerVerification->ktp_image_path,
                $user->sellerVerification->face_image_path
            ]);

            if (!empty($oldPaths)) {
                Storage::disk('public')->delete($oldPaths);
            }
        }

        // Simpan file menggunakan put() untuk menghindari getRealPath() yang mungkin bermasalah di Windows
        try {
            $ktpName = 'kyc/ktp/' . $ktp->hashName();
            $faceName = 'kyc/face/' . $face->hashName();

            Storage::disk('public')->put($ktpName, file_get_contents($ktpTmp));
            Storage::disk('public')->put($faceName, file_get_contents($faceTmp));

            SellerVerification::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'ktp_image_path' => $ktpName,
                    'face_image_path' => $faceName,
                    'status' => 'pending',
                    'rejection_note' => null,
                ]
            );

            return back()->with('success', 'Dokumen KYC berhasil diunggah. Mohon tunggu verifikasi admin.');
        } catch (\Exception $e) {
            return back()->withErrors(['ktp_image' => 'Gagal menyimpan file: ' . $e->getMessage()]);
        }
    }
}
