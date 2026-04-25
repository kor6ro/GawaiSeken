<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar',
        'phone',
        'address',
        'landmark',
        'province',
        'city',
        'district',
        'village',
        'bio',
        'date_of_birth',
        'gender',
        'store_name',
        'store_logo',
        'store_bio',
        'store_address',
        'store_landmark',
        'store_province',
        'store_city',
        'store_district',
        'store_village',
        'is_ktp_verified',
    ];

    protected $casts = [
        'is_ktp_verified' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
