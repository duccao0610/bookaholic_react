
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const ProfileVoting = ({ upvote, downvote, inPage, voteStatus, onVote }) => {
  const handleVote = (e) => {
    if (!e.target.checked) onVote("notVote");
    else onVote(e.target.value);
  };

  switch (inPage) {
    case "home":
      return (
        <div className="row w-100">
          <div className="col-6 d-flex align-items-center">
            <FaArrowCircleUp className="text-success" />
            <div className="ms-1">{upvote}</div>
          </div>
          <div className="col-6 d-flex align-items-center">
            <FaArrowCircleDown className="text-danger" />
            <div className="ms-1">{downvote}</div>
          </div>
        </div>
      );

    case "profile":
      return (
        <div className="row w-100 mt-2">
          <div className="form-check col-6 p-0">
            <input
              className="btn-check"
              type="checkbox"
              value='upvote'
              id="upvote"
              checked={voteStatus === "upvote"}
              onChange={handleVote}
            />
            <label
              className="btn btn-sm btn-outline-success w-100 py-0"
              htmlFor="upvote"
            >
              <FaArrowCircleUp />
              <div>{upvote}</div>
            </label>
          </div>
          <div className="form-check col-6 p-0">
            <input
              className="btn-check"
              type="checkbox"
              value='downvote'
              id="downvote"
              checked={voteStatus === "downvote"}
              onChange={handleVote}
            />
            <label
              className="btn btn-sm btn-outline-danger w-100 py-0"
              htmlFor="downvote"
            >
              <FaArrowCircleDown />
              <div>{downvote}</div>
            </label>
          </div>
        </div>
      );
    default:
      break;
  }
};

export default ProfileVoting;
