<?php

namespace App\Models;

use App\Enums\NegotiationStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Negotiation extends Model
{
    protected $fillable = [
        'product_id',
        'buyer_id',
        'seller_id',
        'proposed_price',
        'counter_price',
        'agreed_price',
        'status',
        'message',
        'seller_message',
        'expires_at',
    ];

    protected $casts = [
        'proposed_price' => 'decimal:2',
        'counter_price'  => 'decimal:2',
        'agreed_price'   => 'decimal:2',
        'expires_at'     => 'datetime',
        'status'         => NegotiationStatusEnum::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id')->withTrashed();
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id')->withTrashed();
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isActive(): bool
    {
        return in_array($this->status->value, ['pending', 'countered'])
            && !$this->isExpired();
    }

    /** Harga akhir yang berlaku: agreed > counter > proposed */
    public function getFinalPriceAttribute(): float
    {
        return (float) ($this->agreed_price ?? $this->counter_price ?? $this->proposed_price);
    }
}
