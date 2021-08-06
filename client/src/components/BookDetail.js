import { useState, useEffect, useRef, useContext, useCallback } from "react";
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
import { FaExclamationTriangle } from "react-icons/fa";
import UserContext from "../context/userContext";
const BookDetail = () => {
  const { currentUser } = useContext(UserContext);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [bookReviews, setBookReviews] = useState([]);
  const [bookRatings, setBookRatings] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [showDetailRating, setShowDetailRating] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [relatedGenres, setRelatedGenres] = useState([]);
  const reviewInputRef = useRef(null);

  //Rating
  const total = bookRatings.reduce((total, num) => {
    return total + num.count;
  }, 0);
  const sum = bookRatings.reduce((total, num) => {
    return total + num.count * num._id;
  }, 0);
  const average = (sum / total).toFixed(1);
  //

  const handleShowMoreDesc = () => {
    setShowMore((prev) => !prev);
  };

  const handleShowDetailRating = () => {
    setShowDetailRating((prev) => !prev);
  };
  //get Reviews
  const handleRefreshReviewsData = useCallback(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    fetch(`http://localhost:5000/review/bookId/${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((resJson) => setBookReviews(resJson));
  }, [params.id]);
  //

  //get Ratings
  const handleRefreshRatingsData = useCallback(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    fetch(`http://localhost:5000/review/ratings/${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((resJson) => {
        setBookRatings(resJson);
      });
  }, [params.id]);
  //

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    let loadingData = true;
    setLoading(true);
    setShowMore(false);
    fetch(`http://localhost:5000/book/${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("resjson", resJson);
        if (loadingData) {
          setLoading(false);
          setBook(resJson.info[0]);
          setRelatedGenres(resJson.relatedGenres);
          setRelatedBooks(resJson.relatedBooks);
        }
      });

    handleRefreshReviewsData();
    handleRefreshRatingsData();

    return () => {
      loadingData = false;
    };
  }, [params.id, handleRefreshReviewsData, handleRefreshRatingsData]);

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
                      rating={!isNaN(average) ? Number(average) : 0}
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
                          <BookRating
                            ratings={bookRatings}
                            total={total}
                            average={!isNaN(average) ? Number(average) : 0}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 text-left pl-lg-0 fw-bold">
                    {total + " reviews"}
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
                  onClick={() =>
                    reviewInputRef.current !== null
                      ? reviewInputRef.current.scrollIntoView()
                      : null
                  }
                  style={{ cursor: "pointer" }}
                  className="font-italic col-12 p-0 col-lg-4 d-flex justify-content-center align-items-center"
                >
                  <u>Write your review ...</u>
                </div>
              </div>
              <div className="p-0">
                {bookReviews.length === 0 ? (
                  <div className="d-flex align-items-center justify-content-center my-3 font-italic">
                    <FaExclamationTriangle />
                    Not have a review yet
                  </div>
                ) : (
                  <>
                    {bookReviews.map((review, idx) => {
                      return (
                        <Activity
                          key={idx}
                          inPage="book-detail"
                          username={review.userInfo[0].nickname}
                          bookName={book.title}
                          authors={book.authors}
                          rating={review.rating}
                          cover={review.userInfo[0].avatar}
                          review={review.content}
                          date={review.date.slice(0, 10)}
                        />
                      );
                    })}
                  </>
                )}
              </div>

              {currentUser ? (
                bookReviews.find(
                  (e) => e.userInfo[0].nickname === currentUser.nickname
                ) === undefined ? (
                  <div ref={reviewInputRef}>
                    <AddReviewForm
                      refreshRatingsData={handleRefreshRatingsData}
                      refreshReviewsData={handleRefreshReviewsData}
                      bookId={book._id}
                    />
                  </div>
                ) : null
              ) : (
                <div ref={reviewInputRef}>
                  <AddReviewForm
                    refreshRatingsData={handleRefreshRatingsData}
                    refreshReviewsData={handleRefreshReviewsData}
                    bookId={book._id}
                  />
                </div>
              )}
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
