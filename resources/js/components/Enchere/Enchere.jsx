import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Enchere.css";
import axios from "axios";

export default function Enchere() {
    const id = window.location.pathname.split("/").pop();

    const [bid, setBid] = useState([]);

    const [user, setUser] = useState(null);
    const [reservePrice, setreservePrice] = useState("");
    const bidsHistorique = [];
    // console.log(bid);
    // console.log(parseFloat(reservePrice));

    useEffect(() => {
        axios.get(`/getOneBid/${id}`).then((res) => {
            setBid(res.data[0]);
            setreservePrice(parseFloat(res.data[0].reservePrice));
        });
    }, []);

    // 创建一个新的Date对象，该对象会表示当前的日期和时间
    const now = new Date();

    // 获取年、月、日、时、分、秒
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份是从0开始的，所以要加1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 使用模板字符串和padStart()方法来格式化日期和时间
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
    ).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // console.log(formattedDate);

    // console.log(new Date(formattedDate).getTime());
    // console.log(new Date(bid.endDate).getTime());

    const fermeDans =
        new Date(bid.endDate).getTime() > new Date(formattedDate).getTime()
            ? dateDifference(bid.endDate, formattedDate)
            : "Fermé";
    // console.log(fermeDans);
    function dateDifference(date1, date2) {
        // 将两个日期转换为毫秒值
        const timestamp1 = new Date(date1).getTime();
        const timestamp2 = new Date(date2).getTime();

        // 计算差值（毫秒）
        let difference = Math.abs(timestamp2 - timestamp1);

        // 计算天数、小时、分钟和秒数
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        difference -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * 1000 * 60;

        const seconds = Math.floor(difference / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function handleMiser(e) {
        e.preventDefault();
        axios.get(`/checkUser`).then((res) => {
            if (res.data) {
                // console.log(res.data);
                // console.log(reservePrice);
                setUser(res.data);
                axios
                    .patch(`/enchere/miser/${bid.id}`, {
                        reservePrice: reservePrice,
                    })
                    .then((response) => {
                        // console.log(response);
                        // console.log(response.config.data);

                        console.log(response.data);
                        // axios.get
                        axios.get(`/getOneBid/${id}`).then((res) => {
                            setBid(res.data[0]);
                            setreservePrice(parseFloat(res.data[0].reservePrice));
                        });
                    });
            } else {
                window.location.pathname = "/login";
            }
        });
    }

    function handleMin(e) {
        e.preventDefault();
        axios.get(`/checkUser`).then((res) => {
            if (res.data) {
                console.log(res.data);
                setUser(res.data);
            } else {
                window.location.pathname = "/login";
            }
        });
    }
    return (
        <div>
            {/* <!-- HERO --> */}
            <div className="hero hero--enchere">
                <div className="wrapper">
                    <h2>
                        Lot #{bid.id} | <span>{bid.status}</span>
                        <img
                            className="icone-coup-coeur"
                            src="/img/png/icone-coup-de-coeur.png"
                            alt="icone coup de coeur lord"
                        />
                    </h2>
                    <h1>{bid.name}</h1>
                </div>
            </div>
            {/* <!-- DETAIL ENCHERE --> */}
            <section className="bg--grey-var">
                <div className="wrapper">
                    <div className="link wrapper--header ">
                        <img
                            className="icone-link-arrow"
                            src="/img/png/icone-link-arrow-blue-left.png"
                            alt="icone fleche link"
                        />
                        <a className="link--border-blue" href="/catalogue">
                            Retour au catalogue
                        </a>
                    </div>
                    <div className="pannels">
                        {/* <!-- Galerie image de l'enchère --> */}
                        <div className="gallery__container">
                            <div className="tile__img-wrapper tile__img-wrapper--enchere">
                                <img
                                    className="tile__img"
                                    src={bid.imageURL}
                                    alt="Image d'une enchère'"
                                />
                            </div>
                            {/* <div className="gallery__nav">
                                <div>
                                    <a>
                                        <img
                                            width="25"
                                            src="/img/png/icone-link-arrow-blue-up.png"
                                            alt="flèche navigation galerie"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a>
                                        <img
                                            width="100"
                                            src="/img/jpg/encheres/thumbnail-enchere-3.jpg"
                                            alt="image de l'enchère"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a>
                                        <img
                                            width="100"
                                            src="/img/jpg/encheres/thumbnail-enchere-1.jpg"
                                            alt="image de l'enchère"
                                        />
                                    </a>
                                </div>
                                <div>
                                    <a>
                                        <img
                                            width="100"
                                            src="/img/jpg/encheres/thumbnail-enchere-2.jpg"
                                            alt="image de l'enchère"
                                        />
                   
                   
                                    </a>
                                </div>
                                <div>
                                    <a>
                                        <img
                                            width="25"
                                            src="/img/png/icone-dropdown-arrow-blue.png"
                                            alt="flèche navigation galerie"
                                        />
                                    </a>
                                </div>
                            </div> */}
                        </div>
                        <div className="pannels--container">
                            <div className="pannel__detail wrapper--header">
                                {/* <!-- Navigation panneau --> */}
                                <div className="pannel__nav">
                                    <div>
                                        <img
                                            width="25"
                                            src="/img/png/icone-eye.png"
                                            alt="icone détail"
                                        />
                                        <p>Détails</p>
                                    </div>
                                    <div>
                                        <img
                                            width="25"
                                            src="/img/png/icone-round-arrow.png"
                                            alt="icone historique"
                                        />
                                        <p>Historique</p>
                                    </div>
                                    <div>
                                        <img
                                            width="25"
                                            src="/img/png/icone-profil.png"
                                            alt="icone vendeur"
                                        />
                                        <p>Vendeur</p>
                                    </div>
                                </div>
                                {/* <!-- Description panneau --> */}
                                <div className="pannel__text" data-js-pannel>
                                    <p className="tile__text">
                                        Mise courante |{" "}
                                        <strong>
                                            {bid.auctionCount} offre
                                        </strong>
                                    </p>
                                    <h2>{bid.reservePrice}$</h2>
                                    <p className="tile__text-small">
                                        <small>
                                            {/* 之后再补 */}
                                            {/* dernière offre par user2022 */}
                                        </small>
                                    </p>
                                    <p>
                                        <strong>Description</strong> :{" "}
                                        {bid.description}
                                    </p>
                                    <p>
                                        <strong>Type</strong> : {bid.type}
                                    </p>
                                    <p>
                                        <strong>Condition</strong> :{" "}
                                        {bid.conditions}
                                    </p>
                                    <p>
                                        <strong>Format</strong> :{" "}
                                        {bid.dimensions}
                                    </p>
                                    <p>
                                        <strong>Année d'émission</strong> :{" "}
                                        {bid.creationDate}
                                    </p>
                                    <p>
                                        <strong>Pays d'origine</strong> :{" "}
                                        {bid.country}
                                    </p>
                                </div>
                                <div
                                    className="pannel__text pannel__hidden"
                                    data-js-pannel
                                >
                                    <p>Historique</p>
                                </div>
                                <div
                                    className="pannel__text pannel__hidden"
                                    data-js-pannel
                                >
                                    <p>Vendeur</p>
                                </div>
                            </div>
                            {/* <!-- Form miser enchère panneau --> */}
                            <div className="pannel__form grid">
                                <div>
                                    <p>Ferme dans</p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>
                                            {/* {new Date(bid.endDate)} */}
                                            {fermeDans == "Fermé"
                                                ? "Fermé"
                                                : `${fermeDans.days}d-${fermeDans.hours}
                                            h-${fermeDans.minutes}m-
                                            ${fermeDans.seconds}s`}
                                        </strong>
                                    </p>
                                    <small>
                                        Début: {bid.startDate} | 00H00
                                    </small>
                                    <br />

                                    <small>Fin: {bid.endDate} | 00H00</small>
                                </div>
                                <div className="grid grid--3-btn">
                                    <input
                                        type="number"
                                        value={reservePrice}
                                        onChange={(event) => {
                                            setreservePrice(event.target.value);
                                        }}
                                        // placeholder="min 10.70"
                                    />
                                    <a className="btn" onClick={handleMiser}>
                                        Miser
                                    </a>
                                    <a className="btn" onClick={handleMin}>
                                        Min
                                    </a>
                                </div>
                                <ul>
                                    <li>Pays d'envoi : Royaume-Uni</li>
                                    <li>Livraison internationale gratuite</li>
                                    <li>Certification garantie</li>
                                </ul>
                                <img
                                    width="150"
                                    src="/img/png/icone-payment.png"
                                    alt="icone options paiement"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ENCHÈRES SIMILAIRES --> */}
            <div className="wrapper">
                <section>
                    <div className="link wrapper--header ">
                        <h2>Dans la même catégorie</h2>
                        <a className="link--border-blue" href="#">
                            Tout&nbsp;afficher
                        </a>
                        <img
                            className="icone-link-arrow"
                            src="/img/png/icone-link-arrow-blue.png"
                            alt="icone fleche link"
                        />
                    </div>
                    <div className="grid grid--5-second-var">
                        <div className="tile bg--tile">
                            <div className="tile__container">
                                <div>
                                    <p className="tile__lot">
                                        Lot #<strong>01</strong>
                                    </p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>14d-8h-56m-2s</strong>
                                    </p>
                                </div>
                                <img
                                    className="icone-coup-coeur"
                                    src="/img/png/icone-coup-de-coeur.png"
                                    alt="icone coup de coeur lord"
                                />
                            </div>
                            <div className="tile__wrapper">
                                <div className="tile__img-wrapper">
                                    <img
                                        className="tile__img"
                                        src="/img/jpg/encheres/timbre-1.jpg"
                                        alt="Image d'une enchère'"
                                    />
                                </div>
                                <h3>Gold Coast 115-27-LH</h3>
                                <p className="tile__text">
                                    Mise courante | <span>1 offre</span>
                                </p>
                                <span>350.00$</span>
                                <p className="tile__text-small">
                                    <small>dernière offre par user2022</small>
                                </p>
                                <a
                                    className="btn tile__btn"
                                    href="enchere.html"
                                >
                                    Miser
                                </a>
                            </div>
                        </div>
                        <div className="tile bg--tile">
                            <div className="tile__container">
                                <div>
                                    <p className="tile__lot">
                                        Lot #<strong>102</strong>
                                    </p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>1d-7h-06m-28s</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="tile__wrapper">
                                <div className="tile__img-wrapper">
                                    <img
                                        className="tile__img"
                                        src="/img/jpg/encheres/timbre-2.jpg"
                                        alt="Image d'une enchère'"
                                    />
                                </div>
                                <h3>US California Scott #1</h3>
                                <p className="tile__text">
                                    Mise courante | <span>5 offres</span>
                                </p>
                                <span>259.00$</span>
                                <p className="tile__text-small">
                                    <small>dernière offre par user2022</small>
                                </p>
                                <a
                                    className="btn tile__btn"
                                    href="enchere.html"
                                >
                                    Miser
                                </a>
                            </div>
                        </div>
                        <div className="tile bg--tile">
                            <div className="tile__container">
                                <div>
                                    <p className="tile__lot">
                                        Lot #<strong>45</strong>
                                    </p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>9d-1h-40m-24s</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="tile__wrapper">
                                <div className="tile__img-wrapper">
                                    <img
                                        className="tile__img"
                                        src="/img/jpg/encheres/timbre-3.jpg"
                                        alt="Image d'une enchère"
                                    />
                                </div>
                                <h3>USA 1857 Scott #36 Used. Deep color</h3>
                                <p className="tile__text">
                                    Mise courante | <span>10 offres</span>
                                </p>
                                <span>79.00$</span>
                                <p className="tile__text-small">
                                    <small>dernière offre par user2022</small>
                                </p>
                                <a
                                    className="btn tile__btn"
                                    href="enchere.html"
                                >
                                    Miser
                                </a>
                            </div>
                        </div>
                        <div className="tile bg--tile">
                            <div className="tile__container">
                                <div>
                                    <p className="tile__lot">
                                        Lot #<strong>121</strong>
                                    </p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>10h-50m-05s</strong>
                                    </p>
                                </div>
                                <img
                                    className="icone-coup-coeur"
                                    src="/img/png/icone-coup-de-coeur.png"
                                    alt="icone coup de coeur lord"
                                />
                            </div>
                            <div className="tile__wrapper">
                                <div className="tile__img-wrapper">
                                    <img
                                        className="tile__img"
                                        src="/img/jpg/encheres/timbre-4.jpg"
                                        alt="Image d'une enchère"
                                    />
                                </div>
                                <h3>AFFORDABLE GENUINE SCOTT USED SET</h3>
                                <p className="tile__text">
                                    Mise courante | <span>2 offres</span>
                                </p>
                                <span>150.00$</span>
                                <p className="tile__text-small">
                                    <small>dernière offre par user2022</small>
                                </p>
                                <a
                                    className="btn tile__btn"
                                    href="enchere.html"
                                >
                                    Miser
                                </a>
                            </div>
                        </div>
                        <div className="tile bg--tile">
                            <div className="tile__container">
                                <div>
                                    <p className="tile__lot">
                                        Lot #<strong>67</strong>
                                    </p>
                                    <p className="tile__lot tile__lot--red">
                                        <strong>21d-11h-12m-11s</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="tile__wrapper">
                                <div className="tile__img-wrapper">
                                    <img
                                        className="tile__img"
                                        src="/img/jpg/encheres/timbre-5.jpg"
                                        alt="Image d'une enchère"
                                    />
                                </div>
                                <h3>
                                    Used 50¢ XF Well Centered GEM With PFC
                                    Graded
                                </h3>
                                <p className="tile__text">
                                    Mise courante | <span>Aucune offre</span>
                                </p>
                                <span>10.00$</span>
                                <p className="tile__text-small">
                                    <small>dernière offre par user2022</small>
                                </p>
                                <a
                                    className="btn tile__btn"
                                    href="enchere.html"
                                >
                                    Miser
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

if (document.getElementById("enchere")) {
    const Index = ReactDOM.createRoot(document.getElementById("enchere"));

    Index.render(
        <React.StrictMode>
            <Enchere />
        </React.StrictMode>
    );
}
