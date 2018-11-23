<?php

namespace App\Http\Controllers;

use App\Snapshot;
use App\Snapshot_Comment;
use Illuminate\Http\Request;

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
            'snapshot_id' => 'required|string',
            'comment' => 'required|string',
            'user_id' => 'required|string'
        ]);

        $comment = Snapshot_Comment::create($data);

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
