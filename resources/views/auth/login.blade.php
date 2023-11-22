@extends('layouts.app')

@section('content')
<div class="loginDiv">
    <div>
            <div class="returnLogo">
                <a href="/home">
                    <img width="200" class="returnImg" src="/img/png/logo.png" alt="logo Stampee" />
                </a>
            </div>
            <div class="login-box">
                <h2>Se connecter</h2>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <label for="email">Courriel</label>
                    <input type="text" id="email" name="email" value="{{ old('email') }}" class=" @error('email') is-invalid @enderror" required autocomplete="email" autofocus>
                    @error('email')
                        <span class="error_message" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <label for="password">Mot de passe</label>
                    <input type="password" id="Password" name="password" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
                    @error('password')
                        <span class="error_message" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    <input type="submit" value="Se Connecter" class="login_submit">
                </form>
            </div>
</div>
</div>



@endsection
