import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import BookItem from "../components/BookItem";
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
    <div className='w-100 vh-100 d-flex'>
      <div className=' bg-warning d-none d-md-inline-block d-lg-inline-block vh-100 col-md-2 col-lg-2'>
        Left
      </div>
      <div className='home_tabs w-100 d-flex flex-column align-items-center py-3 col-12 col-md-8 col-lg-8 '>
        <Tabs
          variant='pills'
          defaultActiveKey='trending'
          id='uncontrolled-tab-example'>
          <Tab eventKey='feeds' title='Feeds'>
            <div className='tab_feeds_content mt-3 w-100 d-flex flex-column'>
              <Activity
                username='username'
                bookName='Mat Biec'
                date='08/07/2021'
                rating={4}
                review='(theo lời một bài hát).'
                cover='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546928634l/43505141.jpg'
              />
              <Activity
                username='username'
                bookName='Mat Biec'
                date='08/07/2021'
                rating={4}
                review='Một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn này. Một tác phẩm đang được dịch và giới thiệu tại Nhật Bản (theo thông tin từ các báo)… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc rất, rất buồn khi suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn (cái kết thúc không như mong đợi của mọi người). Cũng bởi, mắt biếc… năm xưa nay đâu (theo lời một bài hát).'
                cover='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546928634l/43505141.jpg'
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
                        <BookItem book={book}></BookItem>
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
