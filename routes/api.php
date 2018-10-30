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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/articles', 'ArticleController@index');
Route::post('/articles', 'ArticleController@store');
Route::get('/articles/{article}', 'ArticleController@show');
Route::put('/articles/{article}', 'ArticleController@update');
Route::delete('/articles/{article}', 'ArticleController@destroy');

Route::get('/users/{user}', 'UserController@show');
Route::patch('/users/{user}', 'UserController@update');

Route::post('/images', 'ImageUploadController@store');

Route::get('/comments/{article}', 'CommentController@show');
Route::post('/comments', 'CommentController@store');
Route::post('/comments/{article}', 'CommentController@showReply');
Route::put('/comments/{comment}', 'CommentController@update');
Route::delete('/comments/{comment}', 'CommentController@destroy');

Route::get('/tags/{tag}', 'TagController@show');

