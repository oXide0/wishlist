<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\WishlistItemController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [UserController::class, 'logout'])
        ->name('logout');

    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');

    Route::resource('wishlist-items', WishlistItemController::class)->except(['show', 'create', 'edit']);
});
