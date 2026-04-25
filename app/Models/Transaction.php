<?php

namespace App\Models;

use App\Enums\TransactionStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'reference_number',
        'negotiation_id',
        'product_id',
        'price',
        'cod_location',
        'cod_scheduled_at',
        'buyer_confirmed_at',
        'seller_confirmed_at',
        'seller_notes',
    ];

    protected $casts = [
        'status'              => TransactionStatusEnum::class,
        'cod_scheduled_at'    => 'datetime',
        'buyer_confirmed_at'  => 'datetime',
        'seller_confirmed_at' => 'datetime',
        'price'               => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class)->withTrashed()->withDefault([
            'title' => 'Produk Terhapus',
            'price' => 0,
        ]);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id')->withTrashed()->withDefault([
            'name' => 'Pembeli Terhapus',
        ]);
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id')->withTrashed()->withDefault([
            'name' => 'Penjual Terhapus',
        ]);
    }

    public function negotiation(): BelongsTo
    {
        return $this->belongsTo(Negotiation::class);
    }

    public function chat(): HasOne
    {
        return $this->hasOne(Chat::class, 'transaction_id');
    }

    public function dispute(): HasOne
    {
        return $this->hasOne(TransactionDispute::class);
    }

}
