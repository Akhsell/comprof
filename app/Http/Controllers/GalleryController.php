<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = Gallery::latest()->get();
        return inertia('admin/galleries/index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/galleries/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048|mimes:jpg,png',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galleries', 'public');
            $validated['image'] = $path;
        }

        $validated['slug'] = Str::slug($validated['title'], '-');

        Gallery::create($validated);
        return redirect()->route('admin.galleries.index')->with('Success', 'Gallery created successfully.');
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
        $gallery = Gallery::findOrFail($id);
        return Inertia::render('admin/galleries/edit', [
            'gallery' => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'image' => $gallery->image
                ?  asset('storage/' . $gallery->image): null,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048|mimes:jpg,png',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
            $validated['image'] = $path;
        }

        $validated['slug'] = Str::slug($validated['title'], '-');

        $gallery = Gallery::findOrFail($id);
        $gallery->update($validated);
        return redirect()->route('admin.galleries.index')->with('Success', 'Gallery updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return redirect()->route('admin.galleries.index')->with('Success', 'Gallery deleted successfully');
    }
}
