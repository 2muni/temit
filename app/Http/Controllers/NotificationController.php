<?php

namespace App\Http\Controllers;

use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function create(Request $request)
    {
        $response = NotificationChannel::firstOrCreate(['user_id' => $request->user_id]);

        return response($response, 201);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $channel)
    {
        $channel = NotificationChannel::where('user_id', $channel)->first();
        $message = NotificationMessage::forceCreate([
            'channel_id' => $channel->id,
            'type' => $request->user_id,
            'message' => $request->body
        ])->with('channel')->get()->pop();

        event(new NotificationSent((string)$channel->user_id, $message));
    }

    public function show($channel)
    {
        $channel = ChatChannel::where('user_id', $channel)->first();
        $message = ChatMessage::with('channel')->where('channel_id', $channel->id)->get();
        
        return $message;
    }
}
