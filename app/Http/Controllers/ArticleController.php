<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Article;
use App\Article_Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::with('user', 'tags')
            ->orderBy('id', 'desc')
            ->paginate(10);
            
        return $articles;
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
            'title' => 'required|string',
            'body' => 'required|string',
            'user_id' => 'required|integer',
            'thumbnail' => 'string',
        ]);

        Article::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $request->user_id,
            'thumbnail' => $request->thumbnail
        ]);

        $article_id = Article::with('user')
        ->orderBy('id', 'desc')->first()->id;

        $tags = explode(",", strtolower($request->tags));

        foreach($tags as $tag) {
            Tag::firstOrCreate(['tag' => $tag]);
            $tag_id = Tag::where('tag', $tag)->first()->id;
            Article_Tag::create(['article_id' => $article_id, 'tag_id' => $tag_id]);
        }

        return $article_id;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $article = Article::with('user', 'tags')
            ->get()
            ->find($article);

        return response($article, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return response('Deleted Article', 200);
    }
}
