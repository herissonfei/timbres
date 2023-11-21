import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Catalogue.css";
import axios from "axios";
import Pagination from "../Pagination";

export default function Catalogue() {
    // TEST-------------------------------------
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        // console.log(newPage);
        setCurrentPage(newPage);

        const itemsPerPage = 10;
        const startIndex = (newPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const newData = bidsData.slice(startIndex, endIndex);

        setBids(newData);
    };

    // 最原始不会变动的bids
    const [bidsData, setBidsData] = useState([]);

    const [bids, setBids] = useState([]);
    const [bidsCount, setBidsCount] = useState();
    const totalPages =
        bidsCount % 10 !== 0 ? bidsCount / 10 + 1 : bidsCount / 10;

    // ------------------------------------筛选
    // checkbox CONDITION
    const [selectedCategoriesConditions, setselectedCategoriesConditions] =
        useState([]);

    const handleCategoryChange = (category) => {
        if (selectedCategoriesConditions.includes(category)) {
            setselectedCategoriesConditions(
                selectedCategoriesConditions.filter((cat) => cat !== category)
            );
        } else {
            setselectedCategoriesConditions([
                ...selectedCategoriesConditions,
                category,
            ]);
        }
    };

    // checkbox TYPE
    const [selectedCategoriesTypes, setSelectedCategoriesTypes] = useState([]);

    const handleCheckboxchangeTypes = (category) => {
        if (selectedCategoriesTypes.includes(category)) {
            setSelectedCategoriesTypes(
                selectedCategoriesTypes.filter((cat) => cat !== category)
            );
        } else {
            setSelectedCategoriesTypes([...selectedCategoriesTypes, category]);
        }
    };

    // Prix
    const [minPrix, setMinPrix] = useState(0);
    const [maxPrix, setMaxPrix] = useState(0);

    const handleMinPrixChange = (event) => {
        setMinPrix(parseInt(event.target.value));
    };

    const handleMaxPrixChange = (event) => {
        setMaxPrix(parseInt(event.target.value));
    };

    // ANNÉE D'ÉMISSION
    const [minAnnee, setMinAnnee] = useState(1900);
    const [maxAnnee, setMaxAnnee] = useState(2023);

    const handleMinAnneeChange = (event) => {
        if (
            isNaN(parseInt(event.target.value))
            // ||
            // parseInt(event.target.value) < 1900
        ) {
            setMinAnnee(1900);
        } else {
            setMinAnnee(parseInt(event.target.value));
        }
    };

    const handleMaxAnneeChange = (event) => {
        setMaxAnnee(parseInt(event.target.value));
    };

    useEffect(() => {
        axios.get("/getAllBids").then((res) => {
            setBids(res.data.slice(0, 10));
            setBidsData(res.data);
        });
    }, []);

    // 获取bids的总数量
    useEffect(() => {
        axios.get("/getBidsCount").then((res) => {
            setBidsCount(res.data);
        });
    }, []);

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleParDefault = (event) => {
        event.preventDefault();
        // console.log("par default");
        // 将checkbox改为未选中
        setselectedCategoriesConditions([]);
        setSelectedCategoriesTypes([]);
        axios.get("/getAllBids").then((res) => {
            // console.log(res.data);
            setBids(res.data);
        });
        setSelectedOption("Tous les pays");
    };

    const handleChercher = (event) => {
        event.preventDefault();

        const data = {
            selectedCategoriesConditions,
            selectedCategoriesTypes,
            minAnnee,
            maxAnnee,
            minPrix,
            maxPrix,
            selectedOption,
        };

        axios.post("/enchere/filter", data).then((res) => {
            // console.log("这是后端返回来的数据", res.data);
            // console.log(res.data.length);
            setBids(res.data);
        });
    };

    // ----------------------------------------------筛选结束

    // -----------------------------------Tri 排序

    const handleSortChange = (event) => {
        console.log(event.target.value);
        if (event.target.value == "decroissant") {
            const Bidsdecroissant = [...bids].sort((a, b) => {
                return b.reservePrice - a.reservePrice;
            });
            setBids(Bidsdecroissant);
        } else if (event.target.value == "croissant") {
            // console.log('2');
            const Bidscroissant = [...bids].sort((a, b) => {
                return a.reservePrice - b.reservePrice;
            });
            setBids(Bidscroissant);
        } else if (event.target.value == "tous") {
            setBids(bidsData);
        }
    };

    return (
        <div>
            {/* <!-- HERO --> */}

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
                            <a className="menu__link" href="/catalogue">
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
                        onChange={handleSortChange}
                    >
                        <option disabled>Trier</option>
                        <option value="tous">Tous</option>
                        <option value="decroissant">Prix décroissant &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; </option>
                        <option value="croissant">Prix croissant</option>
                        {/* <option value="popularite">Par popularité</option> */}
                        {/* <option value="nouvellement-liste">
                            Nouvellement listée
                        </option> */}
                        {/* <option value="termine-bientot">
                            Se terminant bientôt
                        </option> */}
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
                        {/* <form onSubmit={handleSubmit} method="GET"> */}
                        <form method="GET">
                            <section>
                                <h3>Condition</h3>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesConditions.includes(
                                            "Parfaite"
                                        )}
                                        onChange={() =>
                                            handleCategoryChange("Parfaite")
                                        }
                                    />
                                    <label>Parfaite</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesConditions.includes(
                                            "Excellente"
                                        )}
                                        onChange={() =>
                                            handleCategoryChange("Excellente")
                                        }
                                    />
                                    <label>Excellente</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesConditions.includes(
                                            "Bonne"
                                        )}
                                        onChange={() =>
                                            handleCategoryChange("Bonne")
                                        }
                                    />
                                    <label>Bonne</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesConditions.includes(
                                            "Moyenne"
                                        )}
                                        onChange={() =>
                                            handleCategoryChange("Moyenne")
                                        }
                                    />
                                    <label>Moyenne</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesConditions.includes(
                                            "Endommagé"
                                        )}
                                        onChange={() =>
                                            handleCategoryChange("Endommagé")
                                        }
                                    />
                                    <label>Endommagé</label>
                                </div>
                            </section>
                            <section>
                                <h3>Pays d'origine</h3>
                                <select
                                    aria-label="select-country"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                >
                                    <option defaultValue value="tous">
                                        Tous les pays
                                    </option>
                                    <option value="Royaume-Uni">
                                        Royaume-Uni
                                    </option>
                                    <option value="États-unis">
                                        États-unis
                                    </option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australie">Australie</option>
                                    <option value="Chine">Chine</option>
                                    <option value="France">France</option>
                                    <option value="Espagne">Espagne</option>
                                </select>
                            </section>
                            <section>
                                <h3>Prix</h3>
                                <div className="wrapper--header">
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            placeholder="00.00"
                                            value={minPrix}
                                            onChange={handleMinPrixChange}
                                        />
                                        <span>$&nbsp;-</span>
                                    </div>
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            aria-label="input-price"
                                            value={maxPrix}
                                            onChange={handleMaxPrixChange}
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
                                        checked={selectedCategoriesTypes.includes(
                                            "Général"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes("Général")
                                        }
                                    />
                                    <label>Général</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Courrier Aérien"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes(
                                                "Courrier Aérien"
                                            )
                                        }
                                    />
                                    <label>Courrier Aérien</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Livret"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes("Livret")
                                        }
                                    />
                                    <label>Livret</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Port dû"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes("Port dû")
                                        }
                                    />
                                    <label>Port dû</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Carte postale"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes(
                                                "Carte postale"
                                            )
                                        }
                                    />
                                    <label>Carte postale</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Semi postal"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes(
                                                "Semi postal"
                                            )
                                        }
                                    />
                                    <label>Semi postal</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategoriesTypes.includes(
                                            "Entier postal"
                                        )}
                                        onChange={() =>
                                            handleCheckboxchangeTypes(
                                                "Entier postal"
                                            )
                                        }
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
                                            aria-label="input-year-min"
                                            value={minAnnee}
                                            onChange={handleMinAnneeChange}
                                            // min={1900}
                                        />
                                        <span>-</span>
                                    </div>
                                    <input
                                        type="number"
                                        aria-label="input-year-max"
                                        value={maxAnnee}
                                        onChange={handleMaxAnneeChange}
                                    />
                                </div>
                            </section>
                            {/* 没法搜索，先注释起来 */}
                            {/* <section>
                                <h3>Dimensions (pouces)</h3>
                                <div className="wrapper--header">
                                    <div className="wrapper--header">
                                        <input
                                            type="number"
                                            placeholder="00.00"
                                            aria-label="input-dimension-height"
                                        />
                                        <span>-</span>
                                    </div>
                                    <input
                                        type="number"
                                        aria-label="input-dimension-width"
                                    />
                                </div>
                            </section> */}
                            <div className="wrapper--header">
                                <div className="wrapperButton">
                                    <button
                                        type="submit"
                                        onClick={handleParDefault}
                                    >
                                        <a className="btn btn--text-icone">
                                            Par défaut
                                            <img
                                                width="15"
                                                src="img/png/icone-round-arrow-orange.png"
                                                alt="icone fleche par defaut"
                                            />
                                        </a>
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleChercher}
                                    >
                                        <a
                                            className="btn btn--text-icone"
                                            // href="#"
                                        >
                                            Chercher
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* <!-- ASIDE MOBILE RECHERCHE AVANCÉE --> */}
                    {/* 底下是手机的先不要管_______________________________________________ */}
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
                            {bids.length} enchères trouvées |{" "}
                            {(currentPage - 1) * 10} -{" "}
                            {currentPage * 10 > bidsCount
                                ? bidsCount
                                : currentPage * 10}{" "}
                            de {bidsCount}
                        </p>
                        <div className="grid grid--5-var">
                            {bids.map((bid) => (
                                <div className="tile bg--tile" key={bid.id}>
                                    <div className="tile__container">
                                        <div>
                                            <p className="tile__lot">
                                                Lot #<strong>{bid.id}</strong>
                                            </p>
                                            <p className="tile__lot tile__lot--red">
                                                {/* 这里之后要补上 */}
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
                                                    src={bid.imageURL}
                                                    alt="Image d'une enchère'"
                                                />
                                            </a>
                                        </div>
                                        <h3>{bid.name}</h3>
                                        <p className="tile__text">
                                            Mise courante |{" "}
                                            <span>
                                                {bid.auctionCount}&nbsp;offre
                                            </span>
                                        </p>
                                        <span>{bid.reservePrice}$</span>
                                        <p className="tile__text-small">
                                            <small>
                                                {/* 回过头看 */}
                                                dernière offre par user2022
                                            </small>
                                        </p>
                                        <a
                                            className="btn tile__btn"
                                            href={`/enchere/${bid.id}`}
                                        >
                                            Miser
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="wrapper--header-page">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        changeClass="false"
                    />
                    <p className="gallery__text gallery__text--right">
                        {bids.length} enchères trouvées |{" "}
                        {(currentPage - 1) * 10} -{" "}
                        {currentPage * 10 > bidsCount
                            ? bidsCount
                            : currentPage * 10}{" "}
                        de {bidsCount}
                    </p>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById("catalogue")) {
    const Index = ReactDOM.createRoot(document.getElementById("catalogue"));

    Index.render(
        <React.StrictMode>
            <Catalogue />
        </React.StrictMode>
    );
}
