<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatusEnum;
use App\Models\Negotiation;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDispute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
{

    // ═══════════════════════════════════════════════════════════════
    //  CHECKOUT — Support Rekber & COD, support harga nego
    // ═══════════════════════════════════════════════════════════════

    public function checkout(Request $request, Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return back()->with('error', 'Anda tidak bisa membeli produk sendiri.');
        }

        if ($product->status !== 'active') {
            return back()->with('error', 'Produk ini sudah tidak tersedia.');
        }

        // Cek transaksi aktif yang sudah ada
        $existing = Transaction::where('product_id', $product->id)
            ->where('buyer_id', Auth::id())
            ->whereNotIn('status', [
                TransactionStatusEnum::COMPLETED->value,
                TransactionStatusEnum::CANCELED->value,
            ])
            ->first();

        if ($existing) {
            return redirect()->route('profile.orders')->with('info', 'Anda sudah memiliki transaksi aktif untuk produk ini.');
        }

        $request->validate([
            'cod_location'     => ['required', 'string', 'max:500'],
            'cod_scheduled_at' => ['required', 'date', 'after:now'],
            'negotiation_id'   => ['nullable', 'integer', 'exists:negotiations,id'],
        ]);

        // Resolusi harga — cek nego yang sudah diterima
        $negotiation = null;
        $finalPrice  = $product->price;

        if ($request->negotiation_id) {
            $negotiation = Negotiation::where('id', $request->negotiation_id)
                ->where('product_id', $product->id)
                ->where('buyer_id', Auth::id())
                ->where('status', 'accepted')
                ->first();

            if (!$negotiation) {
                return back()->with('error', 'Penawaran nego tidak valid atau belum diterima seller.');
            }
            $finalPrice = (float) $negotiation->agreed_price;
        }

        // ── COD: user-to-user langsung, TIDAK ada biaya layanan platform ──
        $reference_number = 'COD-' . strtoupper(Str::random(10));
        Transaction::create([
            'reference_number' => $reference_number,
            'negotiation_id'   => $negotiation?->id,
            'product_id'       => $product->id,
            'buyer_id'         => Auth::id(),
            'seller_id'        => $product->user_id,
            'price'            => $finalPrice,
            'cod_location'     => $request->cod_location,
            'cod_scheduled_at' => $request->cod_scheduled_at,
            'status'           => TransactionStatusEnum::COD_REQUESTED,
        ]);
        
        return redirect()->route('profile.orders')->with('success', 'Permintaan COD berhasil dikirim! Tunggu konfirmasi dari seller.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  RIWAYAT PESANAN — Buyer
    // ═══════════════════════════════════════════════════════════════

    public function orders()
    {
        $orders = Transaction::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile', 'negotiation'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Profile/Orders', [
            'orders' => $orders,
        ]);
    }



    // ═══════════════════════════════════════════════════════════════
    //  ALUR COD — Seller konfirmasi kesediaan meetup
    // ═══════════════════════════════════════════════════════════════

    public function confirmCod(Request $request, Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::COD_REQUESTED) {
            return back()->with('error', 'Status transaksi tidak valid untuk dikonfirmasi.');
        }

        $request->validate([
            'cod_location'     => ['sometimes', 'string', 'max:500'],
            'cod_scheduled_at' => ['sometimes', 'date'],
            'seller_notes'     => ['nullable', 'string', 'max:500'],
        ]);

        $transaction->update([
            'status'           => TransactionStatusEnum::COD_CONFIRMED,
            'cod_location'     => $request->cod_location ?? $transaction->cod_location,
            'cod_scheduled_at' => $request->cod_scheduled_at ?? $transaction->cod_scheduled_at,
            'seller_notes'     => $request->seller_notes,
        ]);

        return back()->with('success', 'COD dikonfirmasi! Detail meetup sudah dikirim ke buyer.');
    }

    /**
     * Seller menolak permintaan COD dari buyer.
     */
    public function rejectCod(Request $request, Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::COD_REQUESTED) {
            return back()->with('error', 'Status transaksi tidak valid.');
        }

        $transaction->update([
            'status'       => TransactionStatusEnum::CANCELED,
            'seller_notes' => $request->seller_notes,
        ]);

        return back()->with('success', 'Permintaan COD ditolak.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  ALUR COD — Seller tandai meetup selesai → Buyer konfirmasi
    // ═══════════════════════════════════════════════════════════════

    /**
     * Seller menandai bahwa meetup sudah terjadi dan uang sudah diterima.
     * Status berubah ke COD_MEETUP_DONE, menunggu konfirmasi buyer.
     */
    public function sellerCompleteCod(Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::COD_CONFIRMED) {
            return back()->with('error', 'Status COD tidak valid. Harus sudah dikonfirmasi jadwal terlebih dahulu.');
        }

        $transaction->update([
            'status'              => TransactionStatusEnum::COD_MEETUP_DONE,
            'seller_confirmed_at' => now(),
        ]);

        return back()->with('success', 'Meetup ditandai selesai. Menunggu konfirmasi dari buyer.');
    }

    /**
     * Buyer mengkonfirmasi bahwa barang sudah diterima dan pembayaran sudah dilakukan.
     * Ini adalah langkah FINAL — transaksi selesai.
     */
    public function completeCod(Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::COD_MEETUP_DONE) {
            return back()->with('error', 'Tunggu seller menandai meetup selesai terlebih dahulu.');
        }

        $transaction->update([
            'status'             => TransactionStatusEnum::COMPLETED,
            'buyer_confirmed_at' => now(),
        ]);

        $transaction->product->update(['availability' => 'sold']);

        return back()->with('success', 'Transaksi COD selesai! Terima kasih telah bertransaksi di GawaiSeken.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  DISPUTE
    // ═══════════════════════════════════════════════════════════════

    public function storeDispute(Request $request, Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id()) abort(403);

        if (!in_array($transaction->status->value, ['shipped', 'paid', 'delivered'])) {
            return back()->with('error', 'Transaksi ini tidak dapat dikomplain.');
        }

        $request->validate([
            'reason'           => 'required|in:not_delivered,not_as_described,damaged,other',
            'description'      => 'required|string|min:10',
            'evidence_images'  => 'required|array|min:1',
            'evidence_images.*' => 'image|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $images = [];
            foreach ($request->file('evidence_images') ?? [] as $image) {
                // Check isValid() and getRealPath() to avoid ValueError on PHP 8.4
                if ($image->isValid() && $image->getRealPath()) {
                    $images[] = $image->store('dispute_evidence', 'public');
                }
            }

            TransactionDispute::create([
                'transaction_id'  => $transaction->id,
                'user_id'         => Auth::id(),
                'reason'          => $request->reason,
                'description'     => $request->description,
                'evidence_images' => $images,
                'status'          => 'pending',
            ]);

            $transaction->update(['status' => TransactionStatusEnum::DISPUTED]);
            DB::commit();

            return back()->with('success', 'Komplain berhasil diajukan. Admin akan segera meninjau.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat mengajukan komplain.');
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  UPDATE STATUS (Seller — untuk keperluan lain)
    // ═══════════════════════════════════════════════════════════════

    public function updateStatus(Request $request, Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) abort(403);

        $request->validate([
            'status' => 'required|in:processing,canceled',
        ]);

        $transaction->update(['status' => $request->status]);

        return back()->with('success', 'Status transaksi berhasil diperbarui.');
    }

}
