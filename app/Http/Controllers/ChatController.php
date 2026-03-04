<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
    // =========================================================
    // INDEX – List all chats for the authenticated user
    // =========================================================
    public function index()
    {
        $userId = Auth::id();

        $chats = Chat::where('buyer_id', $userId)
            ->orWhere('seller_id', $userId)
            ->with([
                'product',
                'buyer.profile',
                'seller.profile',
                'messages' => fn($q) => $q->latest()->limit(1),
            ])
            ->withCount([
                'messages as unread_count' => fn($q) => $q
                    ->where('sender_id', '!=', $userId)
                    ->whereNull('read_at'),
            ])
            ->orderByRaw('COALESCE(last_message_at, created_at) DESC')
            ->get();

        return view('chat.index', compact('chats'));
    }

    // =========================================================
    // SHOW – View a single chat thread
    // =========================================================
    public function show(Chat $chat)
    {
        $this->authorizeChat($chat);

        $chat->load([
            'messages.sender.profile',
            'product.images',
            'seller.profile',
            'buyer.profile',
        ]);

        // Mark opponent messages as read
        ChatMessage::where('chat_id', $chat->id)
            ->where('sender_id', '!=', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return view('chat.show', compact('chat'));
    }

    // =========================================================
    // STORE – Send a text message
    // =========================================================
    public function store(Request $request, Chat $chat)
    {
        $this->authorizeChat($chat);
        $request->validate(['message' => 'required|string|max:2000']);

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'type' => 'text',
            'message' => $request->message,
        ]);

        $message->load('sender.profile');

        return response()->json($this->formatMessage($message));
    }

    // =========================================================
    // STORE IMAGE – Upload & send an image message
    // =========================================================
    public function storeImage(Request $request, Chat $chat)
    {
        $this->authorizeChat($chat);
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:5120',
        ]);

        $path = $request->file('image')->store('chat_images', 'public');

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'type' => 'image',
            'image_path' => $path,
        ]);

        $message->load('sender.profile');

        return response()->json($this->formatMessage($message));
    }

    // =========================================================
    // INITIATE – Start a new chat from a product page
    // =========================================================
    public function initiate(Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return redirect()->back()->with('error', 'Anda tidak bisa chat dengan produk sendiri.');
        }

        $chat = Chat::firstOrCreate([
            'product_id' => $product->id,
            'buyer_id' => Auth::id(),
            'seller_id' => $product->user_id,
        ]);

        return redirect()->route('chat.show', $chat);
    }

    // =========================================================
    // HELPERS
    // =========================================================
    private function authorizeChat(Chat $chat): void
    {
        if (Auth::id() !== $chat->buyer_id && Auth::id() !== $chat->seller_id) {
            abort(403);
        }
    }

    private function formatMessage(ChatMessage $message): array
    {
        return array_merge($message->toArray(), [
            'image_url' => $message->image_path ? Storage::url($message->image_path) : null,
        ]);
    }
}