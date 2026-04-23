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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Data Pribadi (Buyer/General)
            $table->string('avatar')->nullable(); // Personal Avatar
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('landmark')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('village')->nullable();
            $table->text('bio')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();

            // Data Spesifik Toko (Seller)
            $table->string('store_name')->nullable();
            $table->string('store_logo')->nullable();
            $table->text('store_bio')->nullable();
            $table->text('store_address')->nullable(); // Optional: Alamat pick-up kurir berbeda
            $table->string('store_landmark')->nullable();
            $table->string('store_province')->nullable();
            $table->string('store_city')->nullable();
            $table->string('store_district')->nullable();
            $table->string('store_village')->nullable();
            
            $table->boolean('is_ktp_verified')->default(false);

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
