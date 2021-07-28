import { Image } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import "./BookItem.css";
const BookItem = ({ book, onlyImage, onCategory, onSearch }) => {
  return (
    <div
      className={
        onlyImage
          ? onCategory
            ? "col-4 col-md-3 col-lg-2  mr-lg-2 mr-xl-0 d-flex justify-content-center mb-3 p-0"
            : "d-flex justify-content-center"
          : `rounded d-flex justify-content-start px-md-2 px-3 py-2 ${
              onSearch ? "d-flex justify-content-start mb-2 w-100" : "mb-lg-4"
            }`
      }
      style={
        onSearch
          ? {
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }
          : null
      }
    >
      {onlyImage ? (
        <Link to={"/books/" + book._id}>
          <Image
            width={onCategory ? 110 : 80}
            height={onCategory ? 160 : 120}
            // className="w-100 h-100"
            src={book.cover}
            alt={`${book.cover} + image`}
            rounded={onCategory ? false : true}
            style={{
              boxShadow: `${
                onCategory
                  ? "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px"
                  : "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
              }`,
            }}
          />
        </Link>
      ) : (
        <Image
          width={onSearch ? 50 : 85}
          height={onSearch ? 80 : 130}
          src={book.cover}
          alt={`${book.cover} + image`}
          rounded
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        />
      )}

      {onlyImage ? null : (
        <div
          className={"book_info pl-3 d-flex flex-column justify-content-evenly"}
        >
          <Link to={"/book/" + book._id} className="text-dark">
            <div
              className={`title_truncated font-weight-bold text-left text-break ${
                onSearch ? "" : "fs-5"
              }`}
            >
              {book.title}
            </div>
          </Link>
          <div
            className="text-left font-weight-light font-italic"
            style={onSearch ? { fontSize: "12px" } : null}
          >
            {book.authors.map((author, idx) => (
              <span key={`${author} +${book.title}`}>
                {author}
                {idx === book.authors.length - 1 ? "" : ","}
              </span>
            ))}
          </div>
          {onSearch ? null : (
            <>
              <div className="tag_truncated text-left">
                {book.categories.map((item, idx) => {
                  return idx >= 5 ? null : (
                    <Tag key={idx} variant={idx} name={item} />
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookItem;
