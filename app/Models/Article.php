<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';

    protected $fillable = [
        'title',
        'content',
        'thumbnail',
        'author',
        'slug',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
