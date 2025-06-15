<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('main');
    })->name('main');
});

require __DIR__ . '/auth.php';
