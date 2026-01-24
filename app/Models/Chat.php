<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['product_id', 'buyer_id', 'seller_id'];

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}