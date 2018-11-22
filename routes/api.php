<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

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
Route::resource('/snapshots', 'SnapshotController');

Route::get('/articles/comments/{article}', 'ArticleCommentController@show');
Route::post('/articles/comments', 'ArticleCommentController@store');
Route::post('/articles/comments/{article}', 'ArticleCommentController@showReply');
Route::put('/articles/comments/{comment}', 'ArticleCommentController@update');
Route::delete('/articles/comments/{comment}', 'ArticleCommentController@destroy');

Route::get('/users/{user}', 'UserController@show');
Route::put('/users/{user}', 'UserController@update');

Route::post('/users/followers', 'FollowerController@store');
Route::delete('/users/followers', 'FollowerController@destroy');
Route::get('/users/followers/{user}', 'FollowerController@show');

Route::post('/images', 'ImageUploadController@store');

Route::get('/tags/{tag}', 'TagController@show');

