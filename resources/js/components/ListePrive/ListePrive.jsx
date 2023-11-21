import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./ListePrive.css";
import axios from "axios";
import Pagination from "../Pagination";

export default function ListePrive() {
    // 需要有一个不变动对的数据用来对pagination的点击做出响应
    const [bidsPriveData, setBidsPriveData] = useState([]);
    const [bidsPrive, setBidsPrive] = useState([]);
    // console.log(bidsPrive);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);

        const itemsPerPage = 10;
        const startIndex = (newPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const newData = bidsPriveData.slice(startIndex, endIndex);

        setBidsPrive(newData);
    };

    const [bidsCount, setBidsCount] = useState();
    const totalPages =
        bidsCount % 10 !== 0 ? bidsCount / 10 + 1 : bidsCount / 10;

    totalPages;
    useEffect(() => {
        axios.get("/getBidsPrive").then((res) => {
            // console.log(res.data);
            setBidsPrive(res.data.slice(0, 10));
            setBidsPriveData(res.data);
        });
    }, []);

    const deleteBid = (bidPrive) => {
        console.log(bidPrive);
        axios.delete(`/deleteBid/${bidPrive.id}`).then((res) => {
            // console.log(res.data);

            axios.get("/getBidsPrive").then((res) => {
                // console.log(res.data);

                setBidsPrive(res.data);
            });
        });
    };

    // 获取bids的总数量
    useEffect(() => {
        axios.get("/getBidsPriveCount").then((res) => {
            setBidsCount(res.data);
        });
    }, []);
    return (
        <div>
            <div className="hero hero--page-interieure">
                <div className="wrapper">
                    <h1 className="hero__text">Parcourez nos enchères</h1>
                    <h2 className="hero__text--sous-titre">
                        Trouvez la perle rare
                    </h2>
                    <a className="btn" href="#">
                        Fonctionnement
                    </a>
                    <a className="btn" href="#">
                        Certification
                    </a>
                </div>
            </div>
            {/* <!-- menu secondaire BARRE RECHERCHE --> */}
            <div className="menu-secondaire">
                <div className="wrapper wrapper--menu-secondaire">
                    <ul className="menu-secondaire__container">
                        <li className="menu__item menu__item--principal">
                            <a className="menu__link" href="#">
                                En cours
                            </a>
                        </li>
                        <li className="menu__item menu__item--principal">
                            <a className="menu__link" href="#">
                                Archive
                            </a>
                        </li>
                    </ul>
                    <select
                        className="menu-secondaire__select"
                        aria-label="select-sort-order"
                        defaultValue="Trier"
                    >
                        <option disabled>Trier</option>
                        <option value="tous">Tous</option>
                        <option value="decroissant">Prix décroissant</option>
                        <option value="croissant">Prix croissant</option>
                        <option value="popularite">Par popularité</option>
                        <option value="nouvellement-liste">
                            Nouvellement listée
                        </option>
                        <option value="termine-bientot">
                            Se terminant bientôt
                        </option>
                    </select>
                    <div className="wrapper--header menu-secondaire__icone">
                        <div className="btn">
                            <img
                                src="img/png/icone-gallery-1.png"
                                alt="gallerie vertical"
                            />
                        </div>
                        <div className="btn">
                            <img
                                src="img/png/icone-gallery-2.png"
                                alt="gallerie horizontal"
                            />
                        </div>
                    </div>
                </div>
                {/* <button className="burger burger-search btn" aria-label="burger" data-js-search>Recherche Avancée<img width="5"
					src="img/png/icone-link-arrow.png" alt="fleche dropwdown" />
			</button> */}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                changeClass="true"
            />
            {/* <!-- GALLERIE ENCHÈRES --> */}
            <div className="wrapper gallery">
                <div className="wrapper--header">
                    {/* <!-- RECHERCHE AVANCÉE --> */}
                    <div className="search-bar search-bar--desktop">
                        <h2>Recherche Avancée</h2>
                        <form method="GET">
                            <section>
                                <h3>Condition</h3>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="parfaite"
                                        value="parfaite"
                                        name="parfaite"
                                    />
                                    <label>Parfaite</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="excellente"
                                        value="excellente"
                                        name="excellente"
                                    />
                                    <label>Excellente</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="bonne"
                                        value="bonne"
                                    />
                                    <label>Bonne</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="moyenne"
                                        value="moyenne"
                                        name="moyenne"
                                    />
                                    <label>Moyenne</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="endommage"
                                        value="endommage"
                                        name="endommage"
                                    />
                                    <label>Endommagé</label>
                                </div>
                            </section>
                            <section>
                                <h3>Pays d'origine</h3>
                                <select aria-label="select-country">
                                    <option defaultValue value="tous">
                                        Tous les pays
                                    </option>
                                    <option value="royaume-uni">
                                        Royaume-Uni
                                    </option>
                                    <option value="etats-unis">
                                        États-unis
                                    </option>
                                    <option value="canada">Canada</option>
                                    <option value="australie">Australie</option>
                                    <option value="chine">Chine</option>
                                    <option value="france">France</option>
                                    <option value="espagne">Espagne</option>
                                </select>
                            </section>
                            <section>
                                <h3>Prix</h3>
                                <div className="wrapper--header">
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            name="prix"
                                            placeholder="00.00"
                                        />
                                        <span>$&nbsp;-</span>
                                    </div>
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            name="prix"
                                            aria-label="input-price"
                                        />
                                        <span>$</span>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h3>Type</h3>
                                <div>
                                    {/* 这一块的name可能需要删除 */}
                                    <input
                                        type="checkbox"
                                        id="general"
                                        value="general"
                                        name="general"
                                    />
                                    <label>Général</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="aerien"
                                        value="aerien"
                                        name="aerien"
                                    />
                                    <label>Courrier Aérien</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="livret"
                                        value="livret"
                                    />
                                    <label>Livret</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="port-du"
                                        value="port-du"
                                        name="port-du"
                                    />
                                    <label>Port dû</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="carte-postale"
                                        value="carte-postale"
                                    />
                                    <label>Carte postale</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="semi-postal"
                                        value="semi-postal"
                                        name="semi-postal"
                                    />
                                    <label>Semi postal</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="entier-postal"
                                        value="entier-postal"
                                        name="entier-postal"
                                    />
                                    <label>Entier postal</label>
                                </div>
                            </section>
                            <section>
                                <h3>Année d'émission</h3>
                                <div className="wrapper--header">
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            name="annee"
                                            aria-label="input-year-min"
                                        />
                                        <span>-</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="annee"
                                        aria-label="input-year-max"
                                    />
                                </div>
                            </section>
                            <section>
                                <h3>Dimensions (pouces)</h3>
                                <div className="wrapper--header">
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            name="dimension"
                                            placeholder="00.00"
                                            aria-label="input-dimension-height"
                                        />
                                        <span>-</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="dimension"
                                        aria-label="input-dimension-width"
                                    />
                                </div>
                            </section>
                            <div className="wrapper--header">
                                <div className="wrapperButton">
                                    <a className="btn btn--text-icone">
                                        Par défaut
                                        <img
                                            width="15"
                                            src="img/png/icone-round-arrow-orange.png"
                                            alt="icone fleche par defaut"
                                        />
                                    </a>
                                    <a className="btn btn--text-icone" href="#">
                                        Chercher
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* <!-- ASIDE MOBILE RECHERCHE AVANCÉE --> */}
                    <aside
                        className="menu__mobile menu--close menu__mobile--white"
                        aria-label="aside-search-close"
                        data-js-search-bar
                    >
                        {/* <!-- Bouton close --> */}
                        <div
                            className="menu__close--wrapper"
                            data-js-close-search-bar
                        >
                            <button
                                className="menu__close"
                                aria-label="aside-search-close-btn"
                            ></button>
                        </div>

                        <div className="search-bar search-bar--mobile">
                            <form method="GET">
                                <section>
                                    <h3>Condition</h3>
                                    <select aria-label="select-condition">
                                        <option defaultValue value="tous">
                                            Tous
                                        </option>
                                        <option value="parfaite">
                                            Parfaite
                                        </option>
                                        <option value="excellente">
                                            excellente
                                        </option>
                                        <option value="bonne">Bonne</option>
                                        <option value="moyenne">Moyenne</option>
                                        <option value="endommage">
                                            Endommagé
                                        </option>
                                    </select>
                                </section>
                                <section>
                                    <h3>Pays d'origine</h3>
                                    <select aria-label="mobile-select-country">
                                        <option defaultValue value="tous">
                                            Tous les pays
                                        </option>
                                        <option value="royaume-uni">
                                            Royaume-Uni
                                        </option>
                                        <option value="etats-unis">
                                            États-unis
                                        </option>
                                        <option value="canada">Canada</option>
                                        <option value="australie">
                                            Australie
                                        </option>
                                        <option value="chine">Chine</option>
                                        <option value="france">France</option>
                                        <option value="espagne">Espagne</option>
                                    </select>
                                </section>
                                <section>
                                    <h3>Prix</h3>
                                    <div className="wrapper--header">
                                        <div className="wrapper--header">
                                            <input
                                                type="number"
                                                name="prix"
                                                placeholder="00.00"
                                            />
                                            <span>$&nbsp;-</span>
                                        </div>
                                        <div className="wrapper--header">
                                            <input
                                                type="number"
                                                name="prix"
                                                aria-label="mobile-input-price"
                                            />
                                            <span>$</span>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <h3>Type</h3>
                                    <select aria-label="select-type">
                                        <option defaultValue value="tous">
                                            Tous
                                        </option>
                                        <option value="general">Général</option>
                                        <option value="courier">Courier</option>
                                        <option value="livret">Livret</option>
                                        <option value="port-du">Port dû</option>
                                        <option value="carte-postale">
                                            Carte postale
                                        </option>
                                        <option value="semi-postal">
                                            Semi postal
                                        </option>
                                        <option value="entier-postal">
                                            Entier postal
                                        </option>
                                    </select>
                                </section>
                                <section>
                                    <h3>Année d'émission</h3>
                                    <div className="wrapper--header">
                                        <div className="wrapper--header">
                                            <input
                                                type="number"
                                                name="annee"
                                                aria-label="mobile-input-year-min"
                                            />
                                            <span>-</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="annee"
                                            aria-label="mobile-input-year-max"
                                        />
                                    </div>
                                </section>
                                <section>
                                    <h3>Dimensions (pouces)</h3>
                                    <div className="wrapper--header">
                                        <div className="wrapper--header">
                                            <input
                                                type="number"
                                                name="dimension"
                                                placeholder="00.00"
                                                aria-label="mobile-input-dimension-height"
                                            />
                                            <span>-</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="dimension"
                                            aria-label="mobile-input-dimension-width"
                                        />
                                    </div>
                                </section>
                                <div className="wrapper--header-mobile">
                                    <div>
                                        <a className="btn btn--text-icone">
                                            Par défaut
                                            <img
                                                src="img/png/icone-round-arrow-orange.png"
                                                alt="icone fleche par defaut"
                                            />
                                        </a>
                                        <a
                                            className="btn btn--text-icone"
                                            href="#"
                                        >
                                            Chercher
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </aside>

                    {/* <!-- CATALOGUE ENCHÈRES --> */}
                    <div className="wrapper--gallery">
                        <p className="gallery__text">
                            142 enchères trouvées | 0 - 20 de 142
                        </p>
                        <div className="grid grid--5-var">
                            {/* <Bid></Bid> */}

                            {/* <div className="tile bg--tile">
                                <div className="tile__container">
                                    <div>
                                        <p className="tile__lot">
                                            Lot #<strong>23</strong>
                                        </p>
                                        <p className="tile__lot tile__lot--red">
                                            <strong>14d-8h-56m-2s</strong>
                                        </p>
                                    </div>
                                    <img
                                        className="icone-coup-coeur"
                                        src="img/png/icone-coup-de-coeur.png"
                                        alt="icone coup de coeur lord"
                                    />
                                </div>
                                <div className="tile__wrapper">
                                    <div className="tile__img-wrapper">
                                        <a href="enchere.html">
                                            <img
                                                className="tile__img"
                                                src="img/jpg/hero-enchere.jpg"
                                                alt="Image d'une enchère'"
                                            />
                                        </a>
                                    </div>
                                    <h3>CYPRUS 95 LH</h3>
                                    <p className="tile__text">
                                        Mise courante |{" "}
                                        <span>1&nbsp;offre</span>
                                    </p>
                                    <span>10.50$</span>
                                    <p className="tile__text-small">
                                        <small>
                                            dernière offre par user2022
                                        </small>
                                    </p>
                                    <a
                                        className="btn tile__btn"
                                        href="enchere.html"
                                    >
                                        Miser
                                    </a>
                                </div>
                            </div> */}
                            {/* --------------开始循环 */}
                            {/* {bids.map(bid => <li key={bid.id}>{bid.name}</li>)} */}
                            {/* --------------------------------------------------------------------这里要向数据库请求现在登录的这个用户所拥有的邮票 */}
                            {bidsPrive.map((bidPrive) => (
                                <div
                                    className="tile bg--tile"
                                    key={bidPrive.id}
                                >
                                    <div className="tile__container">
                                        <div>
                                            <p className="tile__lot">
                                                Lot #
                                                <strong>{bidPrive.id}</strong>
                                            </p>
                                            <p className="tile__lot tile__lot--red">
                                                <strong>14d-8h-56m-2s</strong>
                                            </p>
                                        </div>
                                        <img
                                            className="icone-coup-coeur"
                                            src="img/png/icone-coup-de-coeur.png"
                                            alt="icone coup de coeur lord"
                                        />
                                    </div>
                                    <div className="tile__wrapper">
                                        <div className="tile__img-wrapper">
                                            <a href="enchere.html">
                                                <img
                                                    className="tile__img"
                                                    src={bidPrive.imageURL}
                                                    alt="Image d'une enchère'"
                                                />
                                            </a>
                                        </div>
                                        <h3>{bidPrive.name}</h3>
                                        <p className="tile__text">
                                            Mise courante |{" "}
                                            <span>
                                                {bidPrive.auctionCount}
                                                &nbsp;offre
                                            </span>
                                        </p>
                                        <span>10.50$</span>
                                        <p className="tile__text-small">
                                            <small>
                                                dernière offre par user2022
                                            </small>
                                        </p>
                                        <a
                                            className="btn tile__btn"
                                            onClick={() => {
                                                deleteBid(bidPrive);
                                            }}
                                            // href={`/deleteBid/${bidPrive.id}`}
                                        >
                                            Supprimer
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="wrapper--header-page">
                    <div className="menu__nav-page menu__nav-page--var">
                        <div>
                            <a>
                                <img
                                    width="10"
                                    src="img/png/icone-link-arrow-blue-left.png"
                                    alt="fleche dropwdown"
                                />
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>1</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>2</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>3</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>4</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>5</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>...</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <span>8</span>
                            </a>
                        </div>
                        <div>
                            <a>
                                <img
                                    width="10"
                                    src="img/png/icone-link-arrow-blue.png"
                                    alt="fleche dropwdown"
                                />
                            </a>
                        </div>
                    </div>
                    <p className="gallery__text gallery__text--right">
                        142 enchères trouvées | 0 - 20 de 142
                    </p>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById("listePrive")) {
    const Index = ReactDOM.createRoot(document.getElementById("listePrive"));

    Index.render(
        <React.StrictMode>
            <ListePrive />
        </React.StrictMode>
    );
}
