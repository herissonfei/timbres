import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "/resources/css/app.css";
import "./Publish.css";
import axios from "axios";

export default function Publish() {
    const [startingPrice, setStartingPrice] = useState(10);
    const [reservePrice, setreservePrice] = useState(10);
    const [bidTime, setBidTime] = useState("2023-06-10");
    const [auctionCount, setAuctionCount] = useState(0);
    const [bidderId, setBidderId] = useState("");
    const [country, setCountry] = useState("Canada");
    const [startDate, setStartDate] = useState("2023-06-10");
    const [endDate, setEndDate] = useState("2023-06-17");
    const [favorites, setFavorites] = useState("oui");
    const [name, setName] = useState("stampName");
    const [creationDate, setCreationDate] = useState("2003-06-17");
    const [dimensions, setDimensions] = useState("2cm x 3cm");
    const [conditions, setConditions] = useState("Excellente");
    const [status, setStatus] = useState("Available");
    const [certified, setCertified] = useState("Yes");
    const [description, setDescription] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipis minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
    );
    const [type, setType] = useState("Regular");
    const [imageURL, setImageURL] = useState("");
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
            startingPrice,
            reservePrice,
            bidTime,
            auctionCount,
            bidderId,
            startDate,
            endDate,
            favorites,
            name,
            creationDate,
            dimensions,
            conditions,
            status,
            certified,
            description,
            imageURL,
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
        console.log(data.imageURL);
        // 在此处执行表单提交的逻辑
        // console.log("表单已提交");
        axios.post("/uploadFormData", data).then((res) => {
            console.log(res.data);
            // window.history.back();
            window.location.pathname = "/listePrive";
        });
        console.log(data);
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
                            <label className="labelForm" htmlFor="bidderId">
                                当前登录的用户的ID:
                            </label> */}

                                <input
                                    type="hidden"
                                    id="bidderId"
                                    value={bidderId}
                                    onChange={(event) =>
                                        setBidderId(event.target.value)
                                    }
                                />

                                {/* </div> */}

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="startDate"
                                    >
                                        startDate:
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(event) =>
                                            setStartDate(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="endDate"
                                    >
                                        endDate:
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
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
                                        htmlFor="creationDate"
                                    >
                                        creationDate:
                                    </label>
                                    <input
                                        type="date"
                                        id="creationDate"
                                        value={creationDate}
                                        onChange={(event) =>
                                            setCreationDate(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="bidTime"
                                    >
                                        bidTime:
                                    </label>
                                    <input
                                        type="date"
                                        id="bidTime"
                                        value={bidTime}
                                        onChange={(event) =>
                                            setBidTime(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="startingPrice"
                                    >
                                        startingPrice:
                                    </label>
                                    <input
                                        type="number"
                                        id="startingPrice"
                                        value={startingPrice}
                                        onChange={(event) =>
                                            setStartingPrice(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        className="labelForm"
                                        htmlFor="reservePrice"
                                    >
                                        reservePrice:
                                    </label>
                                    <input
                                        type="number"
                                        id="reservePrice"
                                        value={reservePrice}
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
                                        htmlFor="auctionCount"
                                    >
                                        auctionCount:
                                    </label>
                                    <input
                                        type="number"
                                        id="auctionCount"
                                        value={auctionCount}
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
                                    <label className="labelForm" htmlFor="type">
                                        Type:
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={type}
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

                        <button className="blue">
                            télécharger
                        </button>
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
