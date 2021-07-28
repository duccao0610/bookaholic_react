import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import BookItem from "./BookItem";

const SearchResultsOverlay = ({ searchValue }) => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    let timer;
    if (searchValue.length > 0) {
      setLoading(true);
      timer = setTimeout(() => {
        fetch(
          `http://192.168.0.102:5000/book/search/${searchValue}`,
          requestOptions
        )
          .then((res) => res.json())
          .then((resJson) => {
            setLoading(false);
            setBooksData(resJson);
          });
      }, 1000);
    } else {
      setBooksData([]);
      setLoading(false);
    }

    return () => {
      setBooksData([]);
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <div
      className="rounded-bottom bg-white search_overlay"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      {loading ? (
        <div className="d-flex justify-content-center my-2">
          <Spinner animation="border" variant="primary" size={15} />
        </div>
      ) : (
        <div
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          }}
        >
          {booksData.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center py-2">
              <FaExclamationTriangle />
              <span className="ml-2 font-italic">Not found this book</span>
            </div>
          ) : (
            <div>
              <div className="text-center py-1 font-italic mb-1">
                Search for ({searchValue})
              </div>
              <div className="border-0 pb-1 px-3">
                {booksData.map((book, idx) => {
                  return (
                    <BookItem
                      key={idx}
                      book={book}
                      onSearch
                      onlyImage={false}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsOverlay;
