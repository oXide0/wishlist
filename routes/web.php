<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WishlistItemController;


Route::middleware(['auth'])->group(function () {
    Route::get('/', [WishlistItemController::class, 'show'])->name('main');
});

require __DIR__ . '/auth.php';
