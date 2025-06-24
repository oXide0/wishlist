<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WishlistItemController;


Route::middleware(['auth'])->group(function () {
    Route::get('/', [WishlistItemController::class, 'show'])->name('main');
    Route::get('/members', [WishlistItemController::class, 'members'])->name('members');
    Route::get('/members/{user}', [WishlistItemController::class, 'showForUser'])->name('members.wishlist');
});

require __DIR__ . '/auth.php';
