<?php

namespace App\Http\Controllers;

use App\Snapshot;
use Illuminate\Http\Request;

class SnapshotController extends Controller
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
        $request->validate([
            'body' => 'required|string',
            'user_id' => 'required|string',
            'uri' => 'string',
        ]);

        $response = Snapshot::create([
            'body' => $request->body,
            'user_id' => $request->user_id,
            'uri' => $request->uri
        ]);

        return Response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function show(Snapshot $snapshot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function edit(Snapshot $snapshot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Snapshot $snapshot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Snapshot  $snapshot
     * @return \Illuminate\Http\Response
     */
    public function destroy(Snapshot $snapshot)
    {
        $snapshot->delete();

        return Response('Delete Snapshot', 200);
    }
}
