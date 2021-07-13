import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image, Tab, Tabs } from "react-bootstrap";
import AddReviewForm from "./AddReviewForm";
import BookRating from "./BookRating";
import Switch from "react-switch";
const BookDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [availability, setAvailability] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${params.id}`)
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        setBook(resJson[0]);
      });
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : book === null ? (
        <div>Not Found</div>
      ) : (
        <div className="book_detail_container d-flex flex-column flex-lg-row align-items-center justify-content-lg-center">
          <div className="bg-warning d-none d-lg-inline-block col-lg-2 vh-100 align-self-lg-start">
            Left
          </div>
          <div className="d-flex flex-column book_detail_info col-9 col-lg-7 mx-auto mt-5">
            <div className=" d-flex flex-column flex-lg-row pb-2 row">
              <Image
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                alt=""
                className="book_detail_cover p-0 mb-1 col-12 col-lg-2 rounded"
                src={book.cover}
              />
              <div className="col-12 col-lg-10  pl-0 pl-lg-3">
                <div className="book_detail_title fw-normal fs-2">
                  {book.title}
                </div>
                <div className="book_detail_authors font-italic fw-light fs-5">
                  {book.authors.map((author, idx) => (
                    <span key={idx}>{author + " "}</span>
                  ))}
                </div>
                <div className="d-flex align-items-end justify-content-between flex-lg-column align-items-lg-start pl-0 pr-2 col-12"></div>
                <div className="my-1 d-flex align-items-center justify-content-between pr-2 flex-lg-column align-items-lg-start ">
                  <span className="mr-1 font-italic">You own this book ?</span>
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
            </div>
            <Tabs
              defaultActiveKey="desc"
              id="uncontrolled-tab-example"
              className="mb-3 mx-auto d-flex justify-content-around px-2 col-12 col-lg-4"
            >
              <Tab
                eventKey="desc"
                title="Description"
                tabClassName="col-6 text-center"
              >
                {book.description}
              </Tab>
              <Tab
                eventKey="rating"
                title="Ratings"
                className="text-center"
                tabClassName="col-6 text-center"
              >
                <BookRating ratings={[10, 6, 5, 4, 3]} />
              </Tab>
            </Tabs>
            <AddReviewForm />
          </div>
          <div className="bg-danger d-none d-lg-inline-block col-lg-2 vh-100 align-self-lg-start">
            Right
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
