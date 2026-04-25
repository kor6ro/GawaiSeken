<?php

function getWikiImage($query) {
    // try to search first to get the best title
    $searchUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" . urlencode($query) . "&utf8=&format=json&srlimit=1";
    
    $options = [
        'http' => [
            'header' => "User-Agent: GawaiSekenSeeder/1.0\r\n"
        ]
    ];
    $context = stream_context_create($options);
    
    $searchRes = @file_get_contents($searchUrl, false, $context);
    if (!$searchRes) return null;
    
    $searchData = json_decode($searchRes, true);
    if (empty($searchData['query']['search'])) return null;
    
    $title = $searchData['query']['search'][0]['title'];
    
    $imgUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=" . urlencode($title) . "&prop=pageimages&format=json&pithumbsize=1000";
    $imgRes = @file_get_contents($imgUrl, false, $context);
    
    if (!$imgRes) return null;
    
    $imgData = json_decode($imgRes, true);
    $pages = $imgData['query']['pages'] ?? [];
    
    foreach ($pages as $page) {
        if (isset($page['thumbnail']['source'])) {
            return $page['thumbnail']['source'];
        }
    }
    
    return null;
}

echo getWikiImage("iPhone 13 Pro") . "\n";
echo getWikiImage("Samsung Galaxy S22 Ultra") . "\n";
echo getWikiImage("ThinkPad X1 Carbon") . "\n";

