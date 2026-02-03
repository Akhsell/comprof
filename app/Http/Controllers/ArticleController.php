<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::latest()->get();
        return Inertia::render('admin/articles/index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048|mimes:png,jpg',
            'author' => 'required|string|max:255',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        }

        $validated['slug'] = Str::slug($validated['title'], '-');

        Article::create($validated);
        return redirect()->route('admin.articles.index')->with('Success', 'Article created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $article = Article::findOrFail($id);

        return Inertia::render('admin/articles/edit', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'author' => $article->author,
                'content' => $article->content,
                'thumbnail' => $article->thumbnail
                    ? asset('storage/' . $article->thumbnail)
                    : null,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048|mimes:png,jpg',
            'author' => 'required|string|max:100',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
        } else {
            $validated['thumbnail'] = $article->thumbnail;
        }

        $validated['slug'] = Str::slug($validated['title'], '-');

        $article->update($validated);
        // dd($article);
        return redirect()->route('admin.articles.index')->with('Success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $articles = Article::findOrFail($id);
        $articles->delete();
        return redirect()->route('admin.articles.index')->with('Success', 'Article deleted successfully');
    }
}
