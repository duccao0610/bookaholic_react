import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookItem from "./BookItem";
const RelatedBooks = ({ books }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 990 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 990, min: 600 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 3,
    },
  };
  return (
    <>
      <h5>Related books</h5>
      <Carousel
        customTransition="all 1.5s ease"
        responsive={responsive}
        itemClass="p-0"
        containerClass="py-1"
      >
        {books.map((book, idx) => {
          return <BookItem key={idx} book={book} onlyImage />;
        })}
      </Carousel>
    </>
  );
};

export default RelatedBooks;
