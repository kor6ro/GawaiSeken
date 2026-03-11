<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{chatId}', function ($user, $chatId) {
    if (str_starts_with($chatId, 'product-')) {
        $productId = str_replace('product-', '', $chatId);
        $product = \App\Models\Product::find($productId);
        // Only the buyer (initiator) can listen to this temporary channel
        // or actually, since seller doesn't know, only the buyer benefits.
        return $product && ($product->user_id !== $user->id);
    }
    $chat = \App\Models\Chat::find($chatId);
    return $chat && ($chat->buyer_id === $user->id || $chat->seller_id === $user->id);
});
