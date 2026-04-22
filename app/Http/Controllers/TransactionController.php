<?php

namespace App\Http\Controllers;

use App\Enums\TransactionStatusEnum;
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
    public function __construct()
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;
    }

    public function checkout(Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return back()->with('error', 'Anda tidak bisa membeli produk sendiri.');
        }

        // Check if transaction already exists for this product and buyer
        $existing = Transaction::where('product_id', $product->id)
            ->where('buyer_id', Auth::id())
            ->whereIn('status', [TransactionStatusEnum::PENDING, TransactionStatusEnum::PAID, TransactionStatusEnum::SHIPPED])
            ->first();

        if ($existing) {
            return redirect()->route('profile.orders')->with('info', 'Anda sudah memiliki transaksi aktif untuk produk ini.');
        }

        $reference_number = 'TRX-' . strtoupper(Str::random(10));

        $transaction = Transaction::create([
            'reference_number' => $reference_number,
            'product_id' => $product->id,
            'buyer_id' => Auth::id(),
            'seller_id' => $product->user_id,
            'price' => $product->price,
            'status' => TransactionStatusEnum::PENDING,
        ]);

        // Generate Midtrans Snap Token
        $params = [
            'transaction_details' => [
                'order_id' => $reference_number,
                'gross_amount' => (int) $product->price,
            ],
            'customer_details' => [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
            'item_details' => [
                [
                    'id' => $product->id,
                    'price' => (int) $product->price,
                    'quantity' => 1,
                    'name' => $product->title,
                ]
            ]
        ];

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $transaction->update(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            // Log error or handle gracefully
        }

        return redirect()->route('profile.orders')->with('success', 'Transaksi berhasil dibuat. Silakan lakukan pembayaran.');
    }

    public function orders()
    {
        $orders = Transaction::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile'])
            ->latest()
            ->get();

        foreach ($orders as $order) {
            if ($order->status === TransactionStatusEnum::PENDING) {
                // Jika belum ada token, atau ingin memastikan token selalu baru & unik jika expired
                if (!$order->snap_token) {
                    $this->generateSnapToken($order);
                }
            }
        }

        // Re-fetch with pagination or just pass the collection
        $orders = Transaction::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Profile/Orders', [
            'orders' => $orders
        ]);
    }

    public function storeDispute(Request $request, Transaction $transaction)
    {
        // Security check: only buyer can dispute
        if ($transaction->buyer_id !== Auth::id()) {
            abort(403);
        }

        // Status check: only shipped or paid can be disputed
        if (!in_array($transaction->status->value, ['shipped', 'paid'])) {
            return back()->with('error', 'Transaksi ini tidak dapat dikomplain.');
        }

        $request->validate([
            'reason' => 'required|in:not_delivered,not_as_described,damaged,other',
            'description' => 'required|string|min:10',
            'evidence_images' => 'required|array|min:1',
            'evidence_images.*' => 'image|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $images = [];
            if ($request->hasFile('evidence_images')) {
                foreach ($request->file('evidence_images') as $image) {
                    $images[] = $image->store('dispute_evidence', 'public');
                }
            }

            TransactionDispute::create([
                'transaction_id' => $transaction->id,
                'user_id' => Auth::id(),
                'reason' => $request->reason,
                'description' => $request->description,
                'evidence_images' => $images,
                'status' => 'pending',
            ]);

            $transaction->update([
                'status' => TransactionStatusEnum::DISPUTED,
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Komplain berhasil diajukan. Admin akan segera meninjau.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat mengajukan komplain.');
        }
    }

    public function updateStatus(Request $request, Transaction $transaction)
    {
        if ($transaction->seller_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:paid,shipped,completed,canceled'
        ]);

        $transaction->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Status transaksi berhasil diperbarui.');
    }

    public function repay(Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id() || $transaction->status !== TransactionStatusEnum::PENDING) {
            abort(403);
        }

        // Generate a new reference number to avoid "Duplicate/Expired Order ID" in Midtrans
        $new_reference = 'TRX-' . strtoupper(Str::random(10));
        $transaction->update(['reference_number' => $new_reference]);

        $token = $this->generateSnapToken($transaction);
        
        return response()->json(['snap_token' => $token]);
    }

    private function generateSnapToken(Transaction $transaction)
    {
        try {
            $params = [
                'transaction_details' => [
                    'order_id' => $transaction->reference_number,
                    'gross_amount' => (int) $transaction->price,
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
                'item_details' => [
                    [
                        'id' => $transaction->product_id,
                        'price' => (int) $transaction->price,
                        'quantity' => 1,
                        'name' => $transaction->product->title,
                    ]
                ]
            ];
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $transaction->update(['snap_token' => $snapToken]);
            return $snapToken;
        } catch (\Exception $e) {
            return null;
        }
    }

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

        $status = $request->transaction_status;

        if ($status == 'settlement' || $status == 'capture') {
            $transaction->update(['status' => TransactionStatusEnum::PAID]);
        } elseif ($status == 'pending') {
            $transaction->update(['status' => TransactionStatusEnum::PENDING]);
        } elseif ($status == 'deny' || $status == 'expire' || $status == 'cancel') {
            $transaction->update(['status' => TransactionStatusEnum::CANCELED]);
        }

        return response()->json(['message' => 'OK']);
    }
}
