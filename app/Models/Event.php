<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'location',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
