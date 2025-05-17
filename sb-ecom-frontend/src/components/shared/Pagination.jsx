import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ numberOfPage, totalProducts }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= numberOfPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onChangeHandler(null, currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPage) {
      onChangeHandler(null, currentPage + 1);
    }
  };

  return (
    <div>
      <nav
        aria-label="Page navigation"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
          <li className={currentPage === 1 ? "page-item disabled" : "page-item"} style={{ margin: "0 5px" }}>
            <button
              className="page-link"
              onClick={handlePrevious}
              aria-label="Previous"
              style={{
                padding: "8px 16px",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "4px",
                color: currentPage === 1 ? "#6c757d" : "#333",
                backgroundColor: currentPage === 1 ? "#e9ecef" : "white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={currentPage === page ? "page-item active" : "page-item"}
              style={{ margin: "0 5px" }}
            >
              <button
                className="page-link"
                onClick={(event) => onChangeHandler(event, page)}
                style={{
                  padding: "8px 16px",
                  textDecoration: "none",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: currentPage === page ? "white" : "#333",
                  backgroundColor: currentPage === page ? "#007bff" : "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={currentPage === numberOfPage ? "page-item disabled" : "page-item"}
            style={{ margin: "0 5px" }}
          >
            <button
              className="page-link"
              onClick={handleNext}
              aria-label="Next"
              style={{
                padding: "8px 16px",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: "4px",
                color: currentPage === numberOfPage ? "#6c757d" : "#333",
                backgroundColor: currentPage === numberOfPage ? "#e9ecef" : "white",
                cursor: currentPage === numberOfPage ? "not-allowed" : "pointer",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
      {totalProducts !== undefined && (
        <p style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
          Showing page {currentPage} of {numberOfPage} (Total products: {totalProducts})
        </p>
      )}
    </div>
  );
};

export default Pagination;