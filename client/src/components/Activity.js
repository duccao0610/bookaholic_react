import { useState } from "react";
import { Image } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const Activity = ({
  username,
  bookName,
  authors,
  rating,
  date,
  review,
  cover,
  inPage,
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
            <BsStarFill className="text-warning " />
            <span className="fw-bold align-middle">{rating}</span>
          </div>
          <div className="d-flex">
            <div className="col-1 p-0">
              <img className="w-100 mt-1" src={cover} />
            </div>
            <div id="activity-content" className="pe-0 col-11">
              <div>{bookName}</div>
              <div className="fst-italic">by {authors.join(", ")}</div>
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
                <div>Review date: {date}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "book-detail":
      return (
        <div className="row mx-0 mb-4 ">
          <div className="col-3 col-lg-1 pr-0">
            <img
              alt=""
              className="mt-1 rounded-circle"
              style={{ width: "40px", height: "40px" }}
              src={cover}
            />
          </div>
          <div className="col-9 col-lg-11 pl-0">
            <div className="border-bottom mx-0 py-1 px-0">
              <span className="fw-bold px-0 d-flex align-items-center">
                {username} <span className="fw-normal mx-1">rated it</span>
                {rating}
                <BsStarFill className="text-warning" />
              </span>
            </div>
            <div id="review_content">
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
            </div>
            <div className="d-flex justify-content-end font-italic">{date}</div>
          </div>
        </div>
      );
  }
};

export default Activity;
