<?php

namespace App\Http\Controllers;

use App\Enums\NegotiationStatusEnum;
use App\Models\Negotiation;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NegotiationController extends Controller
{
    /**
     * Tampilkan semua negosiasi yang diajukan oleh buyer.
     */
    public function index()
    {
        $negotiations = Negotiation::where('buyer_id', Auth::id())
            ->with(['product.images', 'seller.profile'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Profile/Negotiations', [
            'negotiations' => $negotiations,
        ]);
    }

    /**
     * Buyer mengajukan penawaran harga baru.
     */
    public function store(Request $request, Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return back()->with('error', 'Anda tidak bisa menawar produk sendiri.');
        }

        if (!$product->is_negotiable) {
            return back()->with('error', 'Produk ini tidak dapat dinegosiasi.');
        }

        $request->validate([
            'proposed_price' => ['required', 'integer', 'min:1000', 'max:' . ($product->price - 1)],
            'message'        => ['nullable', 'string', 'max:500'],
        ], [
            'proposed_price.min'  => 'Harga penawaran minimal Rp 1.000.',
            'proposed_price.max'  => 'Harga penawaran harus lebih rendah dari harga produk.',
        ]);

        // Tolak jika buyer masih punya penawaran aktif untuk produk ini
        $existing = Negotiation::where('product_id', $product->id)
            ->where('buyer_id', Auth::id())
            ->whereIn('status', ['pending', 'countered'])
            ->where('expires_at', '>', now())
            ->first();

        if ($existing) {
            return back()->with('error', 'Anda masih memiliki penawaran aktif untuk produk ini.');
        }

        $negotiation = Negotiation::create([
            'product_id'     => $product->id,
            'buyer_id'       => Auth::id(),
            'seller_id'      => $product->user_id,
            'proposed_price' => $request->proposed_price,
            'status'         => NegotiationStatusEnum::PENDING,
            'message'        => $request->message,
            'expires_at'     => now()->addHours(24),
        ]);

        $this->sendNegotiationChatMessage(
            $negotiation,
            Auth::id(),
            "Saya ingin menawar produk *{$product->title}* ini seharga *Rp" . number_format($request->proposed_price, 0, ',', '.') . "*." . ($request->message ? "\n\nCatatan: {$request->message}" : "")
        );

        return back()->with('success', 'Penawaran berhasil dikirim! Seller akan merespons dalam 24 jam.');
    }

    /**
     * Seller menerima penawaran buyer.
     */
    public function accept(Negotiation $negotiation)
    {
        $this->authorizeSeller($negotiation);
        $this->assertActive($negotiation);

        $agreedPrice = $negotiation->counter_price ?? $negotiation->proposed_price;

        $negotiation->update([
            'status'       => NegotiationStatusEnum::ACCEPTED,
            'agreed_price' => $agreedPrice,
        ]);

        $this->sendNegotiationChatMessage(
            $negotiation,
            Auth::id(),
            "Saya menerima penawaran harga Anda sebesar *Rp" . number_format($agreedPrice, 0, ',', '.') . "* untuk *{$negotiation->product->title}*. Silakan lakukan checkout sekarang!"
        );

        return back()->with('success', 'Penawaran diterima! Buyer sekarang bisa melakukan checkout.');
    }

    /**
     * Seller menolak penawaran buyer.
     */
    public function reject(Request $request, Negotiation $negotiation)
    {
        $this->authorizeSeller($negotiation);
        $this->assertActive($negotiation);

        $request->validate([
            'seller_message' => ['nullable', 'string', 'max:300'],
        ]);

        $negotiation->update([
            'status'         => NegotiationStatusEnum::REJECTED,
            'seller_message' => $request->seller_message,
        ]);

        $this->sendNegotiationChatMessage(
            $negotiation,
            Auth::id(),
            "Maaf, saya belum bisa menerima penawaran Anda untuk *{$negotiation->product->title}*." . ($request->seller_message ? "\n\nCatatan: {$request->seller_message}" : "")
        );

        return back()->with('success', 'Penawaran ditolak.');
    }

    /**
     * Seller menawarkan harga balik (counter-offer).
     */
    public function counter(Request $request, Negotiation $negotiation)
    {
        $this->authorizeSeller($negotiation);
        $this->assertActive($negotiation);

        $request->validate([
            'counter_price'  => [
                'required', 'integer',
                'min:' . ($negotiation->proposed_price + 1),
                'max:' . ($negotiation->product->price - 1),
            ],
            'seller_message' => ['nullable', 'string', 'max:300'],
        ], [
            'counter_price.min' => 'Counter harga harus lebih tinggi dari harga yang ditawarkan buyer.',
            'counter_price.max' => 'Counter harga harus lebih rendah dari harga asli.',
        ]);

        $negotiation->update([
            'status'         => NegotiationStatusEnum::COUNTERED,
            'counter_price'  => $request->counter_price,
            'seller_message' => $request->seller_message,
            'expires_at'     => now()->addHours(24), // Reset timer
        ]);

        $this->sendNegotiationChatMessage(
            $negotiation,
            Auth::id(),
            "Bagaimana jika seharga *Rp" . number_format($request->counter_price, 0, ',', '.') . "* untuk *{$negotiation->product->title}*?" . ($request->seller_message ? "\n\nCatatan: {$request->seller_message}" : "")
        );

        return back()->with('success', 'Counter-offer berhasil dikirim!');
    }

    /**
     * Buyer menerima counter-offer dari seller.
     */
    public function acceptCounter(Negotiation $negotiation)
    {
        if ($negotiation->buyer_id !== Auth::id()) {
            abort(403);
        }

        if ($negotiation->status !== NegotiationStatusEnum::COUNTERED || $negotiation->isExpired()) {
            return back()->with('error', 'Counter-offer ini sudah tidak valid.');
        }

        $negotiation->update([
            'status'       => NegotiationStatusEnum::ACCEPTED,
            'agreed_price' => $negotiation->counter_price,
        ]);

        $this->sendNegotiationChatMessage(
            $negotiation,
            Auth::id(),
            "Saya setuju dengan counter-offer Anda sebesar *Rp" . number_format($negotiation->counter_price, 0, ',', '.') . "* untuk *{$negotiation->product->title}*. Saya akan segera melakukan checkout!"
        );

        return back()->with('success', 'Counter-offer diterima! Silakan lakukan checkout.');
    }

    /**
     * Tampilkan semua negosiasi masuk untuk seller (di dashboard).
     */
    public function sellerIndex()
    {
        $negotiations = Negotiation::where('seller_id', Auth::id())
            ->with(['product.images', 'buyer.profile'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Seller/Negotiations', [
            'negotiations' => $negotiations,
        ]);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private function authorizeSeller(Negotiation $negotiation): void
    {
        if ($negotiation->seller_id !== Auth::id()) {
            abort(403, 'Anda tidak memiliki akses ke negosiasi ini.');
        }
    }

    private function assertActive(Negotiation $negotiation): void
    {
        if (!$negotiation->isActive()) {
            abort(422, 'Penawaran ini sudah tidak aktif atau telah kadaluarsa.');
        }
    }

    private function sendNegotiationChatMessage(Negotiation $negotiation, $senderId, string $messageText): void
    {
        // Find or create chat for this specific product
        $chat = \App\Models\Chat::where('product_id', $negotiation->product_id)
            ->where(function($q) use ($negotiation) {
                $q->where(function($sq) use ($negotiation) {
                    $sq->where('buyer_id', $negotiation->buyer_id)->where('seller_id', $negotiation->seller_id);
                })->orWhere(function($sq) use ($negotiation) {
                    $sq->where('buyer_id', $negotiation->seller_id)->where('seller_id', $negotiation->buyer_id);
                });
            })->first();

        if (!$chat) {
            $chat = \App\Models\Chat::create([
                'product_id' => $negotiation->product_id,
                'buyer_id'   => $negotiation->buyer_id,
                'seller_id'  => $negotiation->seller_id,
            ]);
        }

        // Buat pesan
        $message = $chat->messages()->create([
            'sender_id' => $senderId,
            'type'      => 'text',
            'message'   => $messageText,
        ]);

        $chat->update(['last_message_at' => now()]);

        // Broadcast
        $message->load('sender.profile');
        $formatted = array_merge($message->toArray(), [
            'image_url' => null,
        ]);

        $recipientId = ($senderId == $negotiation->buyer_id) ? $negotiation->seller_id : $negotiation->buyer_id;
        broadcast(new \App\Events\MessageSent($formatted, $chat->id, $recipientId))->toOthers();
    }
}
