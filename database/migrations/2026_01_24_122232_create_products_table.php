// File: database/migrations/2026_01_24_122232_create_products_table.php
<?php

use App\Enums\ProductConditionEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->index();
            $table->string('title')->index();
            $table->string('slug')->unique();
            $table->string('brand')->nullable();
            $table->string('type')->nullable();
            $table->string('condition')->default(ProductConditionEnum::SECOND_GOOD->value);

            $table->string('reference_url')->nullable();
            $table->text('description');
            $table->decimal('price', 15, 2)->index();
            $table->boolean('is_cod')->default(false);
            $table->boolean('is_negotiable')->default(true);
            $table->string('availability')->default('available')->index();
            $table->enum('status', ['pending', 'active', 'rejected', 'banned'])->default('pending')->index();
            $table->text('moderation_note')->nullable();

            $table->json('specifications')->nullable();
            $table->json('reports')->nullable(); // Metadata: user_id, reason, date

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
