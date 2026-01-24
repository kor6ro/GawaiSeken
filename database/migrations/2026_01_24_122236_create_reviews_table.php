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
    Schema::create('reviews', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained('products'); // [cite: 89, 210]
        $table->foreignId('buyer_id')->constrained('users'); // [cite: 93, 214]
        $table->foreignId('transaction_id')->constrained('transactions'); // Perbaikan: Pastikan user sudah beli
        $table->integer('rating'); // int [cite: 97, 219]
        $table->text('comment'); // text [cite: 100, 223]
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
