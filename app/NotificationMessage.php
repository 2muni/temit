<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotificationMessage extends Model
{
    protected $fillable = [
        'channel_id', 'user_id', 'type', 'source'
    ];
    public function channel()
    {
        return $this->belongsTo('App\NotificationChannel');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
