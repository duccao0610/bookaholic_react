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
                nickname's recent activities
              </div>
              <div id="activities-list">
                <Activity
                  inPage="profile"
                  username="Nguyen Khac Hung"
                  bookName="Chuoi An Mang A.B.C"
                  authors={["Agatha Christie", "Someone Else"]}
                  rating={2}
                  cover="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435375133l/25802987._SY475_.jpg"
                  review="Khi một sát nhân giết người hàng loạt bí danh ABC chế nhạo Poirot bằng những lá thư úp mở và giết người theo thứ tự chữ cái, Poirot tiến hành một phương pháp điều tra bất thường để truy tìm ABC. Chữ A là bà Ascher ờ Andover, B là Betty Barnard ở Bexhill, C là ngài Carmichael Clarke ở Churston. Qua từng vụ án, kẻ giết người càng tự tin hơn - nhưng để lại một vệt manh mối rõ ràng để chế nhạo Hercule Poirot tài ba có thể lại sai lầm đầu tiên và chí tử."
                  date="12/07/2021"
                />
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
