<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionDispute extends Model
{
    protected $fillable = [
        'transaction_id',
        'user_id',
        'reason',
        'description',
        'evidence_images',
        'status',
        'admin_note',
    ];

    protected $casts = [
        'evidence_images' => 'array',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
