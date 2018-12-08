<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\ChatChannel;
use App\ChatMessage;
use Illuminate\Http\Request;
use App\User;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;

class ChatController extends Controller
{
    public function create(Request $request)
    {
        $response = ChatChannel::firstOrCreate(['name' => $request->room]);

        return response($response, 201);
    }

    public function store(Request $request, $channel)
    {
        $chat_channel = ChatChannel::where('name', $channel)->first();
        $chat_message = ChatMessage::forceCreate([
            'channel_id' => $chat_channel->id,
            'user_id' => $request->user_id,
            'body' => $request->body
        ])->with('user')->get()->pop();
        
        
        event(new MessageSent((string)$chat_channel->name, $chat_message));
        
        $notification_channel = NotificationChannel::where(
            'user_id', $chat_channel->name / $request->user_id
        )->first();
        $notification_message = NotificationMessage::forceCreate([
            'channel_id' => $notification_channel->id,
            'user_id' => $request->user_id,
            'type' => 'CHAT',
            'source' => $request->body
        ])->with('channel', 'user')
          ->where('user_id', $request->user_id)
          ->get()
          ->pop();
            
        event(new NotificationSent((string)$notification_channel->user_id, $notification_message));
    }
    
    public function show($channel)
    {
        $channel = ChatChannel::where('name', $channel)->first();
        $message = ChatMessage::with('user')->where('channel_id', $channel->id)->get();
        
        return $message;
    }
}
