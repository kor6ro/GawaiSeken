<?php

function getProductImage($query) {
    $url = "https://html.duckduckgo.com/html/?q=" . urlencode($query . " product image clear white background");
    
    $options = [
        'http' => [
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n"
        ]
    ];
    $context = stream_context_create($options);
    $html = @file_get_contents($url, false, $context);
    
    if ($html) {
        // Extract duckduckgo proxy image URLs
        if (preg_match('/<img[^>]+src="(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/i', $html, $matches)) {
            return "https:" . htmlspecialchars_decode($matches[1]);
        }
    }
    return null;
}

echo getProductImage("iPhone 13 Pro Sierra Blue");

