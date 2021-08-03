import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import ProfileVoting from "./ProfileVoting";
const UserItem = ({ user, inRank, idx }) => {
  return (
    <div
      className="justify-content-center px-3 py-2 mx-1 row mb-2"
      style={
        inRank
          ? null
          : {
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }
      }
    >
      <div className="col-3 d-flex align-items-center justify-content-center">
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
          className="border border-dark rounded-circle"
          width="50px"
          height="50px"
          alt="avatar"
          src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
        />
      </div>
      <div className="col-8">
        <Link
          to={`/user/${user.username}`}
          className="fw-bold"
          style={{ textDecoration: "none", color: "#5a3434" }}
        >
          {user.nickname}
        </Link>
        {inRank ? (
          <div className="d-flex">
            <ProfileVoting isUpvote={true} votesQuant={user.userRate.upvote} />
            <ProfileVoting
              isUpvote={false}
              votesQuant={user.userRate.downvote}
            />
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
