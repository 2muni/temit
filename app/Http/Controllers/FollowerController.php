<?php

namespace App\Http\Controllers;

use App\User;
use App\Follower;
use App\Article;
use App\Snapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {   
        $arr = [];
        foreach($user->followees as $item) {
            array_push($arr, $item->id);
        };

        $articles = Article::with('user')
                        ->whereIn('user_id', $arr)
                        ->get();

        $snapshots = Snapshot::with('user')
                        ->whereIn('user_id', $arr)
                        ->get();

        $collection = $articles->merge($snapshots);

        $response = $collection
                    ->sortByDesc('created_at')
                    ->values()
                    ->all();

        //$response = User::with('articles', 'snapshots')->
        return Response($response, 201);
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
        
        $response = Follower::where('parent_id', $parent_id)
        ->where('follower_id', $follower_id)->delete();
        
        return Response($response, 202);
    }
}
