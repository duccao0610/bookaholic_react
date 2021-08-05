import ProfileVoting from "./ProfileVoting";
import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../context/userContext";
import { AiFillCamera } from "react-icons/ai";
import Alert from "./Alert";
const PersonalInfo = ({
  inPage,
  avatar,
  reviewsQuant,
  owningQuant,
  nickname,
  bio,
  username,
  isMyProfile,
  downvote,
  upvote,
  current,
}) => {
  const { currentUser, handleUpdateCurrentUser, socketRef } =
    useContext(UserContext);

  const [editProfileBtn, setEditProfileBtn] = useState(true);

  const handleEditProfile = async () => {
    const editedProfile = JSON.stringify({
      nickname: nicknameInputVal,
      bio: bioInputVal,
    });

    if (!editProfileBtn) {
      await fetch(`http://localhost:5000/user/${username}/editProfile`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: editedProfile,
      }).catch((err) => console.log(err));
    }

    socketRef.emit("updateProfile", "profile update");
    socketRef.on("updateCurrentUser", () => {
      handleUpdateCurrentUser(
        JSON.parse(sessionStorage.getItem("currentUser")).id
      );
      console.log("updated");
    });

    setEditProfileBtn(!editProfileBtn);
  };
  //Show alert
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [alertDetail, setAlertDetail] = useState();

  const showAlert = (type, status, detail) => {
    setAlertVisibility(true);
    setAlertType(type);
    setAlertStatus(status);
    setAlertDetail(detail);
  };
  const alertClose = (status) => {
    setAlertVisibility(false);
  };

  // Edit nickname
  const [nicknameInputVal, setNicknameInputVal] = useState(nickname);
  const handleChangeNickname = (e) => {
    setNicknameInputVal(e.target.value);
  };

  // Edit bio
  const [bioInputVal, setBioInputval] = useState(bio);
  const handleChangeBio = (e) => {
    setBioInputval(e.target.value);
  };

  // Upload avatar
  const [displayAvatar, setDisplayAvatar] = useState(avatar);
  const handleUploadAvatar = (event) => {
    const inputFile = event.target.files[0];
    console.log(inputFile.size);

    // Check file size
    if (inputFile.size > 5 * 1024 * 1024) {
      showAlert("avatar", "fail");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update on database
        fetch(`http://localhost:5000/user/${username}/uploadAvatar`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ base64ImgSrc: e.target.result }),
        });

        // Update UI
        setDisplayAvatar(e.target.result);
      };
      reader.readAsDataURL(inputFile);
    }
    // Clear input
    event.target.value = "";
  };

  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [downvoteCount, setDownvoteCount] = useState(downvote);
  const [voteStatus, setVoteStatus] = useState("notVote");
  const prevVoteStatusRef = useRef();
  useEffect(() => {
    console.log(current);
    const searchVotedUsersList = current.votedUsersList.findIndex(
      (item) => item.username === username
    );
    if (searchVotedUsersList !== -1) {
      if (current.votedUsersList[searchVotedUsersList].isUpvote) {
        setVoteStatus("upvote");
      } else {
        setVoteStatus("downvote");
      }
    }
  }, [current, username]);

  const handleVote = (newVoteStatus) => {
    prevVoteStatusRef.current = voteStatus;
    if (!currentUser || currentUser === null) {
      showAlert("vote", "fail");
      return;
    }
    if (newVoteStatus === "upvote" && voteStatus === "notVote") {
      setUpvoteCount((prev) => (prev += 1));
    }
    if (newVoteStatus === "upvote" && voteStatus === "downvote") {
      setUpvoteCount((prev) => (prev += 1));
      setDownvoteCount((prev) => (prev -= 1));
    }
    if (newVoteStatus === "downvote" && voteStatus === "notVote") {
      setDownvoteCount((prev) => (prev += 1));
    }
    if (newVoteStatus === "downvote" && voteStatus === "upvote") {
      setDownvoteCount((prev) => (prev += 1));
      setUpvoteCount((prev) => (prev -= 1));
    }
    if (newVoteStatus === "notVote" && voteStatus === "upvote") {
      setUpvoteCount((prev) => (prev -= 1));
    }
    if (newVoteStatus === "notVote" && voteStatus === "downvote") {
      setDownvoteCount((prev) => (prev -= 1));
    }
    setVoteStatus(newVoteStatus);
  };

  useEffect(() => {
    fetch("http://localhost:5000/user/voteUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upvoteCount: upvoteCount,
        downvoteCount: downvoteCount,
        votedUser: username,
        currentUser: current.username,
        prevVoteStatus: prevVoteStatusRef.current,
        voteStatus: voteStatus,
      }),
    }).catch((error) => {
      console.log("Error occured when fetch: ", error);
    });
  }, [current.username, downvoteCount, upvoteCount, username, voteStatus]);

  switch (inPage) {
    case "profile":
      return (
        <div className="d-flex mb-4 flex-column flex-sm-row flex-md-row flex-lg-row">
          <Alert
            alertClose={alertClose}
            alertVisibility={alertVisibility}
            alertType={alertType}
            alertStatus={alertStatus}
            alertDetail={alertDetail}
          />
          <div className="d-flex flex-column align-items-center">
            <div className="position-relative">
              <div className="border rounded-circle p-1">
                <img
                  id="avatar"
                  alt=""
                  src={displayAvatar}
                  className="border rounded-circle overflow-hidden"
                  width="150px"
                  height="150px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {isMyProfile ? (
                <>
                  <label
                    className="mb-0 text-black position-absolute rounded-circle border text-center pointer bg-light"
                    htmlFor="upload-avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      right: "0px",
                      bottom: "15px",
                    }}
                  >
                    <AiFillCamera className="p-1 fs-3" />
                  </label>
                  <input
                    id="upload-avatar"
                    type="file"
                    className="d-none"
                    onChange={(e) => {
                      handleUploadAvatar(e);
                      socketRef.emit("updateAvatar", "Avatar update");
                      socketRef.on("updateCurrentUser", () => {
                        handleUpdateCurrentUser(
                          JSON.parse(sessionStorage.getItem("currentUser")).id
                        );
                      });
                    }}
                  />
                </>
              ) : (
                <ProfileVoting
                  inPage="profile"
                  votedUsername={username}
                  currentUser={current}
                  upvote={upvoteCount}
                  downvote={downvoteCount}
                  voteStatus={voteStatus}
                  onVote={handleVote}
                />
              )}
            </div>
          </div>
          <div className="ms-lg-5 w-100">
            <div className="border-bottom pb-2 d-flex justify-content-between">
              {editProfileBtn ? (
                <h4 className="text-uppercase m-0">{nicknameInputVal}</h4>
              ) : (
                <input
                  placeholder="Max 10 characters"
                  maxLength={10}
                  className="w-100"
                  type="text"
                  value={nicknameInputVal}
                  onChange={handleChangeNickname}
                />
              )}
              {isMyProfile ? (
                <div
                  style={{ background: "#5a3434" }}
                  className="btn btn-sm text-white"
                  onClick={handleEditProfile}
                >
                  {editProfileBtn ? "Edit" : "Save"}
                </div>
              ) : null}
            </div>
            <table className="table table-sm table-borderless align-top">
              <tbody>
                <tr>
                  <th>Books</th>
                  <td>{owningQuant}</td>
                </tr>
                <tr>
                  <th className="col-2">Reviews</th>
                  <td>{reviewsQuant}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>
                    {editProfileBtn ? (
                      `${bioInputVal}`
                    ) : (
                      <textarea
                        className="w-100"
                        style={{ height: "90px" }}
                        type="text"
                        value={bioInputVal}
                        onChange={handleChangeBio}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      break;
  }
};

export default PersonalInfo;
