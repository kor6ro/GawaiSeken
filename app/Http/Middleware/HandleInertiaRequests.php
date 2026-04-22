<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'unread_messages_count' => ChatMessage::whereHas('chat', function ($q) use ($request) {
                        $q->where('buyer_id', $request->user()->id)
                            ->orWhere('seller_id', $request->user()->id);
                    })->where('sender_id', '!=', $request->user()->id)
                        ->whereNull('read_at')
                        ->count(),
                ] : null,
            ],
            'flash' => [
                'status' => $request->session()->get('status'),
                'message' => $request->session()->get('message'),
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'global_filters' => [
                'categories' => Category::all(),
                'rams' => ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB'],
                'storages' => ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
                'kelengkapan' => ['Fullset', 'Unit + Charger', 'Batangan'],
            ],
            'active_filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'ram' => $request->ram,
                'storage' => $request->storage,
                'kelengkapan' => $request->kelengkapan,
                'sort' => $request->sort,
            ],
        ];
    }
}
