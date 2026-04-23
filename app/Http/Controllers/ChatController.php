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

        // Get unique chats between the current user and others
        $chats = Chat::query()
            ->where('buyer_id', '=', $userId)
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
    public function show(Request $request, $id): Response|\Illuminate\Http\RedirectResponse
    {
        $userId = Auth::id();
        $contextProduct = null;

        if (str_starts_with($id, 'product-')) {
            $productId = str_replace('product-', '', $id);
            $contextProduct = Product::with(['images', 'user.profile'])->findOrFail($productId);
            $sellerId = $contextProduct->user_id;

            if ($sellerId === $userId) {
                return redirect()->route('home')->with('error', 'Anda tidak bisa chat dengan produk sendiri.');
            }

            // Find existing chat between these two users for THIS specific product
            $chat = Chat::where('product_id', $productId)
                ->where(function($q) use ($userId, $sellerId) {
                    $q->where(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $userId)->where('seller_id', $sellerId);
                    })->orWhere(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $sellerId)->where('seller_id', $userId);
                    });
                })
                ->first();

            if ($chat) {
                return redirect()->route('chat.show', ['chat' => $chat->id]);
            }

            // Create a virtual chat object
            $chat = new Chat([
                'product_id' => $contextProduct->id,
                'buyer_id' => $userId,
                'seller_id' => $sellerId,
            ]);

            $chat->setRelation('product', $contextProduct);
            $chat->setRelation('seller', $contextProduct->user);
            $chat->setRelation('buyer', Auth::user());
            $chat->setRelation('messages', collect());

            $isNewChat = true;
        } else {
            $chat = Chat::with([
                'messages' => fn ($q) => $q->orderBy('created_at', 'asc')->with('sender.profile'),
                'product.images',
                'seller.profile',
                'buyer.profile',
            ])->findOrFail($id);

            $this->authorizeChat($chat);

            // Set context product from query param or chat's original product
            if ($request->has('product_id')) {
                $contextProduct = Product::with(['images', 'user.profile'])->find($request->query('product_id'));
            } else if ($chat->product_id) {
                $contextProduct = $chat->product;
            }

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
            'contextProduct' => $contextProduct,
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
            $userId = Auth::id();
            $sellerId = $product->user_id;

            // Find existing chat for this product
            $chat = Chat::where('product_id', $productId)
                ->where(function($q) use ($userId, $sellerId) {
                    $q->where(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $userId)->where('seller_id', $sellerId);
                    })->orWhere(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $sellerId)->where('seller_id', $userId);
                    });
                })
                ->first();

            if (!$chat) {
                $chat = Chat::create([
                    'product_id' => $product->id,
                    'buyer_id' => $userId,
                    'seller_id' => $sellerId,
                ]);
            }
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

        // We no longer update the chat's product_id here to prevent "overwriting"
        // The chat thread is now permanently tied to the product it was started with.

        $chat->update(['last_message_at' => now()]);

        $message->load('sender.profile');
        $formatted = $this->formatMessage($message);

        $recipientId = ($chat->buyer_id === Auth::id()) ? $chat->seller_id : $chat->buyer_id;
        broadcast(new \App\Events\MessageSent($formatted, $chat->id, $recipientId))->toOthers();

        return response()->json($formatted);
    }

    public function storeImage(Request $request, $id)
    {
        if (str_starts_with($id, 'product-')) {
            $productId = str_replace('product-', '', $id);
            $product = Product::findOrFail($productId);
            $userId = Auth::id();
            $sellerId = $product->user_id;

            $chat = Chat::where('product_id', $productId)
                ->where(function($q) use ($userId, $sellerId) {
                    $q->where(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $userId)->where('seller_id', $sellerId);
                    })->orWhere(function($sq) use ($userId, $sellerId) {
                        $sq->where('buyer_id', $sellerId)->where('seller_id', $userId);
                    });
                })
                ->first();

            if (!$chat) {
                $chat = Chat::create([
                    'product_id' => $product->id,
                    'buyer_id' => $userId,
                    'seller_id' => $sellerId,
                ]);
            }
        } else {
            $chat = Chat::findOrFail($id);
            $this->authorizeChat($chat);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:5120',
        ]);

        $file = $request->file('image');

        // Check isValid() and getRealPath() to avoid ValueError on PHP 8.4
        if (!$file->isValid() || !$file->getRealPath()) {
            return response()->json(['error' => 'Gagal membaca file gambar.'], 422);
        }

        $path = $file->store('chat_images', 'public');

        $message = $chat->messages()->create([
            'sender_id' => Auth::id(),
            'type' => 'image',
            'image_path' => $path,
        ]);

        // No product_id update to prevent overwriting thread context

        $chat->update(['last_message_at' => now()]);

        $message->load('sender.profile');
        $formatted = $this->formatMessage($message);

        $recipientId = ($chat->buyer_id === Auth::id()) ? $chat->seller_id : $chat->buyer_id;
        broadcast(new \App\Events\MessageSent($formatted, $chat->id, $recipientId))->toOthers();

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
