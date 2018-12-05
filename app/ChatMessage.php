<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $fillable = [
        'channel_id', 'name', 'body'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
