import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import BookOnTrend from "../components/BookOnTrend";
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
    <div className="w-100 vh-100">
      <div className="home_tabs w-100 d-flex flex-column align-items-center py-3">
        <Tabs
          variant="pills"
          defaultActiveKey="trending"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="feeds" title="Feeds">
            <div className="tab_feeds_content">Feeds</div>
          </Tab>
          <Tab eventKey="trending" title="Trending">
            <div className="tab_trending_content mt-3 text-center">
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Container>
                  <Row>
                    {booksData.map((book) => (
                      <Col key={book._id} xs={12} sm={12} md={6} lg={6} xl={4}>
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
    </div>
  );
};

export default Home;
