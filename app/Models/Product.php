<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'price',
        'status',
        'specifications',
    ];

    // Casting JSON ke Array otomatis
    protected $casts = [
        'specifications' => 'array',
    ];

    public function category(): BelongsTo 
    { 
        return $this->belongsTo(Category::class); 
    }

    /**
     * PERBAIKAN: Menambahkan relasi 'user'
     * Ini dibutuhkan karena controller memanggil $product->load('user')
     */
    public function user(): BelongsTo 
    { 
        return $this->belongsTo(User::class); 
    }

    /**
     * Alias 'seller' tetap dipertahankan jaga-jaga jika ada fitur lain yang memakainya
     */
    public function seller(): BelongsTo 
    { 
        return $this->belongsTo(User::class, 'user_id'); 
    }

    public function images(): HasMany 
    { 
        return $this->hasMany(ProductImage::class); 
    }
    
    public function chats(): HasMany 
    { 
        return $this->hasMany(Chat::class); 
    }
}