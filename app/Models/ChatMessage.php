<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'sender_id',
        'type',       // 'text' | 'image'
        'message',
        'image_path',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::url($this->image_path) : null;
    }

    protected static function booted()
    {
        static::created(function ($message) {
            $message->chat->update([
                'last_message_at' => $message->created_at,
            ]);
        });
    }

    // Helpers
    public function isText(): bool
    {
        return $this->type === 'text';
    }

    public function isImage(): bool
    {
        return $this->type === 'image';
    }

    // Relations
    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id')->withTrashed()->withDefault([
            'name' => 'Pengguna Terhapus',
        ]);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id')->withTrashed()->withDefault([
            'name' => 'Pengguna Terhapus',
        ]);
    }
}
