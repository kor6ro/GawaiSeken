<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DownloadSeedImages extends Command
{
    protected $signature   = 'seed:images';
    protected $description = 'Download real product images from GSMArena CDN for seeder use';

    /**
     * Map of [local_filename => source_url]
     * Using GSMArena bigpic CDN — the most reliable source for real product photos.
     */
    protected array $images = [
        // ── SMARTPHONES ──────────────────────────────────────────────────────
        'poco-x8-pro.jpg'           => 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x8-pro.jpg',
        'samsung-a55.jpg'           => 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
        'iphone-16-pro-max.jpg'     => 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
        'realme-gt-6.jpg'           => 'https://fdn2.gsmarena.com/vv/bigpic/realme-gt-6.jpg',
        'oppo-reno11-f.jpg'         => 'https://fdn2.gsmarena.com/vv/bigpic/oppo-reno11-f.jpg',
        'samsung-s24-fe.jpg'        => 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-fe.jpg',
        'vivo-v40.jpg'              => 'https://fdn2.gsmarena.com/vv/bigpic/vivo-v40.jpg',
        'asus-rog-phone-8.jpg'      => 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-8.jpg',
        'redmi-note-13-pro.jpg'     => 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-5g.jpg',
        'google-pixel-9.jpg'        => 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9.jpg',
        'poco-x6-pro.jpg'           => 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6-pro.jpg',
        'oneplus-12.jpg'            => 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg',
        'infinix-note-40-pro.jpg'   => 'https://fdn2.gsmarena.com/vv/bigpic/infinix-note-40-pro.jpg',

        // ── TABLETS ──────────────────────────────────────────────────────────
        'samsung-tab-a9-plus.jpg'   => 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a9-plus.jpg',
        'redmi-pad-pro.jpg'         => 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-pad-pro.jpg',
        'samsung-tab-s9-fe.jpg'     => 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-fe.jpg',

        // ── LAPTOPS ──────────────────────────────────────────────────────────
        'macbook-air-m2.jpg'        => 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m2-2022.jpg',
        'asus-rog-g14-2024.jpg'     => 'https://fdn2.gsmarena.com/vv/bigpic/asus-rog-zephyrus-g14-2024.jpg',

        // ── AUDIO ────────────────────────────────────────────────────────────
        'sony-wf-1000xm5.jpg'       => 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg',

        // ── WEARABLE ─────────────────────────────────────────────────────────
        'samsung-watch-7.jpg'       => 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg',
    ];

    public function handle(): int
    {
        $dir = 'products/seed';

        // Ensure directory exists on the public disk
        if (! Storage::disk('public')->exists($dir)) {
            Storage::disk('public')->makeDirectory($dir);
        }

        $this->info("Downloading " . count($this->images) . " seed images to storage/app/public/{$dir}/");
        $this->newLine();

        $bar = $this->output->createProgressBar(count($this->images));
        $bar->start();

        $success = 0;
        $failed  = [];

        $context = stream_context_create([
            'http' => [
                'header'          => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36\r\n",
                'timeout'         => 20,
                'follow_location' => true,
            ],
            'ssl'  => [
                'verify_peer'      => false,
                'verify_peer_name' => false,
            ],
        ]);

        foreach ($this->images as $filename => $url) {
            $targetPath = "{$dir}/{$filename}";

            // Skip if already downloaded
            if (Storage::disk('public')->exists($targetPath)) {
                $bar->advance();
                $success++;
                continue;
            }

            $bytes = @file_get_contents($url, false, $context);

            if ($bytes !== false && strlen($bytes) > 1000) {
                Storage::disk('public')->put($targetPath, $bytes);
                $success++;
            } else {
                $failed[] = $filename;
            }

            $bar->advance();
            usleep(300_000); // 300ms pause to avoid rate-limiting
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("✅  Downloaded: {$success} / " . count($this->images));

        if (!empty($failed)) {
            $this->warn("⚠️  Failed (" . count($failed) . "):");
            foreach ($failed as $f) {
                $this->line("   - {$f}  →  " . $this->images[$f]);
            }
            $this->newLine();
            $this->comment("Tip: Run the command again, or replace the failed URLs in DownloadSeedImages.php");
        }

        return self::SUCCESS;
    }
}
