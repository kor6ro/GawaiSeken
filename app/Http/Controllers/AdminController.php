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
    public function dashboard(Request $request): Response
    {
        // 1. Stats Summary
        $stats = [
            'pendingVerificationsCount' => SellerVerification::where('status', 'pending')->count(),
            'pendingProductsCount' => Product::where('status', 'pending')->count(),
            'pendingDisputesCount' => \App\Models\TransactionDispute::where('status', 'pending')->count(),
            'totalUsersCount' => User::count(),
            'totalProductsCount' => Product::count(),
        ];

        // 2. Pending Verifications (KYC)
        $pendingVerifications = SellerVerification::with('user')->where('status', 'pending')->get();

        // 3. Products Management
        $productsQuery = Product::with(['user.profile', 'category', 'images']);
        if ($request->filled('p_status')) {
            $productsQuery->where('status', $request->p_status);
        }
        if ($request->filled('p_search')) {
            $productsQuery->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->p_search . '%')
                  ->orWhereHas('user', function($qu) use ($request) {
                      $qu->where('name', 'like', '%' . $request->p_search . '%');
                  });
            });
        }
        $products = $productsQuery->latest()->paginate(10, ['*'], 'p_page')->withQueryString();

        // 4. Users Management
        $usersQuery = User::withCount('products')->with('profile');
        if ($request->filled('u_search')) {
            $usersQuery->where('name', 'like', '%' . $request->u_search . '%')
                  ->orWhere('email', 'like', '%' . $request->u_search . '%');
        }
        if ($request->filled('u_role')) {
            $usersQuery->where('role', $request->u_role);
        }
        $users = $usersQuery->latest()->paginate(10, ['*'], 'u_page')->withQueryString();

        // 5. Disputes Management
        $disputes = \App\Models\TransactionDispute::with(['transaction', 'user'])->latest()->paginate(10, ['*'], 'd_page')->withQueryString();

        return Inertia::render('Admin/Dashboard', array_merge($stats, [
            'pendingVerifications' => $pendingVerifications,
            'products' => $products,
            'users' => $users,
            'disputes' => $disputes,
            'filters' => $request->only(['p_status', 'p_search', 'u_search', 'u_role']),
        ]));
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
