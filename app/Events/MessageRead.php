<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageRead implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chatId;

    public $readAt;

    public function __construct($chatId)
    {
        $this->chatId = $chatId;
        $this->readAt = now()->toISOString();
    }

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('chat.'.$this->chatId),
        ];
    }
}
