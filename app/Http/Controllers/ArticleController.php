<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Article;
use App\Article_Tag;
use Illuminate\Http\Request;
use App\User;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('user', 'tags', 'comments')
                    ->orderBy('id', 'desc')
                    ->paginate(10);
            
        return response($articles, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'user_id' => 'required|string',
            'thumbnail' => 'string',
        ]);

        $article = Article::create($data);

        $tags = explode(",", strtolower($request->tags));
        
        foreach($tags as $tag) {
            if($tag){
                Tag::firstOrCreate(['tag' => $tag]);
                $tag_id = Tag::where('tag', $tag)->first()->id;
                Article_Tag::create(['article_id' => $article->id, 'tag_id' => $tag_id]);
            }
        }
        
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
                'type' => 'POST',
                'source' => $article->id
            ])->with('channel', 'user')
              ->where('user_id', $request->user_id)
              ->get()
              ->pop();  
            
            event(new NotificationSent((string)$channel->user_id, $message));
        }

        return response($article, 201);
    }

    public function show(Article $article)
    {
        $article = Article::with(
            'user', 'tags', 'upvotes'
            )->get()
            ->find($article);

        return response($article, 200);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'user_id' => 'required|integer',
        ]);

        $article->update($data);

        return response($request, 200);
    }
    
    public function destroy(Article $article)
    {
        $article->delete();

        return response('Deleted Article', 200);
    }
}
