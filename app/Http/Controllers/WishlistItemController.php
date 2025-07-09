<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WishlistItem;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $wishlistItems = $request->user()->wishlistItems()->get();
        return response()->json($wishlistItems);
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
        Auth::user()->wishlistItems()->create($request->only('title', 'description'));
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
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $wishlistItem = Auth::user()->wishlistItems()->findOrFail($id);
        $wishlistItem->delete();
        return redirect()->back();
    }

    public function members()
    {
        $users = User::where('id', '<>', auth()->id())->select('id', 'username')->get();
        return Inertia::render('members', ['users' => $users]);
    }

    public function showForUser(User $user)
    {
        $wishlistItems = $user->wishlistItems()->latest()->get();
        return Inertia::render('member-wishlist', [
            'member' => $user,
            'wishlistItems' => $wishlistItems,
        ]);
    }

    public function reserve($id)
    {
        $item = WishlistItem::findOrFail($id);

        if ($item->user_id === auth()->id() || $item->reserved_by) {
            abort(403);
        }

        $item->reserved_by = auth()->id();
        $item->save();

        return back();
    }

    public function unreserve($id)
    {
        $item = WishlistItem::findOrFail($id);

        if ($item->reserved_by !== auth()->id()) {
            abort(403);
        }

        $item->reserved_by = null;
        $item->save();

        return back();
    }
}
