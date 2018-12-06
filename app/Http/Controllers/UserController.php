<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;
        // $channel = NotificationChannel::where('user_id', $channel)->first();
        // $message = NotificationMessage::forceCreate([
        //     'channel_id' => $channel->id,
        //     'type' => $request->user_id,
        //     'message' => $request->body
        // ])->with('channel')->get()->pop();

        // event(new NotificationSent((string)$channel->user_id, $message));
        
class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {   
        $user = User::with('followees', 'followers')
        ->get()
        ->find($user);
        
        return Response($user, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'thumbnail' => 'required|string'
        ]);

        $user->update($data);

        return response($user, 201);
    }
    
    public function checkNotify(User $user)
    {
        $user->update(
            ['notified_at'=>now()]
        );
        
        return response ($user, 202);
    }
}
