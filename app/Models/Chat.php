<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'buyer_id', 'seller_id', 'last_message_at'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed()->withDefault([
            'title' => 'Produk Terhapus',
            'price' => 0,
        ]);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id')->withTrashed()->withDefault([
            'name' => 'Pengguna Terhapus',
        ]);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id')->withTrashed()->withDefault([
            'name' => 'Toko Terhapus',
        ]);
    }

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }
}
