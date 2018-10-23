@extends('layouts.app')

@section('content')

<div class="auth">
    <a class="logo" href="{{ url('/') }}">{{ __('temit') }}</a>
    <div class="card">
        <div class="card-content">
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <div class="input-field">
                    <label>{{ __('이름') }}</label>
                    <input id="name" type="text" class="validate form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                    @if ($errors->has('name'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="input-field">
                    <label>{{ __('이메일') }}</label>
                    <input id="email" type="email" class="validate form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
                    
                    @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="input-field">
                    <label>{{ __('비밀번호') }}</label>
                    <input id="password" type="password" class="validate form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                    @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="input-field">
                    <label>{{ __('비밀번호 재입력') }}</label>
                    <input id="password-confirm" type="password" class="validate form-control" name="password_confirmation" required>
                </div>
                <button type="submit" class="waves-effect waves-light btn">{{ __('회원가입') }}</button>
            </form>
        </div>
    </div>
    <div class="card">
        <div class="card-content">
            <div class="center" >
                {{ __('계정이 있으신가요? ') }}<a href="{{ route('login') }}">{{ __('로그인') }}</a>
            </div>
        </div>
    </div>
</div>

@endsection
