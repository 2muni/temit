<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Article;
use App\Article_Tag;
use Illuminate\Http\Request;
use App\Events\NotificationSent;
use App\NotificationChannel;
use App\NotificationMessage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(
            'user', 'tags', 'comments'
            )->orderBy('id', 'desc')
            ->paginate(10);
            
        return $articles;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'user_id' => 'required|string',
            'thumbnail' => 'string',
        ]);

        Article::create($data);

        $article_id = Article::with('user')
        ->orderBy('id', 'desc')->first()->id;

        $tags = explode(",", strtolower($request->tags));
        
        foreach($tags as $tag) {
            if($tag){
                Tag::firstOrCreate(['tag' => $tag]);
                $tag_id = Tag::where('tag', $tag)->first()->id;
                Article_Tag::create(['article_id' => $article_id, 'tag_id' => $tag_id]);
            }
        }
        
        $channel = NotificationChannel::where('user_id', $request->user_id)->first();
        $message = NotificationMessage::forceCreate([
            'channel_id' => $channel->id,
            'user_id' => $request->user_id,
            'type' => 'POST',
            'message' => $article_id
        ])->with('channel')->get()->pop();

        event(new NotificationSent((string)$channel->user_id, $message));
        
        return $article_id;
    }

    public function show(Article $article)
    {
        $article = Article::with(
            'user', 'tags', 'upvotes'
            )->get()
            ->find($article);

        return Response($article, 200);
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

        return Response('Deleted Article', 200);
    }
}
