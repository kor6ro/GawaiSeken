<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use HasFactory;

    // Pastikan fillable menggunakan sender_id
    protected $fillable = ['chat_id', 'sender_id', 'message', 'read_at'];

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

    // Relasi ke User (Pengirim)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    
    // Alias agar bisa dipanggil sebagai sender juga
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}