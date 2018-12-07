<?php

namespace App\Http\Controllers;

use App\Snapshot;
use Illuminate\Http\Request;
use App\User;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;
        
class SnapshotController extends Controller
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
        $data = $request->validate([
            'body' => 'required|string',
            'user_id' => 'required|string',
            'uri' => 'string',
        ]);

        $snapshot = Snapshot::create($data);

        $followers = User::with('followers')
            ->where('id', $request->user_id)->first()
            ->followers;
        
        $rooms = [];
        
        foreach($followers as $follow) {
            array_push($rooms, $follow->id);
        }
            
        $channels = NotificationChannel::whereIn('user_id', $rooms)->get();
        
        foreach($channels as $channel) {
            $message = NotificationMessage::forceCreate([
                'channel_id' => $channel->id,
                'user_id' => $request->user_id,
                'type' => 'SNAPSHOT',
                'source' => $snapshot->id
            ])->with('channel', 'user')
              ->where('user_id', $request->user_id)
              ->get()
              ->pop();  
            
            event(new NotificationSent((string)$channel->user_id, $message));
        }

        return response($snapshot, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function show(Snapshot $snapshot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function edit(Snapshot $snapshot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Snapshot $snapshot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function destroy(Snapshot $snapshot)
    {
        $snapshot->delete();

        return Response('Delete Snapshot', 200);
    }
}
