import { useState } from "react";
import { Image } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import Alert from "./Alert";
const Activity = ({
  username,
  bookName,
  authors,
  rating,
  date,
  review,
  cover,
  inPage,
  bookId,
  userRate,
  userLink,
  isMyReview,
  reviewId,
  refreshReviewsData,
  refreshRatingsData,
  setNoMore,
}) => {
  const [reviewContent, setReviewContent] = useState(review);
  const [editReviewBtn, setEditReviewBtn] = useState("Edit");
  const [showMore, setShowMore] = useState(false);

  const handleEditReview = () => {
    if (editReviewBtn === "Edit") {
      // Press 'Edit'
      setEditReviewBtn("Save");
    } else {
      // Press 'Save'
      setEditReviewBtn("Edit");
    }
  };
  const [reviewRating, setReviewRating] = useState(rating);
  const [editActivity, setEditActivity] = useState(false);
  const handleEditActivity = () => {
    setEditActivity(true);
  };
  const handleSaveActivity = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        content: reviewContent,
        reviewId: reviewId,
        rating: reviewRating,
      }),
    };
    fetch(
      `http://localhost:5000/review/${reviewId}/editReview`,
      requestOptions
    ).catch((err) => console.log(err));
    refreshReviewsData();
    refreshRatingsData();
    setNoMore();
    setEditActivity(false);
  };
  // delete review & alert
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [alertDetail, setAlertDetail] = useState();

  const showAlert = (type, status, detail) => {
    setAlertVisibility(true);
    setAlertType(type);
    setAlertStatus(status);
    setAlertDetail(detail);
  };

  const alertClose = (status) => {
    if (status === "confirm") {
      console.log("to delete");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          reviewId: reviewId,
        }),
      };

      fetch(
        `http://localhost:5000/review/${reviewId}/deleteReview`,
        requestOptions
      ).catch((err) => console.log(err));
    }
    refreshReviewsData();
    refreshRatingsData();
    setNoMore();
    setAlertVisibility(false);
  };

  const handleDeleteActivity = () => {
    showAlert("review", "confirm");
  };
  //

  switch (inPage) {
    // Default = home
    default:
      return (
        <div className="border border-dark rounded-3 p-3 mx-auto mb-3 w-100 col-md-10 col-lg-8">
          {/* post's header */}
          <div className="d-flex w-100">
            <Image
              src="https://cdn.tgdd.vn//GameApp/1331168//20-500x500.jpg"
              width={35}
              height={35}
              roundedCircle
              className="mt-2"
            />
            <div className="ml-2">
              <div>
                <span className="fw-bold">{username}</span> <span>rated</span>{" "}
                <span className="fw-bold">{bookName}</span>{" "}
                <span>{rating}⭐</span>
              </div>
              <div className="fst-italic" style={{ fontSize: "13px" }}>
                {date}
              </div>
            </div>
          </div>
          <div className="my-2">{review}</div>
          <div className="d-flex justify-content-center">
            <Image
              src={cover}
              height={250}
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
              className="pointer"
            />
          </div>
          <div className="modal fade" id="imageModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <Image src={cover} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "profile":
      return (
        <div className="ms-2">
          <div id="activity-header" className="">
            <span className="fw-bold align-middle">{username}</span>{" "}
            <span className="align-middle">rated this book</span>{" "}
            <span className="fw-bold align-middle">{rating}</span>
            <BsStarFill className="text-warning " />
          </div>
          <div className="d-flex">
            <div className="col-1 p-0">
              <img className="w-100 mt-1" src={cover} alt="" />
            </div>
            <div id="activity-content" className="pe-0 col-11">
              <Link to={`/book/${bookId}`} style={{ color: "#5a3434" }}>
                <div className="fw-bold">{bookName}</div>
              </Link>
              <div className="fst-italic fw-light">by {authors.join(", ")}</div>
              {editReviewBtn === "Save" ? (
                <div className="form">
                  <textarea
                    className="w-100 form-control"
                    style={{ minHeight: "300px" }}
                    value={reviewContent}
                    onChange={(e) => {
                      setReviewContent(e.target.value);
                    }}
                  ></textarea>
                </div>
              ) : (
                <div>{reviewContent}</div>
              )}

              <div className="d-flex justify-content-between">
                <div
                  className={
                    editReviewBtn === "Edit"
                      ? "btn btn-sm btn-secondary"
                      : "btn btn-sm btn-primary"
                  }
                  onClick={handleEditReview}
                >
                  {editReviewBtn}
                </div>
                <div className="font-italic" style={{ fontSize: "12px" }}>
                  Review date: {date}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "book-detail":
      return (
        <div className="row mx-0 mb-4 position-relative ">
          <Alert
            alertClose={alertClose}
            alertVisibility={alertVisibility}
            alertType={alertType}
            alertStatus={alertStatus}
            alertDetail={alertDetail}
          />
          {isMyReview ? (
            <div
              className="position-absolute d-flex align-items-center gap-1"
              style={{ top: 5, right: 0, width: "fit-content", zIndex: 100 }}
            >
              <div onClick={handleEditActivity}>
                <AiFillEdit />
              </div>
              <div>
                <AiFillDelete onClick={handleDeleteActivity} />
              </div>
            </div>
          ) : null}
          <div className="col-3 col-lg-1 pr-0">
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 200, hide: 250 }}
              overlay={
                <Tooltip id="tooltip-top" className="font-italic">
                  <div className="d-flex gap-1">
                    <div className="d-flex align-items-center gap-1">
                      <FaArrowCircleUp color="green" />
                      {userRate.upvote}
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaArrowCircleDown color="red" />
                      {userRate.downvote}
                    </div>
                  </div>
                </Tooltip>
              }
            >
              <img
                alt=""
                className="mt-1 rounded-circle"
                style={{ width: "40px", height: "40px" }}
                src={cover}
              />
            </OverlayTrigger>
          </div>
          <div className="col-9 col-lg-11 pl-0">
            <div className="border-bottom mx-0 py-1 px-0">
              <span className="fw-bold px-0 d-flex align-items-center">
                <Link to={`/user/${userLink}`} style={{ color: "#5a3434" }}>
                  {username}
                </Link>{" "}
                <span className="fw-normal mx-1">rated it</span>
                {rating}
                <BsStarFill className="text-warning" />
              </span>
            </div>
            <div id="review_content">
              {editActivity === true ? (
                <>
                  <textarea
                    className="w-100"
                    value={reviewContent}
                    onChange={(e) => {
                      setReviewContent(e.target.value);
                    }}
                  />
                  <div className="mb-1">
                    <StarRatings
                      rating={reviewRating}
                      starRatedColor="yellow"
                      starHoverColor="yellow"
                      changeRating={(newRating) => setReviewRating(newRating)}
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                    />
                  </div>
                  <div
                    className="btn text-white"
                    style={{ background: "#5a3434" }}
                    onClick={handleSaveActivity}
                  >
                    Save
                  </div>
                  <div
                    className="btn btn-secondary ml-2"
                    onClick={() => setEditActivity(false)}
                  >
                    Cancel
                  </div>
                </>
              ) : (
                <>
                  {showMore ? review : review.substring(0, 200)}
                  {review.length > 300 ? (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-info"
                      onClick={() => setShowMore((prev) => !prev)}
                    >
                      {showMore ? " (less)" : " ...more"}
                    </span>
                  ) : null}
                </>
              )}
            </div>
            <div
              className="d-flex justify-content-end font-italic"
              style={{ fontSize: "12px" }}
            >
              {date}
            </div>
          </div>
        </div>
      );
  }
};

export default Activity;
