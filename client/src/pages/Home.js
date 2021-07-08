import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import BookOnTrend from "../components/BookOnTrend";
import Activity from "../components/Activity";
const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setLoading(false);
        setBooksData(resJson);
      });
  }, []);

  return (
    <div className="w-100 vh-100 d-flex">
      <div className=" bg-warning d-none d-md-inline-block d-lg-inline-block    vh-100 col-md-2 col-lg-2">
        Left
      </div>
      <div className="home_tabs w-100 d-flex flex-column align-items-center py-3 col-12  col-md-8 col-lg-8 ">
        <Tabs
          variant="pills"
          defaultActiveKey="trending"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="feeds" title="Feeds">
            <div className="tab_feeds_content mt-3 p-5  border border-dark w-100 ">
              <Activity
                username="username"
                bookName="Matbiec"
                date="2021"
                rating={4}
                review="A very good book"
                cover="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546928634l/43505141.jpg"
              />
            </div>
          </Tab>
          <Tab eventKey="trending" title="Trending">
            <div className="tab_trending_content mt-3 text-center">
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Container>
                  <Row>
                    {booksData.map((book) => (
                      <Col
                        key={book._id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={6}
                      >
                        <BookOnTrend book={book}></BookOnTrend>
                      </Col>
                    ))}
                  </Row>
                </Container>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className="bg-danger d-none d-md-inline-block d-lg-inline-block col-md-2 col-lg-2">
        Right
      </div>
    </div>
  );
};

export default Home;
