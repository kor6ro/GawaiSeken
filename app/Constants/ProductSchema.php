<?php

namespace App\Constants;

/**
 * GawaiSeken Data-Driven Schema (Backend Mirror)
 * Centralized source of truth for validation rules and category fields.
 */
class ProductSchema
{
    public const SCHEMA = [
        'smartphone' => [
            'id' => 1,
            'label' => 'Smartphone',
            'fields' => ['ram', 'storage', 'battery_health', 'screen_size'],
            'brands' => ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Infinix', 'Poco', 'Asus', 'Sony', 'Huawei', 'Google', 'OnePlus', 'Advan'],
        ],
        'tablet' => [
            'id' => 2,
            'label' => 'Tablet',
            'fields' => ['ram', 'storage', 'battery_health', 'screen_size', 'connectivity'],
            'brands' => ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Lenovo', 'Microsoft', 'Oppo', 'Realme', 'Advan', 'Axioo'],
        ],
        'laptop' => [
            'id' => 3,
            'label' => 'Laptop',
            'fields' => ['ram', 'storage', 'screen_size'],
            'brands' => ['Apple', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Microsoft', 'Huawei', 'Xiaomi', 'Razer', 'Gigabyte', 'Axioo'],
        ],
        'wearable' => [
            'id' => 4,
            'label' => 'Wearable',
            'fields' => ['battery_health', 'screen_size', 'connectivity'],
            'brands' => ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Garmin', 'Amazfit', 'Fitbit', 'Suunto'],
        ],
        'audio' => [
            'id' => 5,
            'label' => 'Audio',
            'fields' => ['connectivity'],
            'sub_types' => [
                'tws' => ['is_battery_balanced', 'battery_health'],
                'headphone' => ['connectivity'],
                'speaker' => ['connectivity'],
            ],
            'brands' => ['Sony', 'Bose', 'Sennheiser', 'JBL', 'Audio-Technica', 'Marshall', 'Apple', 'Samsung', 'Jabra', 'Soundcore'],
        ],
        'gaming' => [
            'id' => 6,
            'label' => 'Gaming',
            'fields' => ['storage', 'connectivity'],
            'sub_types' => [
                'console' => ['storage', 'cfw_status'],
                'handheld' => ['storage', 'screen_size', 'cfw_status', 'is_drift_free'],
                'controller' => ['connectivity', 'is_drift_free'],
            ],
            'brands' => ['Sony', 'Microsoft', 'Nintendo', 'Valve', 'Asus', 'MSI', 'Lenovo', 'Logitech', 'Razer'],
        ],
        'networking' => [
            'id' => 7,
            'label' => 'Networking',
            'fields' => ['connectivity'],
            'brands' => ['TP-Link', 'D-Link', 'Tenda', 'Mikrotik', 'Cisco', 'Ubiquiti', 'Huawei', 'ZTE'],
        ],
        'powermanagement' => [
            'id' => 8,
            'label' => 'Power Management',
            'fields' => ['power_source'],
            'sub_types' => [
                'powerbank' => ['battery_health', 'storage'],
                'ups' => ['power_source'],
                'charger' => ['power_source'],
            ],
            'brands' => ['Anker', 'Baseus', 'Acmic', 'APC', 'ICA', 'Eaton', 'Aukey'],
        ],
        'peripherals' => [
            'id' => 9,
            'label' => 'Peripherals',
            'fields' => ['connectivity'],
            'sub_types' => [
                'mouse' => ['connectivity'],
                'keyboard' => ['connectivity', 'switch_type'],
                'webcam' => ['connectivity'],
                'microphone' => ['connectivity'],
            ],
            'brands' => ['Logitech', 'Razer', 'Corsair', 'SteelSeries', 'Keychron', 'VortexSeries', 'Fantech', 'Rexus'],
        ],
        'camera' => [
            'id' => 10,
            'label' => 'Camera',
            'fields' => ['shutter_count', 'storage', 'battery_health', 'screen_size', 'connectivity', 'has_original_lens'],
            'brands' => ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Lumix', 'Olympus', 'GoPro', 'DJI'],
        ],
        'storage' => [
            'id' => 11,
            'label' => 'Storage',
            'fields' => ['storage'],
            'sub_types' => [
                'ext_ssd' => ['storage', 'connectivity'],
                'ext_hdd' => ['storage', 'connectivity'],
                'flashdisk' => ['storage'],
                'sd_card' => ['storage'],
            ],
            'brands' => ['Samsung', 'SanDisk', 'Seagate', 'WD', 'Toshiba', 'Kingston', 'Adata', 'Lexar'],
        ],
        'office' => [
            'id' => 12,
            'label' => 'Office & Monitor',
            'fields' => ['connectivity'],
            'sub_types' => [
                'monitor' => ['screen_size', 'connectivity'],
                'printer' => ['connectivity'],
                'scanner' => ['connectivity'],
                'projector' => ['connectivity'],
            ],
            'brands' => ['LG', 'Samsung', 'Asus', 'Dell', 'HP', 'Epson', 'Canon', 'ViewSonic', 'BenQ'],
        ],
        'photography_acc' => [
            'id' => 13,
            'label' => 'Fotografi & Videografi',
            'fields' => ['connectivity'],
            'sub_types' => [
                'lens' => [],
                'gimbal' => ['battery_health'],
                'tripod' => [],
                'lighting' => ['power_source'],
            ],
            'brands' => ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'DJI', 'Zhiyun', 'Godox', 'Sigma', 'Tamron'],
        ],
    ];

    public static function getCategoryById(int $id): ?array
    {
        foreach (self::SCHEMA as $slug => $data) {
            if ($data['id'] === $id) {
                return array_merge(['slug' => $slug], $data);
            }
        }
        return null;
    }

    public static function getAllowedFields(int $categoryId, ?string $subType = null, ?string $connectivity = null): array
    {
        $category = self::getCategoryById($categoryId);
        if (!$category) return [];

        $fields = $category['fields'] ?? [];

        // Add Sub-Type fields
        if ($subType && isset($category['sub_types'][$subType])) {
            $fields = array_merge($fields, $category['sub_types'][$subType]);
        }

        // Add conditional fields
        if ($connectivity === 'Wireless' || $connectivity === 'Bluetooth') {
            $fields[] = 'power_source';
        }

        return array_unique($fields);
    }

    public static function getBrandsById(int $id): array
    {
        $category = self::getCategoryById($id);
        return array_merge($category['brands'] ?? [], ['Other']);
    }
}
