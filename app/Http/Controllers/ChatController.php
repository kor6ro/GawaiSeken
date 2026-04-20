<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    // =========================================================
    // INDEX – List all chats for the authenticated user
    // =========================================================
    public function index(): Response
    {
        $userId = Auth::id();

        $chats = Chat::query()->where('buyer_id', '=', $userId)
            ->orWhere('seller_id', '=', $userId)
            ->with([
                'product.images',
                'buyer.profile',
                'seller.profile',
                'messages' => fn ($q) => $q->latest()->limit(1),
            ])
            ->withCount([
                'messages as unread_count' => fn ($q) => $q
                    ->where('sender_id', '!=', $userId)
                    ->whereNull('read_at'),
            ])
            ->orderByRaw('COALESCE(last_message_at, created_at) DESC')
            ->get();

        return Inertia::render('Chat/Index', [
            'chats' => $chats,
        ]);
    }

    // =========================================================
    // SHOW – View a single chat thread
    // =========================================================
    public function show($id): Response|\Illuminate\Http\RedirectResponse
    {
        if (str_starts_with($id, 'product-')) {
            $productId = str_replace('product-', '', $id);
            $product = Product::with(['images', 'user.profile'])->findOrFail($productId);

            // Check if chat already exists anyway
            $chat = Chat::query()->where('product_id', '=', $product->id)
                ->where('buyer_id', '=', Auth::id())
                ->first(['*']);

            if ($chat) {
                return redirect()->route('chat.show', $chat);
            }

            // Create a virtual chat object
            $chat = new Chat([
                'product_id' => $product->id,
                'buyer_id' => Auth::id(),
                'seller_id' => $product->user_id,
            ]);

            // Set relations for the view
            $chat->setRelation('product', $product);
            $chat->setRelation('seller', $product->user);
            $chat->setRelation('buyer', Auth::user());
            $chat->setRelation('messages', collect());

            $isNewChat = true;
        } else {
            $chat = Chat::with([
                'messages.sender.profile',
                'product.images',
                'seller.profile',
                'buyer.profile',
            ])->findOrFail($id);

            $this->authorizeChat($chat);

            // Mark opponent messages as read
            $updated = ChatMessage::query()->where('chat_id', '=', $chat->id)
                ->where('sender_id', '!=', Auth::id())
                ->whereNull('read_at')
                ->update(['read_at' => now()]);

            if ($updated > 0) {
                broadcast(new \App\Events\MessageRead($chat->id))->toOthers();
            }

            $isNewChat = false;
        }

        return Inertia::render('Chat/Show', [
            'chat' => $chat,
            'isNewChat' => $isNewChat,
        ]);
    }

    // =========================================================
    // STORE – Send a text message
    // =========================================================
    public function store(Request $request, $id)
    {
        if (str_starts_with($id, 'product-')) {
            $productId = str_replace('product-', '', $id);
            $product = Product::findOrFail($productId);

            $chat = Chat::firstOrCreate([
                'product_id' => $product->id,
                'buyer_id' => Auth::id(),
                'seller_id' => $product->user_id,
            ]);
        } else {
            $chat = Chat::findOrFail($id);
            $this->authorizeChat($chat);
        }

        $request->validate(['message' => 'required|string|max:2000']);

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'type' => 'text',
            'message' => $request->input('message'),
        ]);

        $chat->update(['last_message_at' => now()]);

        $message->load('sender.profile');
        $formatted = $this->formatMessage($message);

        broadcast(new \App\Events\MessageSent($formatted, $chat->id))->toOthers();

        return response()->json($formatted);
    }

    public function storeImage(Request $request, $id)
    {
        if (str_starts_with($id, 'product-')) {
            $productId = str_replace('product-', '', $id);
            $product = Product::findOrFail($productId);

            $chat = Chat::firstOrCreate([
                'product_id' => $product->id,
                'buyer_id' => Auth::id(),
                'seller_id' => $product->user_id,
            ]);
        } else {
            $chat = Chat::findOrFail($id);
            $this->authorizeChat($chat);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:5120',
        ]);

        $path = $request->file('image')->store('chat_images', 'public');

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'type' => 'image',
            'image_path' => $path,
        ]);

        $chat->update(['last_message_at' => now()]);

        $message->load('sender.profile');
        $formatted = $this->formatMessage($message);

        broadcast(new \App\Events\MessageSent($formatted, $chat->id))->toOthers();

        return response()->json($formatted);
    }

    // =========================================================
    // INITIATE – Start a new chat from a product page
    // =========================================================
    public function initiate(Product $product)
    {
        if (Auth::id() === $product->user_id) {
            return redirect()->back()->with('error', 'Anda tidak bisa chat dengan produk sendiri.');
        }

        return redirect()->route('chat.show', ['chat' => 'product-'.$product->id]);
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

    // =========================================================
    // MARK AS READ – Update read receipts dynamically
    // =========================================================
    public function markAsRead($id)
    {
        $chat = Chat::findOrFail($id);
        $this->authorizeChat($chat);

        $updated = ChatMessage::query()->where('chat_id', '=', $chat->id)
            ->where('sender_id', '!=', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        if ($updated > 0) {
            broadcast(new \App\Events\MessageRead($chat->id))->toOthers();
        }

        return response()->json(['success' => true]);
    }
}
