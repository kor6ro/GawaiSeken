<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('chat_messages', function (Blueprint $table) {
        $table->id();
        $table->foreignId('chat_id')->constrained('chats')->onDelete('cascade'); // [cite: 7, 132]
        $table->foreignId('sender_id')->constrained('users'); // [cite: 12, 138]
        $table->text('message'); // text [cite: 19, 146]
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
