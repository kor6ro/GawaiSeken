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
    Schema::create('chats', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained('products'); // [cite: 9, 134]
        $table->foreignId('buyer_id')->constrained('users'); // [cite: 14, 140]
        $table->foreignId('seller_id')->constrained('users'); // [cite: 20, 147]
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
