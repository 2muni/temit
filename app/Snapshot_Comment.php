<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Snapshot_Comment extends Model
{
    protected $fillable = [
        'snapshot_id', 'comment', 'user_id'
    ];
    public function snapshot()
    {
        return $this->belongsTo('App\Snapshot');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
