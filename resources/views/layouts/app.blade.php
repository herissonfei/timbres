<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&family=Monserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <!-- CSS -->
    <!-- <link rel="stylesheet" href="{{ asset('css/entete.css') }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}"> -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="{{ asset('script/menu.js') }}"></script>

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="app" class="page-container">
        <header class="header header--bg">
			<div class="wrapper--header">
				<a href="index.html"><img class="header__logo" src="/img/png/logo.png" alt="logo Stampee"/></a>
				<div class="input-bar">
					<div class="input-bar__text">
						<p>Avancée</p>
						<img class="icone-dropdown-arrow icone-dropdown-arrow--input-bar" src="img/png/icone-dropdown-arrow-blue.png" alt="fleche dropwdown"/>
					</div>
					<input class="input-bar__input" type="text" id="input-bar" name="input-bar" placeholder="Trouvez une enchère"/>
				</div>
				<!-- Connexion/Inscription -->
				<ul class="wrapper--header menu__sous-menu menu__sous-menu--header">
					<li class="menu__item"><a href="">Se connecter</a></li>
					<li class="menu__item"><a href="">Devenir membre</a></li>
				</ul>
			</div>
        </header> 
       <!-- Barre de navigation -->
        <nav class="menu">
            <!-- menu principal -->
            <!-- <ul class="menu__list menu__list--principal">
				<li class="menu__item menu__item--principal"><a class="menu__link" href="catalogue-enchere.html">Catalogue d'enchères</a>
					<ul class="menu__dropdown">
						<li class="menu__item"><a class="menu__link" href="catalogue-enchere.html">En cours</a></li>
                        <li class="menu__item"><a class="menu__link" href="catalogue-enchere.html">Archive</a></li>
                    </ul> 
					<img class="icone-dropdown-arrow" src="img/png/icone-dropdown-arrow.png" alt="fleche dropwdown"/>
				</li>
                <li class="menu__item menu__item--principal"><a class="menu__link" href="#">Fonctionnement</a>
					<ul class="menu__dropdown">
                        <li class="menu__item"><a class="menu__link" href="#">Termes et conditions</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Aide</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Contactez le webmestre</a></li>
                    </ul> 
					<img class="icone-dropdown-arrow" src="img/png/icone-dropdown-arrow.png" alt="fleche dropwdown"/>
				</li>
                <li class="menu__item menu__item--principal"><a class="menu__link" href="">À propos de Lord Réginald Stampee III</a>
					<ul class="menu__dropdown">
                        <li class="menu__item"><a class="menu__link" href="#">La philatélie, c'est la vie.</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Biographie du Lord</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Historique familial</a></li>
                    </ul> 
					<img class="icone-dropdown-arrow" src="img/png/icone-dropdown-arrow.png" alt="fleche dropwdown"/>
				</li>
                <li class="menu__item menu__item--principal menu__border"><a class="menu__link" href="#">contactez-nous</a></li>
            </ul> -->
            <!-- menu hamburger -->
            <div class="menu__logo"><a href="index.html"><img src="/img/png/logo.png" alt="logo Stampee"/></a></div>
			<div class="input-bar input-bar--tablet">
				<div class="input-bar__text">
					<p>Avancée</p>
					<img class="icone-dropdown-arrow icone-dropdown-arrow--input-bar" src="img/png/icone-dropdown-arrow-blue.png" alt="fleche dropwdown"/>
				</div>
				<input class="input-bar__input" type="text" id="input-bar-tablet" name="input-bar" placeholder="Trouvez une enchère"/>
			</div>
			<button class="burger" aria-label="burger"  data-js-burger>
				<span class="burger__bar"></span>
                <span class="burger__bar"></span>
                <span class="burger__bar"></span>
            </button>
        </nav>
        <!-- Barre de recherche mobile -->
        <div class="input-bar input-bar--mobile" role="search" aria-label="search-bar-input">
            <div class="input-bar__text">
                <p>Avancée</p>
                <img class="icone-dropdown-arrow icone-dropdown-arrow--input-bar" src="img/png/icone-dropdown-arrow-blue.png" alt="fleche dropwdown"/>
            </div>
            <input class="input-bar__input" type="text" id="input-bar-mobile" name="input-bar" placeholder="Trouvez une enchère"/>
		</div>
        <!-- menu mobile -->
        <aside class="menu__mobile menu--close" data-js-menu>
            <!-- Bouton close -->
            <div class="menu__close--wrapper" data-js-close>
                <button class="menu__close" aria-label="menu-close"></button>
            </div>
            <!-- Contenu du menu mobile-->
            <ul class="menu__list menu__list--mobile">
				<li class="menu__item menu__item--principal"><a class="menu__link" href="catalogue-enchere.html">Catalogue d'enchères</a>
					<ul class="menu__dropdown">
                        <li class="menu__item"><a class="menu__link" href="catalogue-enchere.html">En cours</a></li>
                        <li class="menu__item"><a class="menu__link" href="catalogue-enchere.html">Archive</a></li>
                    </ul> 
				</li>
                <li class="menu__item menu__item--principal"><a class="menu__link" href="#">Fonctionnement</a>
					<ul class="menu__dropdown">
                        <li class="menu__item"><a class="menu__link" href="#">Termes et conditions</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Aide</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Contactez le webmestre</a></li>
                    </ul> 
				</li>
                <li class="menu__item menu__item--principal"><a class="menu__link" href="">À propos de Lord Réginald Stampee III</a>
					<ul class="menu__dropdown">
                        <li class="menu__item"><a class="menu__link" href="#">La philatélie, c'est la vie.</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Biographie du Lord</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Historique familial</a></li>
                    </ul> 
				</li>
                <li class="menu__item menu__item--principal"><a class="menu__link" href="#">contactez-nous</a></li>
            </ul>
            <a href="index.html"><img class="footer__logo" src="img/png/logo.png" alt="logo Stampee"/></a>
			<!-- Connexion/Inscription -->
			<ul class="wrapper--header menu__sous-menu menu__sous-menu--mobile ">
				<li class="menu__item"><a href="">Se connecter</a></li>
				<li class="menu__item"><a href="">Devenir membre</a></li>
			</ul>
        </aside>
        <main class="wrapper-contenu">
            @yield('content')
        </main>

    </div>
    

</body>
</html>
