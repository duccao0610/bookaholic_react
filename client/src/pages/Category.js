import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import BookItem from "../components/BookItem";
const Category = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`http://192.168.0.102:5000/categories/${params.category}`)
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        setBooksData(resJson);
      });
  }, [params.category]);
  return (
    <>
      {loading ? (
        <div className="text-center mt-4 vh-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="min-vh-100 px-lg-5 b">
          <h3 className="mb-0 p-0 fs-4 col-7 col-lg-5 my-3 px-1">
            <ol className="breadcrumb bg-light">
              <li className="breadcrumb-item">Category</li>
              <li className="breadcrumb-item text-primary">
                {params.category}
              </li>
            </ol>
          </h3>
          <div className=" d-flex justify-content-start m-auto px-lg-4 py-2 py-lg-2 row">
            {booksData.map((book) => {
              return (
                <BookItem key={book._id} book={book} onlyImage onCategory />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
