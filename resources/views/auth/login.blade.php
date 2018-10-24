@extends('layouts.app')

@section('content')

<div class="auth">
    <a class="logo" href="{{ url('/') }}">{{ __('temit') }}</a>
    <div class="card">
        <div class="card-content">
            <form method="POST" action="{{ route('login') }}">
                @csrf
                <div class="input-field email">
                    <label for="email">{{ __('이메일') }}</label>
                    <input id="email" type="email" class="validate form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

                    @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="input-field">
                <label for="password">{{ __('비밀번호') }}</label>
                <input id="password" type="password" class="validate orm-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
                </div>
                <button type="submit" class="waves-effect waves-light btn">{{ __('로그인') }}</button>
                <!--
                <a class="btn btn-link" href="{{ route('password.request') }}">{{ __('비밀번호를 잊으셨나요?') }}</a>
                -->
            </form>
        </div>
    </div>
    <div class="card">
        <div class="card-content">
            <div class="center" >
            {{ __('계정이 없으신가요? ') }}<a href="{{ route('register') }}">{{ __('회원가입') }}</a>
            </div>
        </div>
    </div>
</div>
@endsection
