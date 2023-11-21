import React from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Nav.css";

export default function Nav() {
    return (
        <div>
            <nav className="menu">
                {/* <!-- menu principal --> */}
                <ul className="menu__list menu__list--principal">
                    <li className="menu__item menu__item--principal">
                        <a className="menu__link" href="/catalogue">
                            Catalogue d'enchères
                        </a>
                        <ul className="menu__dropdown">
                            <li className="menu__item">
                                <a className="menu__link" href="/catalogue">
                                    En cours
                                </a>
                            </li>
                            <li className="menu__item">
                                <a
                                    className="menu__link"
                                    href="catalogue-enchere.html"
                                >
                                    Archive
                                </a>
                            </li>
                        </ul>
                        <img
                            className="icone-dropdown-arrow"
                            src="/img/png/icone-dropdown-arrow.png"
                            alt="fleche dropwdown"
                        />
                    </li>
                    <li className="menu__item menu__item--principal">
                        <a className="menu__link" href="#">
                            Fonctionnement
                        </a>
                        <ul className="menu__dropdown">
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Termes et conditions
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Aide
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Contactez le webmestre
                                </a>
                            </li>
                        </ul>
                        <img
                            className="icone-dropdown-arrow"
                            src="/img/png/icone-dropdown-arrow.png"
                            alt="fleche dropwdown"
                        />
                    </li>
                    <li className="menu__item menu__item--principal">
                        <a className="menu__link" href="">
                            À propos de Lord Réginald Stampee III
                        </a>
                        <ul className="menu__dropdown">
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    La philatélie, c'est la vie.
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Biographie du Lord
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Historique familial
                                </a>
                            </li>
                        </ul>
                        <img
                            className="icone-dropdown-arrow"
                            src="/img/png/icone-dropdown-arrow.png"
                            alt="fleche dropwdown"
                        />
                    </li>
                    <li className="menu__item menu__item--principal menu__border">
                        <a className="menu__link" href="#">
                            contactez-nous
                        </a>
                    </li>
                </ul>
                {/* <!-- menu hamburger --> */}
                {/* <div className="menu__logo"><a href="index.html"><img src="/img/png/logo.png" alt="logo Stampee"/></a></div>
			<div className="input-bar input-bar--tablet">
				<div className="input-bar__text">
					<p>Avancée</p>
					<img className="icone-dropdown-arrow icone-dropdown-arrow--input-bar" src="/img/png/icone-dropdown-arrow-blue.png" alt="fleche dropwdown"/>
				</div>
				<input className="input-bar__input" type="text" id="input-bar-tablet" name="input-bar" placeholder="Trouvez une enchère"/>
			</div>
			<button className="burger" aria-label="burger"  data-js-burger>
				<span className="burger__bar"></span>
                <span className="burger__bar"></span>
                <span className="burger__bar"></span>
            </button> */}
            </nav>
        </div>
    );
}

if (document.getElementById("nav")) {
    const Index = ReactDOM.createRoot(document.getElementById("nav"));

    Index.render(
        <React.StrictMode>
            <Nav />
        </React.StrictMode>
    );
}
