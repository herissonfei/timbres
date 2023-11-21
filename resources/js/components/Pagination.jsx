import React, { useState } from "react";
import ReactDOM from "react-dom/client";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    changeClass,
}) {
    const pageNumbers = [];
    // console.log(changeClass);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }

        // console.log(currentPage, totalPages, onPageChange);
    };

    return [
        <div
            className={
                changeClass === "true"
                    ? "menu__nav-page menu__nav-page-wrapper"
                    : "menu__nav-page menu__nav-page--var"
            }
        >
            <div
                className={`${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img
                    width="10"
                    src="img/png/icone-link-arrow-blue-left.png"
                    alt="fleche dropwdown"
                />
            </div>

            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={`pagination-btn ${
                        pageNumber === currentPage ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    <a>
                        <span>{pageNumber}</span>
                    </a>
                </div>
            ))}
            <div
                className={`${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img
                    width="10"
                    src="img/png/icone-link-arrow-blue.png"
                    alt="fleche dropwdown"
                />
            </div>
        </div>,
    ];
}

if (document.getElementById("pagination")) {
    const Index = ReactDOM.createRoot(document.getElementById("pagination"));

    Index.render(
        <React.StrictMode>
            <Pagination />
        </React.StrictMode>
    );
}
