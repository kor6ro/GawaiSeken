<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->timestamp('seller_confirmed_at')->nullable()->after('buyer_confirmed_at');
        });

        // Tambah nilai enum baru cod_meetup_done ke kolom status
        DB::statement("ALTER TABLE transactions MODIFY COLUMN status ENUM(
            'completed',
            'canceled',
            'disputed',
            'cod_requested',
            'cod_confirmed',
            'cod_meetup_done'
        ) NOT NULL DEFAULT 'cod_requested'");
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('seller_confirmed_at');
        });

        DB::statement("ALTER TABLE transactions MODIFY COLUMN status ENUM(
            'completed',
            'canceled',
            'disputed',
            'cod_requested',
            'cod_confirmed'
        ) NOT NULL DEFAULT 'cod_requested'");
    }
};
