import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import BookItem from "../components/BookItem";
import Activity from "../components/Activity";
import { useHistory } from "react-router";
import "./Home.css";
import TopUsers from "../components/TopUsers";
import ProfileRecap from "../components/ProfileRecap";
import UserContext from "../context/userContext";
import { FaExclamationTriangle } from "react-icons/fa";
const Home = () => {
  const history = useHistory();
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFeeds, setLoadingFeeds] = useState(false);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      history.push("/auth/login");
    }
  }, [history]);

  useEffect(() => {
    let loadingData = true;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    fetch("https://polar-savannah-23530.herokuapp.com/book/", requestOptions)
      .then((res) => res.json())
      .then((resJson) => {
        if (
          resJson.message === true &&
          loadingData &&
          sessionStorage.getItem("token")
        ) {
          setLoading(false);
          setBooksData(resJson.books);
        } else {
          sessionStorage.clear();
          history.push("/auth/login");
        }
      });
    return () => {
      loadingData = false;
    };
  }, [history]);

  const [feedsData, setFeedsData] = useState([]);
  const [noMore, setNoMore] = useState(false);
  const fetchFeeds = (skip) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    if (currentUser) {
      fetch(
        `https://polar-savannah-23530.herokuapp.com/user/feeds/${
          currentUser._id
        }/skip/${Number(skip)}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((resJson) => {
          setLoadingFeeds(false);
          setFeedsData((prev) => [...prev, ...resJson]);
          if (resJson.length < 4) {
            setNoMore(true);
          }
        });
    }
  };

  return (
    <>
      {!sessionStorage.getItem("token") ? null : (
        <div className='w-100 d-flex'>
          <div className='px-3 py-4 d-none d-md-inline-block d-lg-inline-block vh-100 col-md-4 col-lg-3'>
            <ProfileRecap />
            <div className='d-md-block d-lg-none'>
              <TopUsers />
            </div>
          </div>
          <div className='w-100 d-flex flex-column align-items-center py-3 col-12 col-md-8 col-lg-6'>
            <Tabs
              variant='pills'
              defaultActiveKey='trending'
              className='row tabs_container w-100 justify-content-center'
            >
              <Tab
                eventKey='info'
                title='Info'
                tabClassName='d-flex justify-content-center col-3 d-md-none'
              >
                <div className='d-md-none'>
                  <ProfileRecap />
                </div>
              </Tab>
              <Tab
                onEntered={() => {
                  setLoadingFeeds(true);
                  fetchFeeds(0);
                }}
                onExited={() => {
                  setFeedsData([]);
                  setNoMore(false);
                }}
                eventKey='feeds'
                title='Feeds'
                tabClassName='d-flex justify-content-center col-md-2 col-3'
              >
                <div
                  style={{ width: "400px" }}
                  className='mt-3 d-flex flex-column row'
                >
                  {loadingFeeds ? (
                    <div className='text-center'>
                      <Spinner animation='border' variant='primary' />
                    </div>
                  ) : (
                    <>
                      {feedsData.length === 0 ? (
                        <div className='d-flex align-items-center gap-1 font-italic justify-content-center'>
                          <FaExclamationTriangle />
                          No Feeds
                        </div>
                      ) : (
                        <>
                          {feedsData.map((feed, idx) => {
                            return (
                              <Activity
                                key={idx}
                                username={feed.user[0].nickname}
                                bookName={feed.book[0].title}
                                date={feed.feed.date.slice(0, 10)}
                                rating={feed.feed.rating}
                                review={feed.feed.content}
                                cover={feed.book[0].cover}
                                avatar={feed.user[0].avatar}
                                bookId={feed.feed.bookId}
                                userId={feed.feed.username}
                              />
                            );
                          })}
                          {!noMore ? (
                            <div
                              style={{ cursor: "pointer" }}
                              className='text-center text-primary font-italic'
                              onClick={() => fetchFeeds(feedsData.length)}
                            >
                              Load more...
                            </div>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </div>
              </Tab>
              <Tab
                eventKey='trending'
                title='Trending'
                tabClassName='col-3 col-md-2 d-flex justify-content-center'
              >
                <div className='tab_trending_content mt-3 text-center'>
                  {loading ? (
                    <div className='vh-100'>
                      <Spinner animation='border' variant='primary' />
                    </div>
                  ) : (
                    <Container>
                      <Row className='justify-content-center'>
                        {booksData.map((book) => (
                          <Col
                            key={book._id}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={8}
                          >
                            <BookItem book={book}></BookItem>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  )}
                </div>
              </Tab>

              <Tab
                eventKey='ranking'
                title='Ranking'
                tabClassName='d-flex justify-content-center col-3 d-md-none'
              >
                <div className='d-md-none'>
                  <TopUsers onTab />
                </div>
              </Tab>
            </Tabs>
          </div>
          <div className='position-relative pl-3 pl-lg-4 pr-3 py-2 d-none d-md-inline-block d-lg-inline-block col-md-0 col-lg-3 vh-100'>
            <TopUsers />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
