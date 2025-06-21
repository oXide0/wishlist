<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WishlistItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Auth::user()->wishlistItems;
        return response()->json($items);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = Auth::user()->wishlistItems()->create($request->only('title', 'description'));
        return redirect()->back()->with('success', 'Wishlist item added!');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Inertia::render('main', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'wishlistItems' => Auth::user()->wishlistItems()->latest()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = Auth::user()->wishlistItems()->findOrFail($id);
        $item->update($request->only('title', 'description'));
        return response()->json($item, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $wishlistItem = WishlistItem::find($id);
        $wishlistItem->delete();
        return response()->json(null, 204);
    }
}
