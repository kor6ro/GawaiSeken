<?php

namespace App\Models;

use App\Enums\TransactionStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'reference_number',
        'product_id',
        'buyer_id',
        'seller_id',
        'price',
        'service_fee',
        'total_amount',
        'status',
        'snap_token',
    ];

    protected $casts = [
        'status' => TransactionStatusEnum::class,
    ];

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
            'name' => 'Pembeli Terhapus',
        ]);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id')->withTrashed()->withDefault([
            'name' => 'Penjual Terhapus',
        ]);
    }

    public function chat()
    {
        return $this->hasOne(Chat::class, 'transaction_id');
    }

    public function dispute()
    {
        return $this->hasOne(TransactionDispute::class);
    }
}
