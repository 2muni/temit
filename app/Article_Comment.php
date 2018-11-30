<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article_Comment extends Model
{
    protected $fillable = [
        'article_id', 'comment', 'reply_to', 'user_id'
    ];
    public function article()
    {
        return $this->belongsTo('App\Article');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
