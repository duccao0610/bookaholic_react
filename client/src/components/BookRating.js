import StarRatings from "react-star-ratings";
import { ProgressBar } from "react-bootstrap";
const BookRating = ({ ratings }) => {
  const total = ratings.reduce((total, num) => {
    return total + num;
  });
  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      className="container rounded border py-2 d-flex flex-column bg-white"
    >
      <h6 className="align-self-start">User reviews</h6>
      <div className="d-flex">
        <h3 className="align-self-start">4.7</h3>
        <div className="d-flex align-items-start ml-1">
          <StarRatings
            rating={4}
            starSpacing="3px"
            numberOfStars={5}
            starDimension="20px"
            starRatedColor="yellow"
          />
        </div>
      </div>
      <div className="align-self-start fw-light font-italic">
        {total} reviews
      </div>
      <div className="d-flex flex-column">
        {ratings.map((rating, idx) => {
          return (
            <div key={idx} className="row d-flex align-items-center">
              <span className="col-1">{ratings.length - idx}</span>
              <div className="col-6 p-0">
                <ProgressBar
                  striped
                  variant="success"
                  now={(rating / total) * 100}
                  max={100}
                />
              </div>
              <span className="col-4 text-left fw-light p-0 pl-1 text-center">
                {((rating / total) * 100).toFixed(1) + "%"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookRating;
