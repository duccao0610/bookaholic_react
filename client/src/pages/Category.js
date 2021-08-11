import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import BookItem from "../components/BookItem";
import RelatedGenres from "../components/RelatedGenres";
const Category = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [noMore, setNoMore] = useState(false);
  useEffect(() => {
    let loadingData = true;
    setLoading(true);
    fetch(
      `https://polar-savannah-23530.herokuapp.com/category/${params.category}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (loadingData) {
          setLoading(false);
          setBooksData(resJson.books);
          setGenresData(resJson.otherCategories);
          if (resJson.books.length < 12) {
            setNoMore(true);
          }
        }
      });
    return () => {
      loadingData = false;
    };
  }, [params.category]);

  useEffect(() => {
    setNoMore(false);
  }, [params.category]);

  const handleLoadMoreBooks = () => {
    const skip = booksData.length;
    fetch(
      `https://polar-savannah-23530.herokuapp.com/category/${params.category}/skip/${skip}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setBooksData((prev) => [...prev, ...resJson]);
        if (resJson.length < 12) {
          setNoMore(true);
        }
      });
  };
  return (
    <>
      {loading ? (
        <div className='text-center mt-4 vh-100'>
          <Spinner animation='border' variant='primary' className='mt-3' />
        </div>
      ) : (
        <div className='min-vh-100'>
          <ol
            className='breadcrumb fs-5 fw-bold pt-4 pl-lg-5'
            style={{ background: "#f7f7fa" }}
          >
            <li className='breadcrumb-item'>Category</li>
            <li className='breadcrumb-item' style={{ color: "#5a3434" }}>
              {params.category}
            </li>
          </ol>
          <div className='col-12 row justify-content-around mx-auto'>
            <div className='mt-lg-2 col-12 col-md-8 col-lg-8 d-flex justify-content-start mx-auto mx-md-2 mx-lg-2 px-lg-0 py-2 py-lg-2 row'>
              {booksData.map((book) => {
                return (
                  <BookItem key={book._id} book={book} onlyImage onCategory />
                );
              })}
              {!noMore ? (
                <div
                  onClick={handleLoadMoreBooks}
                  className='text-primary text-center font-italic'
                  style={{ cursor: "pointer" }}
                >
                  Load more...
                </div>
              ) : null}
            </div>
            <div className='ml-5 d-none d-md-inline-block col-md-3 col-lg-3'>
              <RelatedGenres genres={genresData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
