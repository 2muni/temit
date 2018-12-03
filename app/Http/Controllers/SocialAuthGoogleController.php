<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Socialite;
use Exeption;

class SocialAuthGoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }


    public function callback()
    {
        try {
            
            $googleUser = Socialite::driver('google')->user();
            $existUser = User::where('email',$googleUser->email)->first();
            $token;
            $tokenResult;
            
            if($existUser) {
                $tokenResult = $existUser->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
            }
            else {
                $user = new User;
                $user->name = $googleUser->name;
                $user->email = $googleUser->email;
                $user->email_verified_at = now();
                $user->thumbnail = $googleUser->avatar;
                $user->password = md5(rand(1,10000));
                $user->save();
                
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
            }
            $responseURL=json_encode([
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
            ]);
            return redirect()->to("/login"."/".$responseURL);
        } 
        catch (Exception $e) {
            return 'error';
        }
    }
}
