<?php

namespace App\Models;

use App\Enums\ProductConditionEnum;
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
        'brand',
        'type',
        'condition',
        'is_cod',
        'is_negotiable',
        'reference_url',
        'description',
        'price',
        'status',
        'specifications',
        'reports',
    ];

    // Casting JSON ke Array otomatis
    protected $casts = [
        'specifications' => 'array',
        'is_cod' => 'boolean',
        'is_negotiable' => 'boolean',
        'condition' => ProductConditionEnum::class,
        'reports' => 'array',

    ];

    /**
     * Get the condition badge color.
     * Hijau = Bekas Mulus
     * Kuning = Bekas Ada minus
     * Merah = Minus
     */
    public function getConditionBadgeColorAttribute(): string
    {
        return match ($this->condition) {
            ProductConditionEnum::NEW, ProductConditionEnum::SECOND_LIKE_NEW => 'green',
            ProductConditionEnum::SECOND_GOOD => 'yellow',
            ProductConditionEnum::MINUS => 'red',
            default => 'green',
        };
    }

    protected $appends = ['condition_badge_color'];

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
     * Alias 'store' untuk relasi 'seller' (User)
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
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

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
