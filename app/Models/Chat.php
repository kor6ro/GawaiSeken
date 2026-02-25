<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'buyer_id', 'seller_id'];

    // Relasi ke Produk
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Relasi Buyer
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    // Relasi Seller
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // Relasi ke Pesan
    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }
}