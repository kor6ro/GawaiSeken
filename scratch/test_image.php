<?php
require 'vendor/autoload.php';
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

try {
    $manager = new ImageManager(new Driver);
    // Create a tiny 10x10 image
    $image = $manager->create(10, 10);
    $output = $image->toJpeg(80);
    echo "Output type: " . get_class($output) . "\n";
    $binary = (string)$output;
    echo "Binary size: " . strlen($binary) . " bytes\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
