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
use Midtrans\Config as MidtransConfig;
use Midtrans\Transaction as MidtransTransaction;
use Midtrans\Snap as MidtransSnap;

class TransactionController extends Controller
{
    public function __construct()
    {
        MidtransConfig::$serverKey = config('services.midtrans.server_key');
        MidtransConfig::$isProduction = config('services.midtrans.is_production');
        MidtransConfig::$isSanitized = true;
        MidtransConfig::$is3ds = true;
    }

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
            'payment_method'   => ['required', 'in:rekber,cod'],
            'shipping_address' => ['required_if:payment_method,rekber', 'nullable', 'string', 'max:1000'],
            'cod_location'     => ['required_if:payment_method,cod', 'nullable', 'string', 'max:500'],
            'cod_scheduled_at' => ['required_if:payment_method,cod', 'nullable', 'date', 'after:now'],
            'negotiation_id'   => ['nullable', 'integer', 'exists:negotiations,id'],
        ]);

        $rekberEnabled = \App\Models\Setting::where('key', 'rekber_enabled')->value('value') === '1';
        if ($request->payment_method === 'rekber' && !$rekberEnabled) {
            return back()->with('error', 'Fitur Rekber saat ini sedang dalam pemeliharaan (maintenance) dan tidak dapat digunakan.');
        }

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

        // Fee: Rp 5.000 + 1% dari harga akhir, maksimal Rp 25.000
        $service_fee  = min(5000 + (int)($finalPrice * 0.01), 25000);
        $total_amount = $finalPrice + $service_fee;
        $reference_number = 'TRX-' . strtoupper(Str::random(10));

        $transactionData = [
            'reference_number' => $reference_number,
            'negotiation_id'   => $negotiation?->id,
            'product_id'       => $product->id,
            'buyer_id'         => Auth::id(),
            'seller_id'        => $product->user_id,
            'price'            => $finalPrice,
            'service_fee'      => $service_fee,
            'total_amount'     => $total_amount,
            'payment_method'   => $request->payment_method,
            'shipping_address' => $request->shipping_address,
            'cod_location'     => $request->cod_location,
            'cod_scheduled_at' => $request->cod_scheduled_at,
        ];

        if ($request->payment_method === 'cod') {
            $transactionData['status'] = TransactionStatusEnum::COD_REQUESTED;
            Transaction::create($transactionData);
            return redirect()->route('profile.orders')->with('success', 'Permintaan COD berhasil dikirim! Tunggu konfirmasi dari seller.');
        }

        // Rekber: buat transaksi dan generate Snap Token
        $transactionData['status'] = TransactionStatusEnum::PENDING;
        $transaction = Transaction::create($transactionData);
        $this->generateSnapToken($transaction);

        return redirect()->route('profile.orders')->with('success', 'Transaksi berhasil dibuat. Silakan lakukan pembayaran.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  RIWAYAT PESANAN — Buyer
    // ═══════════════════════════════════════════════════════════════

    public function orders()
    {
        $orders = Transaction::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile', 'negotiation'])
            ->latest()
            ->get();

        foreach ($orders as $order) {
            if ($order->status === TransactionStatusEnum::PENDING && $order->payment_method === 'rekber') {
                try {
                    $status = (object) MidtransTransaction::status($order->reference_number);
                    if ($status && isset($status->transaction_status)) {
                        $this->syncStatus($order, $status->transaction_status);
                    }
                } catch (\Exception $e) {
                    // Transaksi belum ada di Midtrans
                }

                if (!$order->snap_token) {
                    $this->generateSnapToken($order);
                }
            }
        }

        $orders = Transaction::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile', 'negotiation'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Profile/Orders', [
            'orders' => $orders,
        ]);
    }

    // ═══════════════════════════════════════════════════════════════
    //  ALUR REKBER — Seller input resi
    // ═══════════════════════════════════════════════════════════════

    public function confirmShipment(Request $request, Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::PAID) {
            return back()->with('error', 'Transaksi harus berstatus PAID sebelum bisa mengirim barang.');
        }

        $request->validate([
            'tracking_number' => ['required', 'string', 'max:100'],
            'courier_name'    => ['required', 'string', 'max:100'],
            'seller_notes'    => ['nullable', 'string', 'max:500'],
        ]);

        $transaction->update([
            'status'          => TransactionStatusEnum::SHIPPED,
            'tracking_number' => $request->tracking_number,
            'courier_name'    => $request->courier_name,
            'seller_notes'    => $request->seller_notes,
        ]);

        return back()->with('success', 'Resi pengiriman berhasil disimpan. Buyer akan dikonfirmasi.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  ALUR REKBER — Buyer konfirmasi terima barang
    // ═══════════════════════════════════════════════════════════════

    public function confirmDelivery(Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id()) abort(403);

        if ($transaction->status !== TransactionStatusEnum::SHIPPED) {
            return back()->with('error', 'Barang belum dalam status dikirim.');
        }

        $transaction->update([
            'status'             => TransactionStatusEnum::COMPLETED,
            'buyer_confirmed_at' => now(),
        ]);

        // Update produk menjadi sold dan dikunci agar tidak bisa diedit/dihapus
        $transaction->product->update(['availability' => 'sold']);

        return back()->with('success', 'Terima kasih! Transaksi selesai dan dana akan diteruskan ke penjual.');
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
            'cod_scheduled_at' => ['sometimes', 'date', 'after:now'],
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
    //  ALUR COD — Keduanya konfirmasi setelah meetup terjadi
    // ═══════════════════════════════════════════════════════════════

    public function completeCod(Transaction $transaction)
    {
        // Buyer dan seller bisa trigger ini
        if ($transaction->buyer_id !== Auth::id() && $transaction->seller_id !== Auth::id()) {
            abort(403);
        }

        if ($transaction->status !== TransactionStatusEnum::COD_CONFIRMED) {
            return back()->with('error', 'COD belum dikonfirmasi seller.');
        }

        $transaction->update([
            'status'             => TransactionStatusEnum::COMPLETED,
            'buyer_confirmed_at' => now(),
        ]);

        $transaction->product->update(['status' => 'sold']);

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

    // ═══════════════════════════════════════════════════════════════
    //  REPAY — Regenerate Snap Token yang expired
    // ═══════════════════════════════════════════════════════════════

    public function repay(Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id() || $transaction->status !== TransactionStatusEnum::PENDING) {
            abort(403);
        }

        $new_reference = 'TRX-' . strtoupper(Str::random(10));
        $transaction->update(['reference_number' => $new_reference]);
        $token = $this->generateSnapToken($transaction);

        return response()->json(['snap_token' => $token]);
    }

    // ═══════════════════════════════════════════════════════════════
    //  MIDTRANS CALLBACK
    // ═══════════════════════════════════════════════════════════════

    public function callback(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($hashed !== $request->signature_key) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $transaction = Transaction::where('reference_number', $request->order_id)->first();
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $this->syncStatus($transaction, $request->transaction_status);
        return response()->json(['message' => 'OK']);
    }

    public function syncStatus(Transaction $transaction, string $midtransStatus)
    {
        if ($midtransStatus == 'settlement' || $midtransStatus == 'capture') {
            $transaction->update(['status' => TransactionStatusEnum::PAID]);
        } elseif ($midtransStatus == 'pending') {
            $transaction->update(['status' => TransactionStatusEnum::PENDING]);
        } elseif (in_array($midtransStatus, ['deny', 'expire', 'cancel'])) {
            $transaction->update(['status' => TransactionStatusEnum::CANCELED]);
        }
    }

    public function simulatePayment(Transaction $transaction)
    {
        if (config('app.env') !== 'local') abort(403);
        $transaction->update(['status' => TransactionStatusEnum::PAID]);
        return back()->with('success', '[SIMULASI] Pembayaran berhasil disimulasi.');
    }

    // ═══════════════════════════════════════════════════════════════
    //  PRIVATE HELPERS
    // ═══════════════════════════════════════════════════════════════

    private function generateSnapToken(Transaction $transaction): ?string
    {
        try {
            $params = [
                'transaction_details' => [
                    'order_id'     => $transaction->reference_number,
                    'gross_amount' => (int) $transaction->total_amount,
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->name,
                    'email'      => Auth::user()->email,
                ],
                'item_details' => [
                    [
                        'id'       => $transaction->product_id,
                        'price'    => (int) $transaction->price,
                        'quantity' => 1,
                        'name'     => Str::limit($transaction->product->title, 45),
                    ],
                    [
                        'id'       => 'service-fee',
                        'price'    => (int) $transaction->service_fee,
                        'quantity' => 1,
                        'name'     => 'Biaya Layanan GawaiSeken',
                    ],
                ],
            ];
            $snapToken = MidtransSnap::getSnapToken($params);
            $transaction->update(['snap_token' => $snapToken]);
            return $snapToken;
        } catch (\Exception $e) {
            return null;
        }
    }
}
