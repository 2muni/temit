@extends('layouts.app')

@section('content')

<div class="auth">
    <a class="logo" href="{{ url('/') }}">{{ __('temit') }}</a>
    <div class="card">
        <div class="card-content">

            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif
            
            <form method="POST" action="{{ route('password.email') }}">
                @csrf
                
                <div class="input-field">
                    <label for="email">{{ __('가입한 메일 주소') }}</label>
                    <input id="email" type="email" class="validate form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
                    
                    @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                <button type="submit" class="waves-effect waves-light btn">{{ __('비밀번호 초기화') }}</button>
            </form>
        </div>
    </div>
</div>
@endsection
