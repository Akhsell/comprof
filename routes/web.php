<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [UserController::class, 'index'])->name('home');

Route::get('/product/view-product', [UserController::class, 'viewProduct'])->name('viewProduct');
Route::get('/article/view-article', [UserController::class, 'viewArticle'])->name('viewArticle');
Route::get('/event/view-event', [UserController::class, 'viewEvent'])->name('viewEvent');
Route::get('/client/view-client', [UserController::class, 'viewClient'])->name('viewClient');
Route::get('/gallery/view-gallery', [UserController::class, 'viewGallery'])->name('viewGallery');

Route::get('/product/detail-product/{product}', [UserController::class, 'detailProduct'])->name('detailProduct');
Route::get('/article/detail-article/{article}', [UserController::class, 'detailArticle'])->name('detailArticle');
Route::get('/event/detail-event/{event}', [UserController::class, 'detailEvent'])->name('detailEvent');

Route::get('/product/checkout/{product:slug}', [UserController::class, 'checkout'])->name('checkout');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

// Article Routes
Route::get('/articles', [App\Http\Controllers\ArticleController::class, 'index'])->name('admin.articles.index');
Route::get('/articles/create', [App\Http\Controllers\ArticleController::class, 'create'])->name('admin.articles.create');
Route::post('/articles', [ArticleController::class, 'store'])->name('admin.articles.store');
Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');
Route::get('/articles/{id}', [ArticleController::class, 'edit'])->name('admin.articles.edit');
Route::put('/articles/{id}', [ArticleController::class, 'update'])->name('admin.articles.update');

// Product Routes
Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('admin.products.index');
Route::get('/products/create', [App\Http\Controllers\ProductController::class, 'create'])->name('admin.products.create');
Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
Route::get('/products/{id}', [ProductController::class, 'edit'])->name('admin.products.edit');
Route::put('/products/{id}', [ProductController::class, 'update'])->name('admin.products.update');

// Event Routes
Route::get('/events', [App\Http\Controllers\EventController::class, 'index'])->name('admin.events.index');
Route::get('/events/create', [App\Http\Controllers\EventController::class, 'create'])->name('admin.events.create');
Route::post('/events', [EventController::class, 'store'])->name('admin.events.store');
Route::delete('/events/{id}', [EventController::class, 'destroy'])->name('admin.events.destroy');
Route::get('/events/{id}', [EventController::class, 'edit'])->name('admin.events.edit');
Route::put('/events/{id}', [EventController::class, 'update'])->name('admin.events.update');

// Gallery Routes
Route::get('/galleries', [App\Http\Controllers\GalleryController::class, 'index'])->name('admin.galleries.index');
Route::get('/galleries/create', [App\Http\Controllers\GalleryController::class, 'create'])->name('admin.galleries.create');
Route::post('/galleries', [GalleryController::class, 'store'])->name('admin.galleries.store');
Route::delete('/galleries/{id}', [GalleryController::class, 'destroy'])->name('admin.galleries.destroy');
Route::get('/galleries/{id}', [GalleryController::class, 'edit'])->name('admin.galleries.edit');
Route::put('/galleries/{id}', [GalleryController::class, 'update'])->name('admin.galleries.update');

// Client Routes
Route::get('/clients', [App\Http\Controllers\ClientController::class, 'index'])->name('admin.clients.index');
Route::get('/clients/create', [App\Http\Controllers\ClientController::class, 'create'])->name('admin.clients.create');
Route::post('/clients', [ClientController::class, 'store'])->name('admin.clients.store');
Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->name('admin.clients.destroy');
Route::get('/clients/{id}', [ClientController::class, 'edit'])->name('admin.clients.edit');
Route::put('/clients/{id}', [ClientController::class, 'update'])->name('admin.clients.update');

});


require __DIR__.'/settings.php';
