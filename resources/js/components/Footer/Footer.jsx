import React from "react";
import ReactDOM from "react-dom/client";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <img width="150" src="/img/png/logo.png" alt="logo Stampee" />
            <div className="wrapper grid grid--3-var-footer footer--border-white">
                <section>
                    <h2>Accès rapides</h2>
                    <ul className="footer__menu">
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Actualités
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                La philatélie, c'est la vie
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Biographie du Lord
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Historique familial
                            </a>
                        </li>
                    </ul>
                    {/* <!-- Connexion/Inscription --> */}
                    <ul className="wrapper--header menu__sous-menu menu__sous-menu--footer">
                        <li className="menu__item">
                            <a href="">Se connecter</a>
                        </li>
                        <li className="menu__item">
                            <a href="">Devenir membre</a>
                        </li>
                    </ul>
                    <br />
                    <small>© Stampee 2022, Tous droits réservés</small>
                </section>

                <section>
                    <h2>Abonnez-vous à notre infolettre !</h2>
                    <p className="tile__text tile__text--white">
                        Prenez connaissance en avance de toutes nos nouveautés
                        et profiter d'offres exceptionnels !
                    </p>
                    <form action="#" method="POST">
                        <div className="input-bar">
                            <input
                                className="input-bar__input"
                                type="text"
                                id="input-bar-footer"
                                name="input-bar"
                                placeholder="Entrez votre courriel"
                            />
                            <div className="input-bar__text">
                                <p>S'abonner</p>
                            </div>
                        </div>
                    </form>
                    <i className="fab fa-brands fa-facebook-square fa-lg icone-social"></i>
                    <i className="fab fa-brands fa-twitter-square fa-lg icone-social"></i>
                    <i className="fab fa-instagram fa-lg icone-social"></i>
                </section>

                <section>
                    <h2>Contact & support</h2>
                    <ul className="footer__menu">
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Termes et conditions
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Aide
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Contactez le webmestre
                            </a>
                        </li>
                        <li className="menu__item menu__item--footer">
                            <a className="menu__link" href="#">
                                Contactez-nous
                            </a>
                        </li>
                    </ul>
                    <address>
                        {/* <!-- Adresse --> */}
                        <p>
                            1748 Princes St, Richmond <br /> TW9 1ED,
                            Royaume-Uni
                        </p>
                        {/* <!-- Telephone --> */}
                        <p>
                            <a href="tel:442089402218">+442089402218</a>
                        </p>
                        {/* <!-- Courriel --> */}
                        <p>
                            <a href="mailto:contact.info@stampee.co.uk">
                                contact.info@stampee.co.uk
                            </a>
                        </p>
                    </address>
                </section>
            </div>
        </footer>
    );
}

if (document.getElementById("footer")) {
    const Index = ReactDOM.createRoot(document.getElementById("footer"));

    Index.render(
        <React.StrictMode>
            <Footer />
        </React.StrictMode>
    );
}
