<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SellerVerification;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Tampilkan dashboard admin dengan daftar pengajuan verifikasi.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'pendingVerifications' => SellerVerification::with('user')->where('status', 'pending')->get(),
            'pendingProductsCount' => Product::where('status', 'pending')->count(),
            'pendingDisputesCount' => \App\Models\TransactionDispute::where('status', 'pending')->count(),
        ]);
    }

    /**
     * Tampilkan daftar semua produk untuk dimoderasi.
     */
    public function products(Request $request): Response
    {
        $query = Product::with(['user', 'category', 'images']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->latest()->paginate(20)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Update status moderasi produk.
     */
    public function updateProductStatus(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:active,rejected,banned'],
            'moderation_note' => ['nullable', 'string', 'max:500'],
        ]);

        $product->update([
            'status' => $request->status,
            'moderation_note' => $request->moderation_note,
        ]);

        return back()->with('success', 'Status produk berhasil diperbarui.');
    }

    /**
     * Proses persetujuan verifikasi seller.
     */
    public function approveVerification(SellerVerification $verification): RedirectResponse
    {
        $verification->update(['status' => 'approved']);
        
        $verification->user->update(['role' => 'seller']);

        return back()->with('success', 'Verifikasi seller disetujui.');
    }

    /**
     * Proses penolakan verifikasi seller.
     */
    public function rejectVerification(Request $request, SellerVerification $verification): RedirectResponse
    {
        $request->validate([
            'rejection_note' => ['required', 'string', 'max:500'],
        ]);

        $verification->update([
            'status' => 'rejected',
            'rejection_note' => $request->rejection_note,
        ]);

        return back()->with('success', 'Verifikasi seller ditolak.');
    }
    /**
     * Tampilkan daftar transaksi bermasalah.
     */
    public function disputes(): Response
    {
        return Inertia::render('Admin/Disputes/Index', [
            'disputes' => \App\Models\TransactionDispute::with(['transaction', 'user'])->latest()->paginate(20),
        ]);
    }

    /**
     * Tampilkan detail komplain.
     */
    public function showDispute(\App\Models\TransactionDispute $dispute): Response
    {
        return Inertia::render('Admin/Disputes/Show', [
            'dispute' => $dispute->load(['transaction.product.images', 'transaction.buyer.profile', 'transaction.seller.profile', 'user.profile']),
        ]);
    }

    /**
     * Putuskan resolusi dispute.
     */
    public function resolveDispute(Request $request, \App\Models\TransactionDispute $dispute): RedirectResponse
    {
        $request->validate([
            'resolution' => ['required', 'in:refund_to_buyer,release_to_seller'],
            'admin_note' => ['required', 'string', 'max:1000'],
        ]);

        $transaction = $dispute->transaction;

        if ($request->resolution === 'refund_to_buyer') {
            // Dana dikembalikan ke Buyer (Transaksi dibatalkan/refunded)
            $transaction->update(['status' => \App\Enums\TransactionStatusEnum::CANCELED]);
            $dispute->update([
                'status' => 'resolved',
                'admin_note' => $request->admin_note,
            ]);
        } else {
            // Dana diteruskan ke Seller (Transaksi dianggap selesai)
            $transaction->update(['status' => \App\Enums\TransactionStatusEnum::COMPLETED]);
            $dispute->update([
                'status' => 'closed',
                'admin_note' => $request->admin_note,
            ]);
        }

        return redirect()->route('admin.disputes.index')->with('success', 'Resolusi sengketa telah diputuskan.');
    }
}
