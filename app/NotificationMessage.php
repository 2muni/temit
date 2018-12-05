<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotificationMessage extends Model
{
    protected $fillable = [
        'channel_id', 'user_id', 'type', 'message'
    ];
    public function channel()
    {
        return $this->belongsTo('App\NotificationChannel');
    }
}
