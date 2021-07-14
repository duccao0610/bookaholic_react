import { Image } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
const BookItem = ({ book }) => {
  return (
    <div className="rounded d-flex justify-content-start px-md-2 px-3 py-2 mb-lg-4">
      <Image
        width={85}
        height={130}
        src={book.cover}
        alt={`${book.cover} + image`}
        rounded
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      />
      <div className="book_info pl-3 d-flex flex-column justify-content-evenly">
        <Link to={"/books/" + book._id} className="text-dark">
          <div className="fs-5 font-weight-bold text-left text-break ">
            {book.title}
          </div>
        </Link>
        <div className="text-left font-weight-light font-italic">
          {book.authors.map((author) => (
            <span key={`${author} +${book.title}`}>{author}</span>
          ))}
        </div>
        <div className="categories text-left">
          {book.categories.map((item, idx) => {
            return (
              <div
                key={`${idx}+ ${item}`}
                className={` badge badge-pill mr-1 + ${
                  idx === 0
                    ? "badge-success"
                    : idx % 4 === 1
                    ? "badge-warning"
                    : idx % 4 === 2
                    ? "badge-danger"
                    : idx % 4 === 3
                    ? "badge-primary"
                    : "badge-info"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="ratings text-left">
          <StarRatings
            starSpacing="3px"
            numberOfStars={5}
            starDimension="15px"
            starRatedColor="yellow"
            rating={book.averageRating}
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
