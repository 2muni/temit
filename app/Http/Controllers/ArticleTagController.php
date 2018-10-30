<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Article;
use App\Article_Tag;
use Illuminate\Http\Request;

class ArticleTagController extends Controller
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
        $tags = explode(",", strtolower($request->tags));
        $article_id = $request->article_id;

        foreach($tags as $tag) {
            Tag::firstOrCreate(['tag' => $tag]);
            $tag_id = Tag::where('tag', $tag)->first()->id;
            Article_Tag::craete(['article_id' => $article_id, 'tag_id' => $tag_id]);
        }
        return $data;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article_Tag  $article_tag
     * @return \Illuminate\Http\Response
     */
    public function show(Article_Tag $article_tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article_Tag  $article_tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Article_Tag $article_tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article_Tag  $article_tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article_Tag $article_tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article_Tag  $article_tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article_Tag $article_tag)
    {
        //
    }
}
