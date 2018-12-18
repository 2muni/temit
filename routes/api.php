<?php

use Illuminate\Http\Request;
use App\Channel;
use App\Message;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::resource('/articles', 'ArticleController');

Route::post('/channels', 'ChatController@create');
Route::post('/channels/{channel}/chats', 'ChatController@store');
Route::get('/channels/{channel}/chats', 'ChatController@show');

Route::get('/channels/{channel}/notifications', 'NotificationController@show');
Route::post('/channels/{channel}/notifications', 'NotificationController@read');

Route::get('/articles/comments/{article}', 'ArticleCommentController@show');
Route::post('/articles/comments', 'ArticleCommentController@store');
Route::post('/articles/comments/{article}', 'ArticleCommentController@showReply');
Route::put('/articles/comments/{comment}', 'ArticleCommentController@update');
Route::delete('/articles/comments/{comment}', 'ArticleCommentController@destroy');

Route::post('/articles/upvotes', 'ArticleUpvoteController@store');
Route::delete('/articles/upvotes/{upvote}', 'ArticleUpvoteController@destroy');

Route::resource('/snapshots', 'SnapshotController');

Route::get('/snapshots/comments/{snapshot}', 'SnapshotCommentController@show');
Route::post('/snapshots/comments', 'SnapshotCommentController@store');
Route::put('/snapshots/comments/{comment}', 'SnapshotCommentController@update');
Route::delete('/snapshots/comments/{comment}', 'SnapshotCommentController@destroy');

Route::get('/users/{user}/check-notify', 'UserController@checkNotify');
Route::get('/users/{user}', 'UserController@show');
Route::put('/users/{user}', 'UserController@update');

Route::post('/users/followers', 'FollowerController@store');
Route::post('/users/followers/unfollow', 'FollowerController@destroy');
Route::post('/users/followers/{user}', 'FollowerController@show');

Route::post('/images', 'ImageUploadController@store');

Route::get('/tags/{tag}', 'TagController@show');

