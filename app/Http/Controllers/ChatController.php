<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\Product;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        
        $chats = Chat::where('buyer_id', $userId)
            ->orWhere('seller_id', $userId)
            ->with(['product', 'buyer', 'seller', 'messages' => function($query) {
                $query->latest();
            }])
            ->get()
            ->sortByDesc(function($chat) {
                return $chat->messages->first()?->created_at ?? $chat->created_at;
            });

        return view('chat.index', compact('chats'));
    }

    public function show(Chat $chat)
    {
        // 1. Validasi Akses
        if (Auth::id() !== $chat->buyer_id && Auth::id() !== $chat->seller_id) {
            abort(403);
        }

        // 2. Load Relasi
        // Kita load user pada message untuk avatar kecil di sebelah chat (opsional)
        $chat->load(['messages.sender.profile', 'product', 'seller.profile', 'buyer.profile']);
        
        // 3. Mark as Read (Tandai pesan dari lawan sebagai terbaca)
        ChatMessage::where('chat_id', $chat->id)
            ->where('sender_id', '!=', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return view('chat.show', compact('chat'));
    }

    public function store(Request $request, Chat $chat)
    {
        $request->validate(['message' => 'required|string|max:2000']);

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'message' => $request->message,
        ]);

        // Pastikan Event MessageSent sudah dibuat dan dikonfigurasi dengan benar
        // broadcast(new MessageSent($message))->toOthers();

        // Load sender profile untuk dikirim balik sebagai JSON (jika butuh avatar di JS)
        $message->load('sender.profile');

        return response()->json($message);
    }

    public function initiate(Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return redirect()->back()->with('error', 'Anda tidak bisa chat produk sendiri.');
        }

        $chat = Chat::firstOrCreate(
            [
                'product_id' => $product->id,
                'buyer_id' => Auth::id(),
                'seller_id' => $product->user_id,
            ]
        );

        return redirect()->route('chat.show', $chat);
    }
}