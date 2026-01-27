<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard'); 

Route::get('/articles', [App\Http\Controllers\ArticleController::class, 'index'])->name('admin.articles.index');
Route::get('/articles/create', [App\Http\Controllers\ArticleController::class, 'create'])->name('admin.articles.create');
});


require __DIR__.'/settings.php';
