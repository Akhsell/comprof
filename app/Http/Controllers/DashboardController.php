<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Client;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        
        return Inertia::render('dashboard', [
            'productsCount' => Product::latest()-> get(),
            'articlesCount' => Article::latest()-> get(),
            'eventsCount' => Event::latest()-> get(),
            'clientsCount' => Client::latest()-> get(),
            'galleriesCount' => Gallery::latest()-> get(),
        ]);
    }
}
