<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProcessProductImage implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Product $product,
        public string $tempPath,
        public string $fileName
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // 1. Inisialisasi ImageManager dengan Driver GD
            $manager = new ImageManager(new Driver());

            // 2. Baca file dari temporary path (Disk 'local')
            $fullTempPath = Storage::disk('local')->path($this->tempPath);
            
            if (!file_exists($fullTempPath)) {
                Log::error("Temporary image file not found: {$fullTempPath}");
                return;
            }

            $image = $manager->read($fullTempPath);

            // 3. Resize (Scaling) - Misalnya lebar maksimal 1200px, tinggi otomatis
            $image->scale(width: 1200);

            // 4. Kompresi dan Simpan ke Disk Public
            $finalPath = "products/{$this->fileName}";
            $output = $image->toJpeg(80); // Kompresi kualitas 80% (format JPEG)
            
            Storage::disk('public')->put($finalPath, (string) $output);

            // 5. Simpan ke Database
            ProductImage::create([
                'product_id' => $this->product->id,
                'image_path' => $finalPath,
            ]);

            // 6. Hapus file temporary
            Storage::disk('local')->delete($this->tempPath);

        } catch (\Exception $e) {
            Log::error("Failed to process product image: " . $e->getMessage());
            // Jika gagal, pastikan temp file tetap dihapus agar tidak menumpuk
            Storage::disk('local')->delete($this->tempPath);
            throw $e;
        }
    }
}
