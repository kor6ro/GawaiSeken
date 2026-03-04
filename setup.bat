@echo off
echo.
echo [GawaiSeken] Starting Setup...
echo.

IF NOT EXIST .env (
    echo [GawaiSeken] Creating .env from .env.example...
    copy .env.example .env
) ELSE (
    echo [GawaiSeken] .env file already exists. Skipping...
)

echo [GawaiSeken] Installing Composer dependencies...
call composer install

echo [GawaiSeken] Installing NPM dependencies...
call npm install

echo [GawaiSeken] Generating application key...
php artisan key:generate

echo [GawaiSeken] Running database migrations and seeding...
php artisan migrate --seed

echo [GawaiSeken] Linking storage...
php artisan storage:link

echo [GawaiSeken] Building assets...
call npm run build

echo.
echo [GawaiSeken] Setup complete!
echo [GawaiSeken] You can now run 'php artisan serve' to start the application.
echo.
pause
