import { useContext } from "react";
import UserContext from "../context/userContext";
const ProfileRecap = () => {
  const { currentUser } = useContext(UserContext);
  console.log("CUrrentRECAP", currentUser);
  return (
    <div
      className="mt-5 px-3 py-4 d-flex flex-column rounded"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        background: "rgba(244, 241, 234,0.3)",
        minHeight: "150px",
      }}
    >
      {currentUser ? (
        <img
          style={{
            position: "absolute",
            top: 35,
            left: "50%",
            transform: "translateX(-50%)",
            objectFit: "contain",
          }}
          className="rounded-circle border border-dark"
          width="70px"
          height="70px"
          alt="avatar"
          src={currentUser.avatar}
        />
      ) : null}

      <div
        className="fs-4 fw-bold mt-4 text-center"
        style={{ color: "#5a3434" }}
      >
        {currentUser ? currentUser.nickname : null}
      </div>
      {currentUser ? (
        <div className="row fw-light">
          <div className="col-4 d-flex flex-column align-items-center">
            <div>UpVote</div>
            <div className="fw-bold">
              {currentUser.userRate ? currentUser.userRate.upvote : ""}
            </div>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <div>DownVote</div>
            <div className="fw-bold">
              {currentUser.userRate ? currentUser.userRate.downvote : ""}
            </div>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <div>Friends</div>
            <div className="fw-bold">
              {currentUser.friends ? currentUser.friends.length : ""}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileRecap;
