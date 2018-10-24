<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'body', 'thumbnail', 'user_id'
    ];
    /**
     * Get the user that owns the article
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
