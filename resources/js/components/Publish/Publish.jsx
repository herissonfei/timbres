import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Publish.css";
import axios from "axios";

export default function Publish() {
    const [startingprice, setStartingPrice] = useState(10);
    const [reserveprice, setreservePrice] = useState(10);
    const [bidtime, setBidTime] = useState("2023-06-10");
    const [auctioncount, setAuctionCount] = useState(0);
    const [bidderid, setBidderId] = useState("");
    const [country, setCountry] = useState("Canada");
    const [startdate, setStartDate] = useState("2023-06-10");
    const [enddate, setEndDate] = useState("2023-06-17");
    const [favorites, setFavorites] = useState("oui");
    const [name, setName] = useState("stampName");
    const [creationdate, setCreationDate] = useState("2003-06-17");
    const [dimensions, setDimensions] = useState("2cm x 3cm");
    const [conditions, setConditions] = useState("Excellente");
    const [status, setStatus] = useState("Available");
    const [certified, setCertified] = useState("Yes");
    const [description, setDescription] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
    );
    const [type, setType] = useState("Général");
    const [imageurl, setImageURL] = useState("");
    useEffect(() => {
        axios.get("/getUser").then((res) => {
            // console.log(res.data);
            // 当前登录的用户的所有信息
            setBidderId(res.data.id);
        });
    }, []);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // \img\jpg\encheres\timbre-5.jpg
        setImageURL(`\\img\\jpg\\encheres\\${event.target.files[0].name}`);
    };

    // console.log(selectedFile);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            country,
            startingprice,
            reserveprice,
            bidtime,
            auctioncount,
            bidderid,
            startdate,
            enddate,
            favorites,
            name,
            creationdate,
            dimensions,
            conditions,
            status,
            certified,
            description,
            imageurl,
            type,
        };
        // console.log(selectedFile);
        // console.log(selectedFile.name);
        console.log(data);
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);
            try {
                // 发送 POST 请求到 Laravel 后端
                const response = await axios.post("/uploadImage", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // 处理响应数据...
                console.log("上传成功！", response.data);
            } catch (error) {
                // 处理错误...
                console.error("上传失败！", error);
            }
        }
        console.log(data.imageurl);
        // 在此处执行表单提交的逻辑
        // console.log("表单已提交");
        // ----------------------------------------------------------------
        // axios.post("/uploadFormData", data).then((res) => {
        //     console.log(res.data);
        //     // window.history.back();
        //     window.location.pathname = "/listePrive";
        // });
        axios
            .post("/uploadFormData", data)
            .then((res) => {
                console.log("post之内的", res.data);
                console.log("这是post之内的", window.location.pathname);

                window.location.pathname = "/listePrive";
            })
            .catch((error) => {
                console.error(
                    "An error occurred during the POST request:",
                    error
                );
            });
        console.log("这是post之外的", window.location.pathname);
        // console.log(data);
    };
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    // };

    return (
        <div className="container">
            {/* <h1 className="black">邮票竞拍表单</h1> */}
            <div>
                <div className="returnLogo">
                    <a href="/home">
                        <img
                            width="200"
                            className="returnImg"
                            src="/img/png/logo.png"
                            alt="logo Stampee"
                        />
                    </a>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="formContainer">
                        <div className="box-container">
                            <div className="formContainer--div">
                                {/* <div className="form-group">
                            <label className="labelForm" htmlFor="bidderid">
                                当前登录的用户的ID:
                            </label> */}

                                <input
                                    type="hidden"
                                    id="bidderid"
                                    value={bidderid}
                                    onChange={(event) =>
                                        setBidderId(event.target.value)
                                    }
                                />

                                {/* </div> */}

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="startdate"
                                    >
                                        startdate:
                                    </label>
                                    <input
                                        type="date"
                                        id="startdate"
                                        value={startdate}
                                        onChange={(event) =>
                                            setStartDate(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="enddate"
                                    >
                                        enddate:
                                    </label>
                                    <input
                                        type="date"
                                        id="enddate"
                                        value={enddate}
                                        onChange={(event) =>
                                            setEndDate(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="favorites"
                                    >
                                        favorites:
                                    </label>
                                    <input
                                        type="text"
                                        id="favorites"
                                        value={favorites}
                                        onChange={(event) =>
                                            setFavorites(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="labelForm" htmlFor="name">
                                        name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="creationdate"
                                    >
                                        creationdate:
                                    </label>
                                    <input
                                        type="date"
                                        id="creationdate"
                                        value={creationdate}
                                        onChange={(event) =>
                                            setCreationDate(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="bidtime"
                                    >
                                        bidtime:
                                    </label>
                                    <input
                                        type="date"
                                        id="bidtime"
                                        value={bidtime}
                                        onChange={(event) =>
                                            setBidTime(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="startingprice"
                                    >
                                        startingprice:
                                    </label>
                                    <input
                                        type="number"
                                        id="startingprice"
                                        value={startingprice}
                                        onChange={(event) =>
                                            setStartingPrice(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="reserveprice"
                                    >
                                        reserveprice:
                                    </label>
                                    <input
                                        type="number"
                                        id="reserveprice"
                                        value={reserveprice}
                                        onChange={(event) =>
                                            setreservePrice(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {/* ---- */}
                            </div>
                            <div className="formContainer--div">
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="dimensions"
                                    >
                                        dimensions:
                                    </label>
                                    <input
                                        type="text"
                                        id="dimensions"
                                        value={dimensions}
                                        onChange={(event) =>
                                            setDimensions(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="conditions"
                                    >
                                        conditions:
                                    </label>
                                    <input
                                        type="text"
                                        id="conditions"
                                        value={conditions}
                                        onChange={(event) =>
                                            setConditions(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="status"
                                    >
                                        status:
                                    </label>
                                    <input
                                        type="text"
                                        id="status"
                                        value={status}
                                        onChange={(event) =>
                                            setStatus(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="certified"
                                    >
                                        certified:
                                    </label>
                                    <input
                                        type="text"
                                        id="certified"
                                        value={certified}
                                        onChange={(event) =>
                                            setCertified(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="labelForm" htmlFor="type">
                                        type:
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={type}
                                        onChange={(event) =>
                                            setType(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="auctioncount"
                                    >
                                        auctioncount:
                                    </label>
                                    <input
                                        type="number"
                                        id="auctioncount"
                                        value={auctioncount}
                                        onChange={(event) =>
                                            setAuctionCount(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="country"
                                    >
                                        pays:
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={country}
                                        onChange={(event) =>
                                            setCountry(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="description"
                                    >
                                        description:
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="blue">Publier</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

if (document.getElementById("publish")) {
    const Index = ReactDOM.createRoot(document.getElementById("publish"));

    Index.render(
        <React.StrictMode>
            <Publish />
        </React.StrictMode>
    );
}
