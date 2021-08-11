import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import BookItem from "./BookItem";
import UserItem from "./UserItem";
const SearchResultsOverlay = ({ searchValue }) => {
  const [booksData, setBooksData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [option, setOption] = useState("book");
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
    let loadingData = true;
    if (searchValue.length > 0) {
      setLoading(true);
      timer = setTimeout(() => {
        fetch(
          option === "book"
            ? `https://polar-savannah-23530.herokuapp.com/book/search/${searchValue}`
            : `https://polar-savannah-23530.herokuapp.com/user/search/${searchValue}`,
          requestOptions
        )
          .then((res) => res.json())
          .then((resJson) => {
            if (loadingData) {
              setLoading(false);
              if (option === "book") {
                setBooksData(resJson);
              } else {
                setUsersData(resJson);
              }
            }
          });
      }, 1000);
    } else {
      setBooksData([]);
      setLoading(false);
    }

    return () => {
      loadingData = false;
      setBooksData([]);
      clearTimeout(timer);
    };
  }, [searchValue, option]);

  return (
    <div
      className='rounded-bottom bg-white search_overlay'
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <select
        onChange={(e) => setOption(e.target.value)}
        value={option}
        style={{ position: "absolute", top: 0, right: 10 }}
      >
        <option value='user'>User</option>
        <option value='book'>Book</option>
      </select>
      {loading ? (
        <div className='d-flex justify-content-center my-2'>
          <Spinner animation='border' variant='primary' size={15} />
        </div>
      ) : (
        <div
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          }}
        >
          {option === "book" ? (
            booksData.length === 0 ? (
              <div className='d-flex justify-content-center align-items-center py-2'>
                <FaExclamationTriangle />
                <span className='ml-2 font-italic'>Not found this book</span>
              </div>
            ) : (
              <div>
                <div className='text-center py-1 font-italic mb-1'>
                  Search for ({searchValue})
                </div>
                <div className='border-0 pb-1 px-3'>
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
            )
          ) : usersData.length === 0 ? (
            <div className='d-flex justify-content-center align-items-center py-2'>
              <FaExclamationTriangle />
              <span className='ml-2 font-italic'>Not found any user</span>
            </div>
          ) : (
            <div>
              <div className='text-center py-1 font-italic mb-1'>
                Search for ({searchValue})
              </div>
              <div className='border-0 pb-1 px-3'>
                {usersData.map((user, idx) => {
                  return <UserItem key={idx} user={user} />;
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
