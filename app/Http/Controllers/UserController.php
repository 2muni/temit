<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {   
        $user = User::with('follwers')
        ->get()
        ->find($user);
        
        return Response($user, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'thumbnail' => 'required|string'
        ]);

        $user->update($data);

        return response($user, 201);
    }
}
