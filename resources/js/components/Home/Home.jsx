import React from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Home.css";
export default function Home() {
    return (
        <div>
            {/* <!-- HERO --> */}
            <div className="hero hero--accueil">
                <div className="wrapper wrapper--hero">
                    <h1 className="hero__text">Bienvenue sur Stampee</h1>
                    <h2 className="hero__text--sous-titre">
                        Une plateforme d'enchère d'exception
                    </h2>
                    <p className="hero__text hero__text--text-courant">
                        Participer à une enchère n’aura jamais été aussi simple
                        et rapide ! <br /> Découvrez dès maintenant notre
                        sélection.
                    </p>
                    <a className="btn" href="catalogue-enchere.html">
                        Voir toute les enchères
                    </a>
                </div>
                <div className="grid grid--hero">
                    <div className="bg bg--blue">
                        <h2 className="bg--blue-title">Comment ça marche ?</h2>
                        <p className="hero__text">
                            Aquérissez des timbres en quelques étapes :{" "}
                        </p>
                        <ul>
                            <li>
                                <strong>1.</strong> Connectez-vous ou
                                inscrivez-vous
                            </li>
                            <li>
                                <strong>2.</strong> Utilisez la recherche avancé
                                pour trouver la perle rare
                            </li>
                            <li className="hero__text--text-courant-var">
                                <strong>3.</strong> Misez et suivez vos enchères
                                favorites facilement
                            </li>
                        </ul>
                        <a className="link--border" href="#">
                            En savoir plus
                        </a>
                        <img
                            className="icone-link-arrow"
                            src="img/png/icone-link-arrow.png"
                            alt="icone fleche link"
                        />
                    </div>
                    <div className="bg bg--grey">
                        <h2>Découvrez les coups de coeur du Lord</h2>
                        <p className="hero__text--text-courant-var">
                            Repérez l'icone{" "}
                            <img
                                className="icone-coup-coeur"
                                src="img/png/icone-coup-de-coeur.png"
                                alt="icone coup de coeur lord"
                            />{" "}
                            afin de trouver les enchères favorites de notre
                            expert !
                        </p>
                        <a className="link--border-blue" href="#">
                            Voir tous les favoris
                        </a>
                        <img
                            className="icone-link-arrow"
                            src="img/png/icone-link-arrow-blue.png"
                            alt="icone fleche link"
                        />
                    </div>
                    <div className="bg bg--white">
                        <h2>Pas encore inscrit(e) ? </h2>
                        <p className="hero__text--text-courant">
                            Misez et profitez pleinement de Stampee en tant que
                            membre inscrit !
                        </p>
                        <div className="btn__container">
                            <a className="btn btn--orange" href="#">
                                Devenir membre
                            </a>
                            <a className="btn" href="#">
                                Se connecter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- CONTENU ACCUEIL --> */}
  			<div className="wrapper">
				{/* <!-- section OFFRES EN VEDETTE : présentation des offres en vedette --> */}
				<section>
					<h2>Offres en vedette</h2>
					<div className="grid grid--5">
						<div className="tile bg--tile">
							<div className="tile__container">
								<div>
									<p className="tile__lot">Lot #<strong>23</strong></p>
									<p className="tile__lot tile__lot--red"><strong>14d-8h-56m-2s</strong></p>
								</div>
								<img className="icone-coup-coeur" src="img/png/icone-coup-de-coeur.png" alt="icone coup de coeur lord"/>
							</div>
							<div className="tile__wrapper">
								<div className="tile__img-wrapper">
									<a href="enchere.html"><img className="tile__img" src="img/jpg/hero-enchere.jpg" alt="Image d'une enchère'"/></a>
								</div>
								<h3>CYPRUS 95 LH</h3>
								<p className="tile__text">Mise courante | <span>1&nbsp;offre</span></p>
								<span>10.50$</span>
								<p className="tile__text-small"><small>dernière offre par user2022</small></p>
								<a className="btn tile__btn" href="enchere.html">Miser</a>
							</div>
						</div>
						<div className="tile bg--tile">
							<div className="tile__container">
								<div>
									<p className="tile__lot">Lot #<strong>102</strong></p>
									<p className="tile__lot tile__lot--red"><strong>1d-7h-06m-28s</strong></p>
								</div>
							</div>
							<div className="tile__wrapper">
								<div className="tile__img-wrapper">
									<img className="tile__img" src="img/jpg/encheres/timbre-2.jpg" alt="Image d'une enchère'"/>
								</div>
								<h3>US California Scott #1</h3>
								<p className="tile__text">Mise courante | <span>5&nbsp;offres</span></p>
								<span>259.00$</span>
								<p className="tile__text-small"><small>dernière offre par user2022</small></p>
								<a className="btn tile__btn" href="enchere.html">Miser</a>
							</div>
						</div>
						<div className="tile bg--tile">
							<div className="tile__container">
								<div>
									<p className="tile__lot">Lot #<strong>45</strong></p>
									<p className="tile__lot tile__lot--red"><strong>9d-1h-40m-24s</strong></p>
								</div>
							</div>
							<div className="tile__wrapper">
								<div className="tile__img-wrapper">
									<img className="tile__img" src="img/jpg/encheres/timbre-3.jpg" alt="Image d'une enchère"/>
								</div>
								<h3>USA 1857 Scott #36 Used. Deep color</h3>
								<p className="tile__text">Mise courante | <span>10&nbsp;offres</span></p>
								<span>79.00$</span>
								<p className="tile__text-small"><small>dernière offre par user2022</small></p>
								<a className="btn tile__btn" href="enchere.html">Miser</a>
							</div>
						</div>
						<div className="tile bg--tile">
							<div className="tile__container">
								<div>
									<p className="tile__lot">Lot #<strong>121</strong></p>
									<p className="tile__lot tile__lot--red"><strong>10h-50m-05s</strong></p>
								</div>
								<img className="icone-coup-coeur" src="img/png/icone-coup-de-coeur.png" alt="icone coup de coeur lord"/>
							</div>
							<div className="tile__wrapper">
								<div className="tile__img-wrapper">
									<img className="tile__img" src="img/jpg/encheres/timbre-4.jpg" alt="Image d'une enchère"/>
								</div>
								<h3>AFFORDABLE GENUINE SCOTT USED SET</h3>
								<p className="tile__text">Mise courante | <span>2&nbsp;offres</span></p>
								<span>150.00$</span>
								<p className="tile__text-small"><small>dernière offre par user2022</small></p>
								<a className="btn tile__btn" href="enchere.html">Miser</a>
							</div>
						</div>
						<div className="tile bg--tile">
							<div className="tile__container">
								<div>
									<p className="tile__lot">Lot #<strong>67</strong></p>
									<p className="tile__lot tile__lot--red"><strong>21d-11h-12m-11s</strong></p>
								</div>
							</div>
							<div className="tile__wrapper">
								<div className="tile__img-wrapper">
									<img className="tile__img" src="img/jpg/encheres/timbre-5.jpg" alt="Image d'une enchère"/>
								</div>
								<h3>Used 50¢ XF Well Centered GEM With PFC Graded</h3>
								<p className="tile__text">Mise courante | <span>Aucune&nbsp;offre</span></p>
								<span>10.00$</span>
								<p className="tile__text-small"><small>dernière offre par user2022</small></p>
								<a className="btn tile__btn" href="enchere.html">Miser</a>
							</div>
						</div>
					</div>
				</section>

				{/* <!-- section CATEGORIES : présentation des catégories --> */}
				<section>
					<h2>Catégories</h2>
					<div className="grid grid--3">
						<div className="tile tile--center bg--tile">
							<div className="tile__img-container tile__img-container--first">
								<h3>Les plus populaire</h3>
							</div>
							<a className="btn" href="#">Voir tout</a>
						</div>
						<div className="tile tile--center bg--tile">
							<div className="tile__img-container tile__img-container--second">
								<h3>Bientôt terminées</h3>
							</div>
							<a className="btn" href="#">Voir tout</a>
						</div>
						<div className="tile tile--center bg--tile">
							<div className="tile__img-container tile__img-container--third">
								<h3>Nouvelles offres</h3>
							</div>
							<a className="btn" href="#">Voir tout</a>
						</div>
					</div>
				</section>
			</div>
			{/* <!-- section ACTUALITÉS : présentation des actualités récentes --> */}
			<section className="bg--blue">
				<div className="wrapper">
					<h2 className="bg--blue-title">Actualités</h2>
					<h3 className="bg--blue-title">Récemment publié</h3>
					<div className="grid grid--3-var">
						<div className="tile bg--tile-white">
							<small>Publié le 06/04/2022</small>
							<div className="tile__container">
								<img  src="img/jpg/actualites/article-1.jpg" alt="Image du premier article"/>
								<a className="btn" href="#">Lire l'article</a>
							</div>
							<h4>Comment j'ai appris à regarder les timbres</h4>
							<small>Par Lord Réginald Stampee</small>
							<p>
								Nisi scelerisque eu ultrices vitae auctor
								eu augue ut lectus. Sit amet cursus sit
								amet. Leo vel orci porta non pulvinar
								neque laoreet. Risus sed vulputate...
							</p>
						</div>
						<div className="tile bg--tile-white">
							<small>Publié le 05/04/2022</small>
							<div className="tile__container">
								<img  src="img/jpg/actualites/article-2.jpg" alt="Image du deuxième article"/>
								<a className="btn" href="#">Lire l'article</a>
							</div>
							<h4>Paradis des enchères - Une heure à Londre</h4>
							<small>Par Lord Réginald Stampee</small>
							<p>
								Nisi scelerisque eu ultrices vitae auctor
								eu augue ut lectus. Sit amet cursus sit
								amet. Leo vel orci porta non pulvinar
								neque laoreet. Risus sed vulputate...
							</p>
						</div>
						<div className="tile tile--no-bg">
							<a href="#"><div className="tile__container bg--no-bg">
								<img width="75" src="img/png/icone-timbre.png" alt="Icone d'un timbre"/>
								<p className="link--border">Timbres</p><img className="icone-link-arrow" src="img/png/icone-link-arrow.png" alt="icone fleche link"/>
							</div></a>
							<a href="#"><div className="tile__container bg--no-bg">
								<img width="75" src="img/png/icone-enchere.png" alt="Icone d'un marteau"/>
								<p className="link--border">Enchères</p><img className="icone-link-arrow" src="img/png/icone-link-arrow.png" alt="icone fleche link"/>
							</div></a>
							<a href="#"><div className="tile__container bg--no-bg bg--no-bg-border">
								<img width="75" src="img/png/icone-bridge.png" alt="Icone d'un jeu de carte"/>
								<p className="link--border">Bridge</p><img className="icone-link-arrow" src="img/png/icone-link-arrow.png" alt="icone fleche link"/>
							</div></a>
						</div>
					</div>
				</div>
			</section>
			<div className="wrapper">
				{/* <!-- section NOTRE MISSION : présentation du lord --> */}
				<section>
					<h2>Notre mission</h2>
					<div className="grid grid--2">
						<div className="tile bg--tile">
							<div className="tile__container-text-img">
								<img className="tile__img tile__img-container tile__img--border" src="img/jpg/lord-stampee.jpg" alt="Image du Lord"/>
								<div className="tile__container-text">
									<h3>Une plateforme pour les passionné(e)s</h3>
									<p>
										Lord Reginald Stampee, duc de Worcessteshear et philatéliste depuis sa
										tendre enfance au milieu des années cinquante, Venenatis urna cursuse
										nunc scelerisque viverra mauris in. Dolor sit amet consectetur adipiscing
										purus sit. Vel pharetra vel turpis nunc eget lorem dolor sed. Vitae congue
									</p>
									<a className="btn" href="#">Lire la suite</a>
								</div>
							</div>
						</div>
						<div className="tile tile--center bg--tile">
							<div className="tile__img-container bg--blue">
								<p className="tile--center-text">Notre équipe est toujours prête à répondre à vos questions dans les plus bref délais !</p>
							</div>
							<a className="btn" href="#">Contactez-nous</a>
						</div>
					</div>
				</section>
			</div>
        </div>
    );
}

if (document.getElementById("home")) {
    const Index = ReactDOM.createRoot(document.getElementById("home"));

    Index.render(
        <React.StrictMode>
            <Home />
        </React.StrictMode>
    );
}
