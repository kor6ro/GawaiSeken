<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi untuk tabel users, password_reset_tokens, dan sessions.
     */
    public function up(): void
    {
        // Tabel utama users sesuai ERD GawaiBekas
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // bigint [cite: 38]
            $table->string('name'); // varchar [cite: 46]
            $table->string('email')->unique(); // varchar [cite: 52]
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password'); // varchar [cite: 58]
            $table->string('role')->default('buyer'); // varchar [cite: 64] - Menentukan akses user
            $table->rememberToken();
            $table->timestamps(); // created_at & updated_at [cite: 70, 76]
        });

        // Tabel untuk fitur Reset Password (Standar Laravel)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Tabel untuk fitur Session (Standar Laravel)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Batalkan migrasi (Hapus tabel).
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};