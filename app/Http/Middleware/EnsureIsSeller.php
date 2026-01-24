<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsSeller
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user sudah login DAN memiliki role seller
        if ($request->user() && $request->user()->role === 'seller') {
            return $next($request);
        }

        // Jika bukan seller, kembalikan ke home dengan pesan error
        return redirect('/')->with('error', 'Anda tidak memiliki akses ke halaman penjual.');
    }
}