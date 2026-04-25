<?php

function getUnsplashIds($query, $count) {
    $url = "https://unsplash.com/s/photos/" . urlencode($query);
    
    $options = [
        'http' => [
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n"
        ]
    ];
    $context = stream_context_create($options);
    $html = file_get_contents($url, false, $context);
    
    if (!$html) return [];
    
    preg_match_all('/href="\/photos\/[a-zA-Z0-9\-]+-([a-zA-Z0-9_]{10,12})"/', $html, $matches);
    
    // Some IDs might be captured directly
    preg_match_all('/https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?/', $html, $matches2);
    
    $ids = array_unique($matches2[1]);
    return array_slice(array_values($ids), 0, $count);
}

$smartphones = getUnsplashIds('smartphone', 15);
$laptops = getUnsplashIds('laptop', 10);
$tablets = getUnsplashIds('tablet', 8);
$headphones = getUnsplashIds('headphones', 4);
$smartwatches = getUnsplashIds('smartwatch', 1);
$mouse = getUnsplashIds('computer-mouse', 1);
$keyboard = getUnsplashIds('mechanical-keyboard', 1);

echo "Smartphones:\n";
print_r($smartphones);
echo "Laptops:\n";
print_r($laptops);
echo "Tablets:\n";
print_r($tablets);
echo "Headphones:\n";
print_r($headphones);
echo "Smartwatch:\n";
print_r($smartwatches);
echo "Mouse:\n";
print_r($mouse);
echo "Keyboard:\n";
print_r($keyboard);

