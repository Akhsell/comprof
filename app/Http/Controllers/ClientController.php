<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::latest()->get();
        return inertia('admin/clients/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/clients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048|mimes:jpg,png',
            'website' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = $path;
        }

        $validated['slug'] = Str::slug($validated['name'], '-');

        Client::create($validated);
        return redirect()->route('admin.clients.index')->with('Success', 'Client created successfully.');
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
        $client = Client::findOrFail($id);
        return Inertia::render('admin/clients/edit', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'website' => $client->website,
                'description' => $client->description,
                'logo' => $client->logo
                ?  asset('storage/' . $client->logo): null,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048|mimes:jpg,png',
            'website' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = $path;
        }

        $validated['slug'] = Str::slug($validated['name'], '-');

        $client = Client::findOrFail($id);
        $client->update($validated);
        return redirect()->route('admin.clients.index')->with('Success', 'Client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return redirect()->route('admin.clients.index')->with('Success', 'Client deleted successfully');
    }
}
