<?php

namespace App\Http\Controllers;


use Inertia\Inertia;

class WishlistItemController extends Controller
{
    public function index()
    {
        $wishlistItems = auth()->user()->wishlistItems;

        return Inertia::render('main', ['items' => $wishlistItems]);
    }

    public function store()
    {

        $data = request()->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        auth()->user()->wishlistItems()->create($data);

        return redirect()->route('main');
    }
}
