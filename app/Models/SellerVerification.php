<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellerVerification extends Model
{
    protected $fillable = [
        'user_id',
        'ktp_image_path',
        'face_image_path',
        'status',
        'rejection_note',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
