import { Form, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";
import Alert from "./Alert";
const AddReviewForm = ({
  bookId,
  refreshReviewsData,
  refreshRatingsData,
  refreshReviewed,
  setNoMore,
}) => {
  const { currentUser } = useContext(UserContext);
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
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
    setAlertVisibility(false);
  };
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const handleAddReview = async () => {
    if (currentUser !== null) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: currentUser._id,
          username: currentUser.username,
          bookId: bookId,
          rating: rating,
          content: content,
        }),
      };
      if (content !== "") {
        fetch(
          "https://polar-savannah-23530.herokuapp.com/review/addReview",
          requestOptions
        );
        fetch(
          "https://polar-savannah-23530.herokuapp.com/review/calculateAverage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              bookId: bookId,
            }),
          }
        );
        refreshReviewsData();
        refreshRatingsData();
        refreshReviewed();
        setNoMore();
        setRating(1);
        setContent("");
      } else {
        showAlert("review", "fail", "empty");
      }
    } else {
      showAlert("review", "fail");
    }
  };

  return (
    <Form className="mt-3 row mx-1 px-0">
      <Alert
        alertClose={alertClose}
        alertVisibility={alertVisibility}
        alertType={alertType}
        alertStatus={alertStatus}
        alertDetail={alertDetail}
      />
      <Form.Group className="mb-3 p-0" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold fs-5">Write a review </Form.Label>
        <Form.Control
          value={content}
          onChange={(e) => setContent(e.target.value)}
          as="textarea"
          rows={3}
          placeholder="Leave a review here..."
        />
      </Form.Group>
      <div className="pl-0">
        <StarRatings
          rating={rating}
          starRatedColor="yellow"
          starHoverColor="yellow"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
        />
      </div>
      <Button
        onClick={handleAddReview}
        className="d-block mt-3 col-3 col-lg-1 px-2"
        style={{ background: "#5A3434" }}
        variant="primary"
        size="md"
      >
        Send
      </Button>
    </Form>
  );
};

export default AddReviewForm;
