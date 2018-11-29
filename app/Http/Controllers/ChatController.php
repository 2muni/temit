<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Channel;
use App\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
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
    public function create(Request $request)
    {
        $response = Channel::firstOrCreate(['name' => $request->room]);

        return response($response, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $channel)
    {

        $channel = Channel::where('name', $channel)->first();
        $message = Message::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->user_id,
            'body' => $request->body
        ]);

        event(new MessageSent((string)$channel->name, $message));
    
        return $message;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function show($channel)
    {
        $channel = Channel::where('name', $channel)->first();
        $message = Message::where('channel_id', $channel->id)->get();
        
        return $message;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function edit(Channel $channel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Channel $channel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Channel $channel)
    {
        //
    }
}
