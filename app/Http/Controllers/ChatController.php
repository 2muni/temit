<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\ChatChannel;
use App\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function create(Request $request)
    {
        $response = ChatChannel::firstOrCreate(['name' => $request->room]);

        return response($response, 201);
    }

    public function store(Request $request, $channel)
    {
        $channel = ChatChannel::where('name', $channel)->first();
        $message = ChatMessage::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->user_id,
            'body' => $request->body
        ])->with('user')->get()->pop();

        event(new MessageSent((string)$channel->name, $message));
    }
    
    public function show($channel)
    {
        $channel = ChatChannel::where('name', $channel)->first();
        $message = ChatMessage::with('user')->where('channel_id', $channel->id)->get();
        
        return $message;
    }
}
