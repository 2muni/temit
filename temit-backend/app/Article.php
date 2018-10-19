<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'body', 'thumbnail', 'tags', 'url_slug', 'user'
    ];
}
