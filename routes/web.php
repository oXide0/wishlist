<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\WishlistItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::get('register', function () {
        return Inertia::render('register');
    })->name('register');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/', [WishlistItemController::class, 'index'])->name('main');
    Route::get('/groups', [GroupController::class, 'show'])->name('groups');
});

require __DIR__ . '/auth.php';
