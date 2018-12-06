<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'thumbnail', 'bio', 'notified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * Get the articles for the user
     */
    public function verifyUser()
    {
        return $this->hasOne('App\VerifyUser');
    }
    public function articles()
    {
        return $this->hasMany('App\Article');
    }
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
    public function messages()
    {
        return $this->hasMany('App\ChatMessage');
    }
    public function notifications()
    {
        return $this->hasMany('App\NotificationMessage');
    }
    public function snapshots()
    {
        return $this->hasMany('App\Snapshot');
    }
    public function followees()
    {
        return $this->belongsToMany('App\User', 'follower_users', 'follower_id', 'parent_id');
    }
    public function followers()
    {
        return $this->belongsToMany('App\User', 'follower_users', 'parent_id', 'follower_id');
    }
    public function articleUpvotes()
    {
        return $this->hasMany('App\Article_Upvote');
    }
}
