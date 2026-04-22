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
        'status',
        'snap_token',
    ];

    protected $casts = [
        'status' => TransactionStatusEnum::class,
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
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
