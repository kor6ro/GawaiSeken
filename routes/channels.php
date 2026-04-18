<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{chatId}', function ($user, $chatId) {
    if (str_starts_with($chatId, 'product-')) {
        $productId = str_replace('product-', '', $chatId);
        $product = \App\Models\Product::find($productId);
        if ($product && ($product->user_id !== $user->id)) {
            return ['id' => $user->id, 'name' => $user->name, 'avatar' => $user->profile?->avatar];
        }
        return false;
    }
    $chat = \App\Models\Chat::find($chatId);
    if ($chat && ($chat->buyer_id === $user->id || $chat->seller_id === $user->id)) {
        return ['id' => $user->id, 'name' => $user->name, 'avatar' => $user->profile?->avatar];
    }
    return false;
});
