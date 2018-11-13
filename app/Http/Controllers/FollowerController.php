<?php

namespace App\Http\Controllers;

use App\Follower;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {         
        $data = $request->validate([
            'parent_id' => 'required|string',
            'follower_id' => 'required|string',
        ]);
        
        $response = Follower::firstOrCreate($data);

        return Response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Follower  $follower
     * @return \Illuminate\Http\Response
     */
    public function show(Follower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {   
        
        $parent_id = $request->parent_id;
        $follower_id = $request->follower_id;
        
        $response = Follower::where('parent_id', '=', $parent_id)
        ->where('follower_id', '=', $follower_id)->delete();
        
        return Response($response, 202);
    }
}
