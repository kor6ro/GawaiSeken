<?php
require 'C:/laragon/www/GawaiSeken/vendor/autoload.php';
$app = require 'C:/laragon/www/GawaiSeken/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$p = \App\Models\Product::with('category', 'images')->find(8);

// Simulate what Inertia would serialize
$data = $p->toArray();
echo "condition raw: " . var_export($data['condition'], true) . "\n";
echo "price raw: " . var_export($data['price'], true) . "\n";
echo "is_cod: " . var_export($data['is_cod'], true) . "\n";
echo "is_negotiable: " . var_export($data['is_negotiable'], true) . "\n";
echo "Full json: " . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
