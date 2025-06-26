<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistItemController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [UserController::class, 'show'])
        ->name('login');

    Route::post('login', [UserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [UserController::class, 'destroy'])
        ->name('logout');

    Route::resource('wishlist-items', WishlistItemController::class)->except(['show', 'create', 'edit']);
    Route::post('/wishlist-items/{item}/reserve', [WishlistItemController::class, 'reserve'])->name('wishlist-items.reserve');
    Route::post('/wishlist-items/{item}/unreserve', [WishlistItemController::class, 'unreserve'])->name('wishlist-items.unreserve');
});
