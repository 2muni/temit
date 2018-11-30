<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if($request->hasFile('image')) {
            $user_id = $request->user_id;
            $path = $request->path;

            $filenamewithextension = $request->file('image')->getClientOriginalName();

            if($path == 'articles') {
                $filenametostore = $user_id.'/'.'articles/'.$filenamewithextension.'_'.(time()*(int)$user_id);
            }else if($path == 'snapshots') {
                $filenametostore = $user_id.'/'.'snapshots/'.$filenamewithextension.'_'.(time()*(int)$user_id);
            }else if($path == 'avatar') {
                $filenametostore = $user_id.'/'.'avatar/'.$filenamewithextension;
            }else {
                $filenametostore = '';
            }
            Storage::disk('s3')->put($filenametostore, fopen($request->file('image'), 'r+'), 'public');

            return env("AWS_URL").$filenametostore;
        }
    }
}
