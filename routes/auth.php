<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\WishlistItemController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'show'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::resource('wishlist-items', WishlistItemController::class)->except(['show', 'create', 'edit']);
    Route::post('/wishlist-items/{item}/reserve', [WishlistItemController::class, 'reserve'])->name('wishlist-items.reserve');
    Route::post('/wishlist-items/{item}/unreserve', [WishlistItemController::class, 'unreserve'])->name('wishlist-items.unreserve');
});
