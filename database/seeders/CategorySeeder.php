<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Constants\ProductSchema;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        foreach (ProductSchema::SCHEMA as $slug => $data) {
            Category::updateOrCreate(
                ['id' => $data['id']],
                [
                    'name' => $data['label'] ?? Str::title($slug),
                    'slug' => $slug,
                ]
            );
        }

        // Optional: Clean up old categories that are not in the new schema
        $validIds = array_column(ProductSchema::SCHEMA, 'id');
        Category::whereNotIn('id', $validIds)->delete();
    }
}
