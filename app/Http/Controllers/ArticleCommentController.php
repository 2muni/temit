<?php

namespace App\Http\Controllers;

use App\Article_Comment;
use App\Article;
use Illuminate\Http\Request;
use App\User;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;

class ArticleCommentController extends Controller
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
            'article_id' => 'required',
            'comment' => 'required|string',
            'reply_to' => 'string',
            'user_id' => 'required'
        ]);

        $comment = Article_Comment::create($data)
                   ->with('user', 'article')
                   ->where('user_id', $request->user_id)
                   ->get()
                   ->pop();
                   
        $article = $comment->article;
        
        $channel = NotificationChannel::where('user_id', $article->user_id)->first();
        $message = NotificationMessage::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->user_id,
            'type' => 'POST_COMMENT',
            'source' => $article->id
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
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $comments = Article_Comment::with('user')->where('article_id', $article->id)->get();

        return response($comments, 200);

    }

    /**
     * Show the form for editing the specified resource.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function showReply(Request $request, Article $article)
    {   
        $comments = Article_Comment::with('user')
            ->where('article_id', $article->id)
            ->where('reply_to', $request->reply_to)
            ->get();

        return response($comments, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article_Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article_Comment $comment)
    {
        $data = $request->validate([
            'article_id' => 'required|string',
            'comment' => 'required|string',
            'reply_to' => 'string',
            'user_id' => 'string'
        ]);

        $comment->update($data);

        return response($comment, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article_Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article_Comment $comment)
    {
        $comment->delete();

        return response('Deleted Comment', 200);
    }
}
