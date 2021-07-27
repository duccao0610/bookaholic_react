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
  useEffect(() => {
    setLoading(true);
    fetch(`http://192.168.0.102:5000/category/${params.category}`)
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        console.log("CategoryData", resJson);
        setBooksData(resJson.books);
        setGenresData(resJson.otherCategories);
      });
  }, [params.category]);
  return (
    <>
      {loading ? (
        <div className="text-center mt-4 vh-100">
          <Spinner animation="border" variant="primary" className="mt-3" />
        </div>
      ) : (
        <div className="min-vh-100">
          <ol className="breadcrumb fs-5 fw-bold bg-white pt-4 pl-lg-5">
            <li className="breadcrumb-item">Category</li>
            <li className="breadcrumb-item text-primary">{params.category}</li>
          </ol>
          <div className="col-12 row justify-content-around mx-auto">
            <div className="mt-lg-2 col-12 col-md-8 col-lg-8 d-flex justify-content-start mx-auto mx-md-2 mx-lg-2 px-lg-0 py-2 py-lg-2 row">
              {booksData.map((book) => {
                return (
                  <BookItem key={book._id} book={book} onlyImage onCategory />
                );
              })}
            </div>
            <div className="ml-5 d-none d-md-inline-block col-md-3 col-lg-3">
              <RelatedGenres genres={genresData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
