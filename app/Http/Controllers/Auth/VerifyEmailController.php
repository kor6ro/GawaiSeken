<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }

    /**
     * Display the email verification code form.
     */
    public function showCodeForm(Request $request): Response
    {
        return Inertia::render('Auth/VerifyCode', [
            'email' => $request->query('email') ?? $request->user()?->email,
        ]);
    }

    /**
     * Verify the email verification code.
     */
    public function verifyCode(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string', 'size:6'],
        ]);

        $user = User::where('email', $request->email)
            ->where('verification_code', $request->code)
            ->where('verification_code_expires_at', '>', now())
            ->first();

        if (!$user) {
            return back()->withErrors(['code' => 'Kode verifikasi tidak valid atau sudah kedaluwarsa.']);
        }

        $user->forceFill([
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_code_expires_at' => null,
        ])->save();

        event(new Verified($user));

        Auth::login($user);

        return redirect()->route('dashboard')->with('status', 'Email Anda telah berhasil diverifikasi!');
    }
}
