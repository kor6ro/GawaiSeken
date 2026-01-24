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
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Seller ID [cite: 47, 176]
        $table->foreignId('category_id')->constrained('categories'); // [cite: 53, 183]
        $table->string('title'); // varchar [cite: 60, 189]
        $table->string('slug')->unique(); // Tambahan: Untuk URL SEO
        $table->text('description'); // text [cite: 66, 195]
        $table->decimal('price', 15, 2); // decimal [cite: 72, 231]
        $table->string('status')->default('available'); // varchar [cite: 78, 233]
        $table->softDeletes(); // Tambahan: Agar histori transaksi tetap terjaga
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
