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
            'totalUsersCount' => User::count(),
            'totalProductsCount' => Product::count(),
        ]);
    }

    /**
     * Tampilkan daftar semua produk untuk dimoderasi.
     */
    public function products(Request $request): Response
    {
        $query = Product::with(['user.profile', 'category', 'images']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhereHas('user', function($qu) use ($request) {
                      $qu->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        $sortBy = $request->get('sort_by', 'id');
        $sortDir = $request->get('sort_dir', 'desc');

        // Validasi kolom sort
        if (!in_array($sortBy, ['id', 'title', 'price', 'status', 'created_at'])) {
            $sortBy = 'id';
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->orderBy($sortBy, $sortDir)->paginate(20)->withQueryString(),
            'filters' => $request->only(['status', 'search', 'sort_by', 'sort_dir']),
        ]);
    }

    /**
     * Hapus produk oleh admin (Hold/Delete).
     */
    public function destroyProduct(Product $product): RedirectResponse
    {
        // Hapus file fisik
        if ($product->images->isNotEmpty()) {
            foreach ($product->images as $image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus secara permanen oleh Admin.');
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
    /**
     * Tampilkan daftar semua user.
     */
    public function users(Request $request): Response
    {
        $query = User::withCount('products')->with('profile');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        $sortBy = $request->get('sort_by', 'id');
        $sortDir = $request->get('sort_dir', 'asc');

        // Validasi kolom sort
        if (!in_array($sortBy, ['id', 'name', 'email', 'role', 'products_count', 'is_suspended', 'created_at'])) {
            $sortBy = 'id';
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $query->orderBy($sortBy, $sortDir)->paginate(20)->withQueryString(),
            'filters' => $request->only(['search', 'role', 'sort_by', 'sort_dir']),
        ]);
    }

    /**
     * Suspend user.
     */
    public function suspendUser(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'suspension_reason' => ['required', 'string', 'max:500'],
        ]);

        $user->update([
            'is_suspended' => true,
            'suspension_reason' => $request->suspension_reason,
        ]);

        return back()->with('success', 'User berhasil disuspensi.');
    }

    /**
     * Unsuspend user.
     */
    public function unsuspendUser(User $user): RedirectResponse
    {
        $user->update([
            'is_suspended' => false,
            'suspension_reason' => null,
        ]);

        return back()->with('success', 'Suspensi user berhasil dicabut.');
    }
}
