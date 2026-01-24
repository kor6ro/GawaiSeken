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
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->string('reference_number')->unique(); // Tambahan: ID unik transaksi
        $table->foreignId('product_id')->constrained('products'); // [cite: 113, 242]
        $table->foreignId('buyer_id')->constrained('users'); // [cite: 115, 243]
        $table->foreignId('seller_id')->constrained('users'); // [cite: 117, 246]
        $table->decimal('price', 15, 2); // decimal [cite: 119, 248]
        $table->string('status'); // varchar [cite: 121, 251]
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
