import { Image } from "react-bootstrap";
import ProfileVoting from "./ProfileVoting";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";

const PersonalInfo = ({
  inPage,
  avatar,
  reviewsQuant,
  owningQuant,
  nickname,
  bio,
  username,
}) => {
  const { handleSetCurrentUser } = useContext(UserContext);
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
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
        })
        .catch((err) => console.log(err));
    }
    handleSetCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")).id);

    setEditProfileBtn(!editProfileBtn);
  };

  const [nicknameInputVal, setNicknameInputVal] = useState(nickname);
  const handleChangeNickname = (e) => {
    setNicknameInputVal(e.target.value);
  };

  const [bioInputVal, setBioInputval] = useState(bio);
  const handleChangeBio = (e) => {
    setBioInputval(e.target.value);
  };

  switch (inPage) {
    // Default = profile page
    default:
      return (
        <div className="d-flex mb-4 flex-column flex-sm-row flex-md-row flex-lg-row">
          <div className="d-flex flex-column align-items-center">
            <Image src={avatar} roundedCircle width={150} height={150} />
            <div className="d-flex justify-content-evenly">
              <ProfileVoting isUpvote={true} votesQuant={123} />
              <ProfileVoting isUpvote={false} votesQuant={3456} />
            </div>
          </div>
          <div className="ms-lg-5 w-100">
            <div className="border-bottom pb-2 d-flex justify-content-between">
              {editProfileBtn ? (
                <h4 className="text-uppercase m-0">{nicknameInputVal}</h4>
              ) : (
                <input
                  className="w-100"
                  type="text"
                  value={nicknameInputVal}
                  onChange={handleChangeNickname}
                />
              )}

              <div
                className="btn btn-sm btn-primary"
                onClick={handleEditProfile}
              >
                {editProfileBtn ? "Edit" : "Save"}
              </div>
            </div>
            <table className="table table-sm table-borderless align-top">
              <tbody>
                <tr>
                  <th>Books</th>
                  <td>{owningQuant}</td>
                </tr>
                <tr>
                  <th>Reviews</th>
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
  }
};

export default PersonalInfo;
