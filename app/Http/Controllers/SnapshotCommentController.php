<?php

namespace App\Http\Controllers;

use App\Snapshot;
use App\Snapshot_Comment;
use Illuminate\Http\Request;
use App\User;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;
        
class SnapshotCommentController extends Controller
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
            'snapshot_id' => 'required',
            'comment' => 'required|string',
            'user_id' => 'required'
        ]);

        $comment = Snapshot_Comment::create($data)
                   ->with('user', 'snapshot')
                   ->where('user_id', $request->user_id)
                   ->get()
                   ->pop();
                   
        $snapshot = $comment->snapshot;
        
        $channel = NotificationChannel::where('user_id', $snapshot->user_id)->first();
        $message = NotificationMessage::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->user_id,
            'type' => 'SNAPSHOT_COMMENT',
            'source' => $snapshot->id
        ])->with('channel', 'user')
          ->where('user_id', $request->user_id)
          ->get()
          ->pop();  
            
        event(new NotificationSent((string)$channel->user_id, $message));
        
        return response($comment, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function show(Snapshot $snapshot)
    {
        $comments = Snapshot_Comment::with('user')
            ->where('snapshot_id', $snapshot->id)
            ->get();

        return response($comments, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Snapshot_Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Snapshot_Comment $comment)
    {
        $data = $request->validate([
            'snapshot_id' => 'required|string',
            'comment' => 'required|string',
            'user_id' => 'required|string'
        ]);

        $comment->update($data);

        return response($comment, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Snapshot_Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Snapshot_Comment $comment)
    {
        $comment->delete();

        return response('Deleted Comment', 200);
    }
}
