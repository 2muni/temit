<?php

namespace App\Http\Controllers;

use App\User;
use App\Follower;
use App\Article;
use App\Snapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;
        
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
            'parent_id' => 'required',
            'follower_id' => 'required',
        ]);
            
        $follower = Follower::firstOrCreate($data);
        
        $channel = NotificationChannel::where('user_id', $request->parent_id)->first();
        $message = NotificationMessage::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->follower_id,
            'type' => 'FOLLOW',
            'source' => $request->follower_id
        ])->with('channel', 'user')
          ->where('user_id', $request->follower_id)
          ->get()
          ->pop();
            
        event(new NotificationSent((string)$channel->user_id, $message));
        
        return Response($follower, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {   
        $arr = [$user->id];
        foreach($user->followees as $item) {
            array_push($arr, $item->id);
        };

        $articles = Article::with('user')
                        ->whereIn('user_id', $arr)
                        ->get();

        $snapshots = Snapshot::with('user', 'comments')
                        ->whereIn('user_id', $arr)
                        ->get();

        $collection = $articles->merge($snapshots);

        $response = $collection
                    ->sortByDesc('created_at')
                    ->values()
                    ->forPage($request->page, 5)
                    ->values()
                    ->all();

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
        $response = Follower::where('parent_id', $request['parent_id'])
        ->where('follower_id', $request['follower_id'])->delete();
        
        return Response($response, 202);
    }
}
