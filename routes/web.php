<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/google/redirect', 'SocialAuthGoogleController@redirect');
Route::get('/google/callback', 'SocialAuthGoogleController@callback');
Route::get('/github/redirect', 'SocialAuthGithubController@redirect');
Route::get('/github/callback', 'SocialAuthGithubController@callback');

Route::get('/{path?}', 'HomeController@index')
  ->where('path', '.*')->name('/');

