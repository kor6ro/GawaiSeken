<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\ResetPasswordNotification;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * Atribut yang dapat diisi secara massal.
     * [cite_start]Ditambahkan 'role' sesuai ERD[cite: 63, 192].
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'favorites',
        'is_suspended',
        'suspension_reason',
    ];

    /**
     * Atribut yang harus disembunyikan untuk serialisasi.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casting atribut (bawaan Breeze tetap dipertahankan).
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'favorites' => 'array',
            'is_suspended' => 'boolean',
        ];
    }

    /**
     * Helper to check user roles.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isSeller(): bool
    {
        return $this->role === 'seller';
    }

    public function isBuyer(): bool
    {
        return $this->role === 'buyer';
    }

    /**
     * Helper to check if a product is favorited.
     */
    public function isFavorite($productId): bool
    {
        return in_array($productId, $this->favorites ?? []);
    }

    /**
     * [cite_start]Relasi ke profil pengguna sesuai tabel user_profiles[cite: 34, 161].
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Relasi ke verifikasi seller.
     */
    public function sellerVerification(): HasOne
    {
        return $this->hasOne(SellerVerification::class);
    }

    /**
     * [cite_start]Relasi ke produk (User sebagai penjual)[cite: 36, 163].
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * [cite_start]Relasi ke transaksi sebagai pembeli[cite: 110, 238].
     */
    public function transactionsAsBuyer(): HasMany
    {
        return $this->hasMany(Transaction::class, 'buyer_id');
    }

    /**
     * [cite_start]Relasi ke transaksi sebagai penjual[cite: 110, 238].
     */
    public function transactionsAsSeller(): HasMany
    {
        return $this->hasMany(Transaction::class, 'seller_id');
    }

    /**
     * Relasi ke ulasan sebagai penjual (melalui produk).
     */
    public function reviewsAsSeller()
    {
        return $this->hasManyThrough(Review::class, Product::class, 'user_id', 'product_id');
    }

    /**
     * Scope untuk Premium Seller.
     */
    public function getIsPremiumAttribute(): bool
    {
        if (! $this->profile?->is_ktp_verified) {
            return false;
        }

        return $this->transactionsAsSeller()->where('status', 'completed')->count() >= 5;
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification(): void
    {
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $this->forceFill([
            'verification_code' => $code,
            'verification_code_expires_at' => now()->addMinutes(10),
        ])->save();

        $this->notify(new \App\Notifications\VerifyEmailCodeNotification($code));
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
