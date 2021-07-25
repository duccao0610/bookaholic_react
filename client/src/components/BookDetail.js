import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import AddReviewForm from "./AddReviewForm";
import BookRating from "./BookRating";
import Switch from "react-switch";
import StarRatings from "react-star-ratings";
import { BiBarChart } from "react-icons/bi";
import Social from "./Social";
import RelatedGenres from "./RelatedGenres";
import RelatedBooks from "./RelatedBooks";
import Activity from "./Activity";

const BookDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [showDetailRating, setShowDetailRating] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [relatedGenres, setRelatedGenres] = useState([]);
  const reviewInputRef = useRef(null);
  const handleShowMoreDesc = () => {
    setShowMore((prev) => !prev);
  };

  const handleShowDetailRating = () => {
    setShowDetailRating((prev) => !prev);
  };

  useEffect(() => {
    // fetch(`http://localhost:5000/books/${params.id}`)
    setLoading(true);
    setShowMore(false);
    fetch(`http://192.168.0.102:5000/books/${params.id}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("resjson", resJson);
        setLoading(false);
        setBook(resJson.info[0]);
        setRelatedGenres(resJson.relatedGenres);
        setRelatedBooks(resJson.relatedBooks);
      });
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <div className="text-center vh-100 ">
          <Spinner animation="border" variant="primary" className="mt-3" />
        </div>
      ) : book === null ? (
        <div>Not Found</div>
      ) : (
        <div className="book_detail_container d-flex flex-column flex-lg-row align-items-center justify-content-lg-center">
          <div className="d-flex flex-column book_detail_info col-9 col-lg-7 mx-auto py-5 min-vh-100">
            <div className=" p-0 d-flex flex-column flex-lg-row pb-2 row">
              <div className="book_detail_cover p-0 mb-1 col-9 col-lg-3 h-100">
                <Image
                  className="rounded border-0 w-100 "
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  alt=""
                  src={book.cover}
                />
              </div>
              <div className="col-12 col-lg-9 pl-0 pl-lg-3">
                <div className="book_detail_title fw-normal fs-2 fw-bold">
                  {book.title}
                </div>
                <div className="book_detail_authors font-italic fw-light fs-5">
                  <span>by </span>
                  {book.authors.map((author, idx) => (
                    <span key={idx}>
                      {author}
                      {idx === book.authors.length - 1 ? "" : ","}
                    </span>
                  ))}
                </div>
                <div className="d-flex align-items-end row  justify-content-around justify-content-lg-start">
                  <div className="mr-2 mb-2 mb-lg-0 col-lg-3">
                    <StarRatings
                      rating={4}
                      starSpacing="3px"
                      numberOfStars={5}
                      starDimension="16px"
                      starRatedColor="yellow"
                    />
                  </div>
                  <div
                    className="mb-0 d-flex align-items-end mr-2 col-12 col-lg-3  p-lg-0"
                    style={{ cursor: "pointer" }}
                  >
                    <BiBarChart size="22" color="green" />
                    <div
                      className="position-relative "
                      onClick={handleShowDetailRating}
                      onMouseOver={handleShowDetailRating}
                      onMouseLeave={handleShowDetailRating}
                    >
                      <span className="text-success ">Rating detail</span>
                      {showDetailRating ? (
                        <div
                          style={{
                            width: "250px",
                            left: "10px",
                            zIndex: "3",
                          }}
                          className="position-absolute text-nowrap"
                        >
                          <BookRating ratings={[10, 6, 5, 4, 3]} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 text-left pl-lg-0 fw-bold">
                    {book.reviews.length + " reviews"}
                  </div>
                </div>
                <div className="my-1 d-flex flex-column flex-lg-row align-items-center pr-2 align-items-lg-center ">
                  <div className="col-12 col-lg-5 p-0">
                    <span className="mr-1 font-italic col-8  pl-0">
                      You own this book ?
                    </span>
                    <div className=" col-3 pl-0">
                      <Switch
                        offColor="#E43712"
                        handleDiameter={20}
                        checked={availability}
                        onChange={() => {
                          setAvailability(!availability);
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-0 col-lg-5 d-inline-block d-lg-none">
                    <Social />
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold">Description</h6>
                  {showMore
                    ? book.description
                    : book.description.substring(0, 300)}
                  {book.description.length > 300 ? (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-info"
                      onClick={handleShowMoreDesc}
                    >
                      {showMore ? " (less)" : " ...more"}
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 d-lg-none">
                  <RelatedBooks books={relatedBooks} />
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="row mb-3 py-1 mx-auto">
                <div className="col-12 col-lg-8 d-flex align-items-center justify-content-center justify-content-lg-start">
                  <h5 className="px-0 py-2 fw-bold">Community reviews</h5>
                </div>
                <div
                  onClick={() => reviewInputRef.current.scrollIntoView()}
                  style={{ cursor: "pointer" }}
                  className="font-italic col-12 p-0 col-lg-4 d-flex justify-content-center align-items-center"
                >
                  <u>Write your review ...</u>
                </div>
              </div>
              <div className="p-0">
                <Activity
                  inPage="book-detail"
                  username="Cao Minh Duc"
                  bookName="Chuoi An Mang A.B.C"
                  authors={["Agatha Christie", "Someone Else"]}
                  rating={2}
                  cover="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435375133l/25802987._SY475_.jpg"
                  review="Khi một sát nhân giết người hàng loạt bí danh ABC chế nhạo Poirot bằng những lá thư úp mở và giết người theo thứ tự chữ cái, Poirot tiến hành một phương pháp điều tra bất thường để truy tìm ABC. Chữ A là bà Ascher ờ Andover, B là Betty Barnard ở Bexhill, C là ngài Carmichael Clarke ở Churston. Qua từng vụ án, kẻ giết người càng tự tin hơn - nhưng để lại một vệt manh mối rõ ràng để chế nhạo Hercule Poirot tài ba có thể lại sai lầm đầu tiên và chí tử."
                  date="12/07/2021"
                />
                <Activity
                  inPage="book-detail"
                  username="Cao Minh Duc"
                  bookName="Chuoi An Mang A.B.C"
                  authors={["Agatha Christie", "Someone Else"]}
                  rating={2}
                  cover="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435375133l/25802987._SY475_.jpg"
                  review="Khi một sát nhân giết người hàng loạt bí danh ABC chế nhạo Poirot bằng những lá thư úp mở và giết người theo thứ tự chữ cái, Poirot tiến hành một phương pháp điều tra bất thường để truy tìm ABC. Chữ A là bà Ascher ờ Andover, B là Betty Barnard ở Bexhill, C là ngài Carmichael Clarke ở Churston. Qua từng vụ án, kẻ giết người càng tự tin hơn - nhưng để lại một vệt manh mối rõ ràng để chế nhạo Hercule Poirot tài ba có thể lại sai lầm đầu tiên và chí tử."
                  date="12/07/2021"
                />
              </div>
              <div ref={reviewInputRef}>
                <AddReviewForm />
              </div>
            </div>
          </div>
          <div className="pt-5 d-none d-lg-block col-lg-3  mr-5 vh-100 align-self-lg-start">
            <Social />
            <RelatedBooks books={relatedBooks} />
            <RelatedGenres genres={relatedGenres} related />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
