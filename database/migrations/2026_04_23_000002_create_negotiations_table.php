<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('negotiations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('buyer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('seller_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('proposed_price', 15, 2);
            $table->decimal('counter_price', 15, 2)->nullable();
            $table->decimal('agreed_price', 15, 2)->nullable();
            $table->string('status')->default('pending'); // pending|accepted|rejected|countered|expired
            $table->text('message')->nullable();
            $table->text('seller_message')->nullable();
            $table->dateTime('expires_at');
            $table->timestamps();
        });

        // Add is_negotiable flag to products if not exists
        if (!Schema::hasColumn('products', 'is_negotiable')) {
            Schema::table('products', function (Blueprint $table) {
                $table->boolean('is_negotiable')->default(false)->after('status');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('negotiations');
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('is_negotiable');
        });
    }
};
