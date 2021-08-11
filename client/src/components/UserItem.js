import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const UserItem = ({ user, inRank, idx }) => {
  return (
    <div
      className="justify-content-center gap-3 px-3 py-2 row mb-3 mb-lg-2 col-10 mx-auto"
      style={
        inRank
          ? {
              borderRadius: "5px",
              background: "#F4F1EA",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }
          : {
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }
      }
    >
      <div className="col-2 col-md-3 col-lg-3 d-flex align-items-center justify-content-center position-relative">
        {idx <= 2 ? (
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -10,
              transform: "rotate(30deg)",
            }}
          >
            <FaCrown
              color={idx === 0 ? "gold" : idx === 1 ? "silver" : "brown"}
              size={30}
            />
          </div>
        ) : null}

        <img
          className="rounded-circle border"
          width="50px"
          height="50px"
          alt="avatar"
          src={user.avatar}
          // style={{ objectFit: "fill" }}
        />
      </div>
      <div className="col-6 col-md-7 col-lg-7 p-0 ">
        <Link
          to={`/user/${user.username}`}
          className="fw-bold"
          style={{ textDecoration: "none", color: "#5a3434" }}
        >
          {user.nickname}
        </Link>
        {inRank ? (
          <div className="row">
            <div className="col-6 d-flex align-items-center gap-1 p-0 justify-content-center">
              <div className="d-flex align-items-center">
                <FaArrowCircleUp color="green" size={10} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                {user.userRate.upvote}
              </span>
            </div>
            <div className="col-6 d-flex align-items-center gap-1 p-0 justify-content-center">
              <div className="d-flex align-items-center">
                <FaArrowCircleDown color="red" size={10} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                {user.userRate.downvote}
              </span>
            </div>
          </div>
        ) : (
          <p className="font-italic" style={{ fontSize: "12px", opacity: 0.8 }}>
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserItem;
