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

    public function detailEvent(Event $event) {
        return Inertia::render('detailEvent', [
            'event' => $event,
        ]);
    }

    public function checkout(Product $product) {
        return Inertia::render('checkout', [
            'product' => $product,
        ]);
    }


    public function index()
    {
        return Inertia::render('welcome', [
            'articles' => Article::latest()->get(),
            'events' => Event::latest()->get(),
            'galleries' => Gallery::latest()->get(),
            'products' => Product::latest()->get(),
            'clients' => Client::latest()->get(),
        ]);
    }
}
