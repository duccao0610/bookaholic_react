import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const ProfileVoting = ({ isUpvote, votesQuant }) => {
  return (
    <div className="d-flex align-items-center mx-2" style={{ width: "80px" }}>
      {isUpvote ? (
        <FaArrowCircleUp
          className="text-success"
          style={{ fontSize: "15px" }}
        />
      ) : (
        <FaArrowCircleDown
          className="text-danger"
          style={{ fontSize: "15px" }}
        />
      )}
      <span>{votesQuant}</span>
    </div>
  );
};

export default ProfileVoting;
