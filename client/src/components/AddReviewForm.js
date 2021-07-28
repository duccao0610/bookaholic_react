import { Form, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { useState } from "react";
const AddReviewForm = () => {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <Form className="mt-3 row mx-1 px-0">
      <Form.Group className="mb-3 p-0" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold fs-5">Write a review </Form.Label>
        <Form.Control
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
