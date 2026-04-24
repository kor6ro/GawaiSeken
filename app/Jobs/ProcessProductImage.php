<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

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
            $manager = new ImageManager(new Driver);

            // 2. Baca file dari temporary path (Disk 'local')
            $fullTempPath = Storage::disk('local')->path($this->tempPath);

            if (! file_exists($fullTempPath)) {
                Log::error("Temporary image file not found: {$fullTempPath}");

                return;
            }

            \Illuminate\Support\Facades\Log::info("Starting to process image: {$this->fileName} for product {$this->product->id}");
            $image = $manager->read($fullTempPath);

            // 3. Resize (Scaling) - Misalnya lebar maksimal 1200px, tinggi otomatis
            $image->scale(width: 1200);

            // 4. Kompresi dan Simpan ke Disk Public
            $finalPath = "products/{$this->fileName}";
            \Illuminate\Support\Facades\Log::info("Encoding image as JPEG: {$finalPath}");
            $output = $image->toJpeg(80); // Kompresi kualitas 80% (format JPEG)

            $saved = Storage::disk('public')->put($finalPath, (string) $output);
            if (!$saved) {
                \Illuminate\Support\Facades\Log::error("Failed to save final image to public disk: {$finalPath}");
            }

            // 5. Simpan ke Database
            \Illuminate\Support\Facades\Log::info("Saving ProductImage record for {$finalPath}");
            ProductImage::create([
                'product_id' => $this->product->id,
                'image_path' => $finalPath,
            ]);

            // 6. Hapus file temporary
            Storage::disk('local')->delete($this->tempPath);
            \Illuminate\Support\Facades\Log::info("Successfully processed and saved image: {$this->fileName}");

        } catch (\Exception $e) {
            Log::error('Failed to process product image: '.$e->getMessage());
            // Jika gagal, pastikan temp file tetap dihapus agar tidak menumpuk
            Storage::disk('local')->delete($this->tempPath);
            throw $e;
        }
    }
}
