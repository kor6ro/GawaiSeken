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
            $table->enum('payment_method', ['rekber', 'cod'])->default('rekber')->after('status');
            $table->string('tracking_number')->nullable()->after('payment_method');
            $table->string('courier_name')->nullable()->after('tracking_number');
            $table->text('shipping_address')->nullable()->after('courier_name');
            $table->string('cod_location')->nullable()->after('shipping_address');
            $table->dateTime('cod_scheduled_at')->nullable()->after('cod_location');
            $table->dateTime('buyer_confirmed_at')->nullable()->after('cod_scheduled_at');
            $table->text('seller_notes')->nullable()->after('buyer_confirmed_at');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn([
                'negotiation_id', 'payment_method', 'tracking_number',
                'courier_name', 'shipping_address', 'cod_location',
                'cod_scheduled_at', 'buyer_confirmed_at', 'seller_notes',
            ]);
        });
    }
};
