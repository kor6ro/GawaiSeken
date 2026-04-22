<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public $chatId;
    public $recipientId;

    public function __construct(array $message, $chatId, $recipientId = null)
    {
        $this->message = $message;
        $this->chatId = $chatId;
        $this->recipientId = $recipientId;
    }

    public function broadcastOn(): array
    {
        $channels = [new PresenceChannel('chat.'.$this->chatId)];

        if ($this->recipientId) {
            $channels[] = new PrivateChannel('App.Models.User.'.$this->recipientId);
        }

        return $channels;
    }
}
