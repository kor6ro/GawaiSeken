#!/bin/bash

echo -e "\n[GawaiSeken] Starting Setup...\n"

if [ ! -f .env ]; then
    echo "[GawaiSeken] Creating .env from .env.example..."
    cp .env.example .env
else
    echo "[GawaiSeken] .env file already exists. Skipping..."
fi

echo "[GawaiSeken] Installing Composer dependencies..."
composer install

echo "[GawaiSeken] Installing NPM dependencies..."
npm install

echo "[GawaiSeken] Generating application key..."
php artisan key:generate

echo "[GawaiSeken] Running database migrations and seeding..."
php artisan migrate --seed

echo "[GawaiSeken] Linking storage..."
php artisan storage:link

echo "[GawaiSeken] Building assets..."
npm run build

echo -e "\n[GawaiSeken] Setup complete!"
echo "[GawaiSeken] You can now run 'php artisan serve' to start the application.\n"
