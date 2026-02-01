<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArticleController;
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
Route::post('/articles', [ArticleController::class, 'store'])->name('admin.articles.store');
Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');
Route::get('/articles/{id}', [ArticleController::class, 'edit'])->name('admin.articles.edit');
Route::put('/articles/{id}', [ArticleController::class, 'update'])->name('admin.articles.update');

Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('admin.products.index');
Route::get('/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('admin.products.create');
Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
Route::get('/products/{id}', [ProductController::class, 'edit'])->name('admin.products.edit');
Route::put('/products/{id}', [ProductController::class, 'update'])->name('admin.products.update');
});


require __DIR__.'/settings.php';
