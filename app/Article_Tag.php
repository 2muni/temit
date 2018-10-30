<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class article_tag extends Model
{
    protected $fillable = [
        'article_id', 'tag_id'
    ];
}
