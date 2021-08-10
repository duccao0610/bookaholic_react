import { useState, useEffect, useRef, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import Activity from "../components/Activity";
import ReactPaginate from "react-paginate";
import PersonalInfo from "../components/PersonalInfo";
import Shelf from "../components/Shelf";
import UserContext from "../context/userContext";
const Profile = () => {
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const userDataRef = useRef();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/user/${params.username}`)
      .then((res) => res.json())
      .then((resJson) => {
        userDataRef.current = resJson;
        setLoading(false);
      });
  }, [params.username]);

  //fetch reviews
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let isLoading = true;
    fetch(`http://localhost:5000/review/${params.username}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (isLoading) {
          setReviews(resJson);
        }
      });
    return () => {
      isLoading = false;
    };
  }, [params.username]);
  //
  const user = userDataRef.current;

  const shelvesPerGroup = 4;
  const [activeShelvesGroup, setActiveShelvesGroup] = useState(0);

  const handleClickShelvesList = (clickedGroup) => {
    console.log(clickedGroup.selected);
    setActiveShelvesGroup(clickedGroup.selected);
  };

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div className="d-flex col-12 col-sm-12 col-md-12 col-lg-8 justify-content-center container px-0 pt-3">
          <div
            id="profile-main-content"
            className="col-sm-12 col-md-9 col-lg-8"
          >
            <PersonalInfo
              id="1"
              inPage="profile"
              avatar={user.avatar}
              upvote={user.userRate.upvote}
              downvote={user.userRate.downvote}
              nickname={user.nickname}
              owningQuant={user.owning.length}
              reviewsQuant={120}
              bio={user.bio}
              username={user.username}
              isMyProfile={
                currentUser ? currentUser.username === user.username : false
              }
            />
            <div id="book-shelves" className="mb-3">
              <div
                id="book-shelves-header"
                className="d-flex justify-content-between align-items-end border-bottom"
              >
                <div className="text-uppercase fw-bold">bookshelves</div>
                {currentUser === null ||
                currentUser.username !== user.username ? null : (
                  <Link
                    style={{ background: "#5a3434" }}
                    className="btn btn-sm mb-1 text-white"
                    to={`/user/${params.username}/shelves`}
                  >
                    Custom my shelves
                  </Link>
                )}
              </div>
              <div className="d-flex my-3">
                {[...user.shelves]
                  .slice(
                    activeShelvesGroup * shelvesPerGroup,
                    activeShelvesGroup * shelvesPerGroup + shelvesPerGroup
                  )
                  .map((item, i) => {
                    return (
                      <Shelf
                        key={i}
                        inPage="profile"
                        shelfName={item.shelfName}
                      />
                    );
                  })}
              </div>

              <div className="w-100 d-flex justify-content-center">
                <ReactPaginate
                  pageCount={Math.ceil(user.shelves.length / shelvesPerGroup)}
                  pageRangeDisplayed={shelvesPerGroup}
                  marginPagesDisplayed={1}
                  containerClassName="d-flex align-items-center"
                  previousClassName="fw-bold py-0 px-2 me-2 btn btn-primary"
                  previousLabel="Prev"
                  nextClassName="fw-bold py-0 px-2 ms-2 btn btn-primary"
                  nextLabel="Next"
                  pageClassName="list-group-item fw-bold py-0 px-2"
                  breakClassName="list-group-item fw-bold py-0 px-2"
                  activeClassName="active"
                  onPageChange={handleClickShelvesList}
                />
              </div>
            </div>
            <div id="recent-activities">
              <div
                id="activities-header"
                className="text-uppercase fw-bold border-bottom"
              >
                {`${user.nickname}'s recent activities`}
              </div>
              <div id="activities-list">
                {reviews.map((review, idx) => {
                  return (
                    <Activity
                      inPage="profile"
                      username={user.nickname}
                      bookName={review.book[0].title}
                      authors={review.book[0].authors}
                      rating={review.rating}
                      cover={review.book[0].cover}
                      review={review.content}
                      date={review.date.slice(0, 10)}
                      bookId={review.bookId}
                      key={idx}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="d-none d-sm-none d-md-inline-block d-lg-inline-block col-md-3 col-lg-4 bg-warning">
            Right panel
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
