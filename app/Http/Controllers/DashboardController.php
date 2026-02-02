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
            'articlesCount' => Article::count(),
            'eventsCount' => Event::count(),
            'clientsCount' => Client::count(),
            'galleriesCount' => Gallery::count(),
        ]);
    }
}
