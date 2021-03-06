import ProfileVoting from "./ProfileVoting";
import { useState, useContext, useRef, useEffect } from "react";
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
}) => {
  const { currentUser, handleUpdateCurrentUser, setCurrentUser } =
    useContext(UserContext);

  const [editProfileBtn, setEditProfileBtn] = useState(true);

  const handleEditProfile = async () => {
    const editedProfile = JSON.stringify({
      nickname: nicknameInputVal,
      bio: bioInputVal,
    });

    if (!editProfileBtn) {
      await fetch(
        `https://polar-savannah-23530.herokuapp.com/user/${username}/editProfile`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: editedProfile,
        }
      ).catch((err) => console.log(err));
    }

    handleUpdateCurrentUser();

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

    // Check file size
    if (inputFile.size > 5 * 1024 * 1024) {
      showAlert("avatar", "fail");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update on database
        fetch(
          `https://polar-savannah-23530.herokuapp.com/user/${username}/uploadAvatar`,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ base64ImgSrc: e.target.result }),
          }
        );

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

  // Initialize vote status when direct to profile page
  const prevVoteStatusRef = useRef();
  const [voteStatus, setVoteStatus] = useState("notVote");
  const searchVotedUsersListRef = useRef();

  useEffect(() => {
    if (currentUser && currentUser.votedUsersList) {
      searchVotedUsersListRef.current = currentUser.votedUsersList.findIndex(
        (item) => item.username === username
      );
      if (searchVotedUsersListRef.current !== -1) {
        if (
          currentUser.votedUsersList[searchVotedUsersListRef.current].isUpvote
        ) {
          setVoteStatus("upvote");
        } else {
          setVoteStatus("downvote");
        }
      }
    }
  }, [currentUser, username]);

  // Handle on voting an user
  const [shouldFetchVote, setShouldFetchVote] = useState(false);
  const [triggerFetchVote, setTriggerFetchVote] = useState(false);

  const handleVote = (newVoteStatus) => {
    prevVoteStatusRef.current = voteStatus;
    if (!currentUser || currentUser === null) {
      showAlert("vote", "fail");
      return;
    }
    let update = { ...currentUser };
    if (newVoteStatus === "upvote" && voteStatus === "notVote") {
      setUpvoteCount(upvoteCount + 1);
      update.votedUsersList.push({ username: username, isUpvote: true });
    } else if (newVoteStatus === "upvote" && voteStatus === "downvote") {
      setUpvoteCount(upvoteCount + 1);
      setDownvoteCount(downvoteCount - 1);
      update.votedUsersList[searchVotedUsersListRef.current].isUpvote = true;
    } else if (newVoteStatus === "downvote" && voteStatus === "notVote") {
      setDownvoteCount(downvoteCount + 1);
      update.votedUsersList.push({ username: username, isUpvote: false });
    } else if (newVoteStatus === "downvote" && voteStatus === "upvote") {
      setDownvoteCount(downvoteCount + 1);
      setUpvoteCount(upvoteCount - 1);
      update.votedUsersList[searchVotedUsersListRef.current].isUpvote = false;
    } else if (newVoteStatus === "notVote" && voteStatus === "upvote") {
      setUpvoteCount(upvoteCount - 1);
      update.votedUsersList.splice(searchVotedUsersListRef.current, 1);
    } else if (newVoteStatus === "notVote" && voteStatus === "downvote") {
      setDownvoteCount(downvoteCount - 1);
      update.votedUsersList.splice(searchVotedUsersListRef.current, 1);
    }
    setCurrentUser(update);
    setVoteStatus(newVoteStatus);
    setShouldFetchVote(true);
    setTriggerFetchVote(!triggerFetchVote);
  };

  useEffect(() => {
    if (shouldFetchVote) {
      fetch("https://polar-savannah-23530.herokuapp.com/user/voteUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upvoteCount: upvoteCount,
          downvoteCount: downvoteCount,
          votedUser: username,
          currentUser: currentUser.username,
          prevVoteStatus: prevVoteStatusRef.current,
          voteStatus: voteStatus,
        }),
      })
        .then(() => {
          setShouldFetchVote(false);
          handleUpdateCurrentUser();
        })
        .then(showAlert("vote", "success"));
    }
  }, [triggerFetchVote]);

  switch (inPage) {
    case "profile":
      return (
        <div className='d-flex flex-column flex-sm-row flex-md-row flex-lg-row mb-md-3'>
          <Alert
            alertClose={alertClose}
            alertVisibility={alertVisibility}
            alertType={alertType}
            alertStatus={alertStatus}
            alertDetail={alertDetail}
          />
          <div className='d-flex flex-column align-items-center'>
            <div className='position-relative'>
              <div className='border rounded-circle p-1'>
                <img
                  id='avatar'
                  alt=''
                  src={displayAvatar}
                  className='border rounded-circle overflow-hidden'
                  width='150px'
                  height='150px'
                  style={{ objectFit: "cover" }}
                />
              </div>
              {isMyProfile ? (
                <>
                  <label
                    className='mb-0 text-black position-absolute rounded-circle border text-center pointer bg-light'
                    htmlFor='upload-avatar'
                    style={{
                      width: "30px",
                      height: "30px",
                      right: "0px",
                      bottom: "15px",
                    }}
                  >
                    <AiFillCamera className='p-1 fs-3' />
                  </label>
                  <input
                    id='upload-avatar'
                    type='file'
                    className='d-none'
                    onChange={(e) => {
                      handleUploadAvatar(e);
                      handleUpdateCurrentUser();
                    }}
                  />
                </>
              ) : (
                <ProfileVoting
                  inPage='profile'
                  upvote={upvoteCount}
                  downvote={downvoteCount}
                  voteStatus={voteStatus}
                  onVote={handleVote}
                />
              )}
            </div>
          </div>
          <div className='ms-lg-5 w-100'>
            <div className='border-bottom pb-2 d-flex justify-content-between'>
              {editProfileBtn ? (
                <h4 className='m-0'>{nicknameInputVal}</h4>
              ) : (
                <input
                  placeholder='Max 10 characters'
                  maxLength={10}
                  className='w-100'
                  type='text'
                  value={nicknameInputVal}
                  onChange={handleChangeNickname}
                />
              )}
              {isMyProfile ? (
                <div
                  style={{ background: "#5a3434" }}
                  className='btn btn-sm text-white'
                  onClick={handleEditProfile}
                >
                  {editProfileBtn ? "Edit" : "Save"}
                </div>
              ) : null}
            </div>
            <table className='table table-sm table-borderless align-top'>
              <tbody>
                <tr>
                  <th>Books</th>
                  <td>{owningQuant}</td>
                </tr>
                <tr>
                  <th className='col-2'>Reviews</th>
                  <td>{reviewsQuant}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>
                    {editProfileBtn ? (
                      `${bioInputVal}`
                    ) : (
                      <textarea
                        className='w-100'
                        style={{ height: "90px" }}
                        type='text'
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
