<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

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
            // $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
            // $extension = $request->file('image')->getClientOriginalExtension();

            if($path == 'articles') {
                //$filenametostore = $user_id.'/'.'articles/'.$filename.'_'.time().'.'.$extension;
                $filenametostore = $user_id.'/'.'articles/'.$filenamewithextension.'_'.time();
            }else if($path == 'avatar') {
                $filenametostore = $user_id.'/'.'avatar/'.$filenamewithextension;
            }else {
                $filenametostore = '';
            }
            Storage::disk('s3')->put($filenametostore, fopen($request->file('image'), 'r+'), 'public');

            return env("AWS_URL").$filenametostore;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
