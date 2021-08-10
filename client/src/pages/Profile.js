import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import Activity from "../components/Activity";
import ReactPaginate from "react-paginate";
import PersonalInfo from "../components/PersonalInfo";
import Shelf from "../components/Shelf";
import UserContext from "../context/userContext";
import AddFriendStatus from "../components/AddFriendStatus";
const Profile = () => {
  const { currentUser, socketRef, setCurrentUser, handleUpdateCurrentUser } =
    useContext(UserContext);
  const isCurrentUserDataLoaded =
    currentUser && currentUser.friends && currentUser.pendingFriendRequests;

  const [loading, setLoading] = useState(true);

  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/user/${params.username}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("USER", resJson);
        setUserData(resJson);
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
  // const user = userDataRef.current;

  const shelvesPerGroup = 4;
  const [activeShelvesGroup, setActiveShelvesGroup] = useState(0);

  const handleClickShelvesList = (clickedGroup) => {
    console.log(clickedGroup.selected);
    setActiveShelvesGroup(clickedGroup.selected);
  };

  const [friendStatus, setFriendStatus] = useState("noAction");

  useEffect(() => {
    if (isCurrentUserDataLoaded) {
      const findInFriends = currentUser.friends.filter(
        (item) => item._id === userData._id
      ).length;
      if (findInFriends > 0) setFriendStatus("friend");
      const findIfSender = currentUser.pendingFriendRequests.filter(
        (item) => item.senderUsername === userData.username
      ).length;
      if (findIfSender > 0) setFriendStatus("reqReceived");
      const findIfReceiver = currentUser.pendingFriendRequests.filter(
        (item) => item.receiverUsername === userData.username
      ).length;
      if (findIfReceiver > 0) setFriendStatus("reqSent");
    }
  }, [currentUser]);

  const handleSendFriendReq = () => {
    socketRef.emit(
      "sendFriendReq",
      currentUser.username,
      userData.username,
      currentUser._id
    );

    const pendingFriendReq = {
      senderUsername: currentUser.username,
      receiverUsername: userData.username,
      senderId: currentUser._id,
    };

    const updateForCurrentUser = { ...currentUser };
    updateForCurrentUser.pendingFriendRequests.push(pendingFriendReq);
    setCurrentUser(updateForCurrentUser);

    const updateForDisplayingUser = { ...userData };
    updateForDisplayingUser.pendingFriendRequests.push(pendingFriendReq);
    setUserData(updateForDisplayingUser);

    setFriendStatus("reqSent");
    handleUpdateCurrentUser();
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
              avatar={userData.avatar}
              upvote={userData.userRate.upvote}
              downvote={userData.userRate.downvote}
              nickname={userData.nickname}
              owningQuant={userData.owning.length}
              reviewsQuant={120}
              bio={userData.bio}
              username={userData.username}
              isMyProfile={
                currentUser && currentUser !== null
                  ? currentUser.username === userData.username
                  : false
              }
            />
            <div id="book-shelves" className="mb-3">
              <div
                id="book-shelves-header"
                className="d-flex justify-content-between align-items-end border-bottom"
              >
                <div className="text-uppercase fw-bold">bookshelves</div>
                {currentUser === null ? null : (
                  <Link
                    style={{ background: "#5a3434" }}
                    className="btn btn-sm mb-1 text-white"
                    to={`/user/${params.username}/shelves`}
                  >
                    More detail
                  </Link>
                )}
              </div>
              <div className="d-flex my-3">
                {[...userData.shelves]
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
                  pageCount={Math.ceil(
                    userData.shelves.length / shelvesPerGroup
                  )}
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
                {`${userData.nickname}'s recent activities`}
              </div>
              <div id="activities-list">
                {reviews.map((review, idx) => {
                  return (
                    <Activity
                      inPage="profile"
                      username={userData.nickname}
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
          <div className="d-none d-sm-none d-md-inline-block d-lg-inline-block col-md-3 col-lg-4">
            {currentUser &&
            currentUser.username === userData.username ? null : (
              <AddFriendStatus
                nickname={userData.nickname}
                friendStatus={friendStatus}
                onSendFriendReq={handleSendFriendReq}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
