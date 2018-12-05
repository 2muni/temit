<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $table = 'follower_users';

    protected $fillable = [
        'parent_id', 'follower_id'
    ];
}
