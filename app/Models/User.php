<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Atribut yang dapat diisi secara massal.
     * [cite_start]Ditambahkan 'role' sesuai ERD[cite: 63, 192].
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', 
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
        ];
    }

    /**
     * [cite_start]Relasi ke profil pengguna sesuai tabel user_profiles[cite: 34, 161].
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
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
}