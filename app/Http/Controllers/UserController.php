<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Client;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Product;
use Inertia\Inertia;

class UserController extends Controller
{
    public function viewProduct()
    {
        return Inertia::render('viewProduct', [
            'products' => Product::all(),
        ]);
    }

    public function viewArticle()
    {
        return Inertia::render('viewArticle', [
            'articles' => Article::all(),
        ]);
    }

    public function viewEvent()
    {
        return Inertia::render('viewEvent', [
            'events' => Event::all(),
        ]);
    }
    public function viewClient()
    {
        return Inertia::render('viewClient', [
            'clients' => Client::all(),
        ]);
    }
    public function viewGallery()
    {
        return Inertia::render('viewGallery', [
            'galleries' => Gallery::all(),
        ]);
    }

    public function detailProduct(Product $product) {
        return Inertia::render('detailProduct', [
            'product' => $product,
        ]);
    }

    public function detailArticle(Article $article) {
        return Inertia::render('detailArticle', [
            'article' => $article,
        ]);
    }

    public function checkout(Product $checkout) {
        return Inertia::render('checkout', [
            'product' => $checkout,
        ]);
    }

    
    

    public function index()
    {
        return Inertia::render('welcome', [
            'articles' => Article::latest()->take(3)->get(),
            'events' => Event::latest()->take(3)->get(),
            'galleries' => Gallery::latest()->take(3)->get(),
            'products' => Product::latest()->take(3)->get(),
            'clients' => Client::latest()->get(),
        ]);
    }
}
