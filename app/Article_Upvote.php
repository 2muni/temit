<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article_Upvote extends Model
{
    protected $fillable = [
        'article_id', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function article()
    {
        return $this->belongsTo('App\Article');
    }
}
