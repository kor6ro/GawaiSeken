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
    Schema::create('user_profiles', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // [cite: 43, 172]
        $table->string('avatar')->nullable(); // varchar [cite: 50, 179]
        $table->string('phone'); // varchar [cite: 56, 185]
        $table->text('address'); // text [cite: 62, 191]
        $table->text('bio')->nullable(); // text [cite: 68, 196]
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
