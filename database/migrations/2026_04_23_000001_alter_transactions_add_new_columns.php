<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->unsignedBigInteger('negotiation_id')->nullable()->after('reference_number');
            $table->string('cod_location')->nullable()->after('negotiation_id');
            $table->dateTime('cod_scheduled_at')->nullable()->after('cod_location');
            $table->dateTime('buyer_confirmed_at')->nullable()->after('cod_scheduled_at');
            $table->text('seller_notes')->nullable()->after('buyer_confirmed_at');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn([
                'negotiation_id', 'cod_location',
                'cod_scheduled_at', 'buyer_confirmed_at', 'seller_notes',
            ]);
        });
    }
};
