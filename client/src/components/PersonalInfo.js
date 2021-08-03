import ProfileVoting from "./ProfileVoting";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";
import { AiFillCamera } from "react-icons/ai";

const PersonalInfo = ({
  inPage,
  avatar,
  reviewsQuant,
  owningQuant,
  nickname,
  bio,
  username,
}) => {
  const { currentUser, handleUpdateCurrentUser } = useContext(UserContext);
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
    handleUpdateCurrentUser(
      JSON.parse(sessionStorage.getItem("currentUser")).id
    );

    setEditProfileBtn(!editProfileBtn);
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
  const [displayAvatar, setDisplayAvatar] = useState(avatar)
  const handleUploadAvatar = (event) => {
    const inputFile = event.target.files[0];
    console.log(inputFile.size);

    // Check file size
    if (inputFile.size > 5 * 1024) {
      alert("Please choose another image which has size smaller than 5mb")
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update on database
        fetch(`http://localhost:5000/user/${username}/uploadAvatar`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ base64ImgSrc: e.target.result })
        });

        // Update UI
        setDisplayAvatar(e.target.result);
      }
      reader.readAsDataURL(inputFile);
    }
    // Clear input
    event.target.value = '';
  }

  switch (inPage) {
    // Default = profile page
    default:
      return (
        <div className="d-flex mb-4 flex-column flex-sm-row flex-md-row flex-lg-row">
          <div className="d-flex flex-column align-items-center">
            <div className='position-relative'>
              <div className='border rounded-circle p-1'>
                <img
                  id='avatar'
                  alt=''
                  src={displayAvatar} className='border rounded-circle overflow-hidden'
                  width='150px'
                  height='150px'
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <label
                className='mb-0 text-black position-absolute rounded-circle border text-center pointer bg-light'
                htmlFor='upload-avatar'
                style={{ width: '30px', height: '30px', right: '0px', bottom: '15px' }}>
                <AiFillCamera className='p-1 fs-3' />
              </label>
              <input
                id='upload-avatar'
                type='file'
                className='d-none'
                onChange={handleUploadAvatar}
              />
            </div>

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
                  placeholder="Max 10 characters"
                  maxLength={10}
                  className="w-100"
                  type="text"
                  value={nicknameInputVal}
                  onChange={handleChangeNickname}
                />
              )}
              {currentUser === null ||
              currentUser.username !== username ? null : (
                <div
                  className="btn btn-sm btn-primary"
                  onClick={handleEditProfile}
                >
                  {editProfileBtn ? "Edit" : "Save"}
                </div>
              )}
            </div>
            <table className="table table-sm table-borderless align-top">
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
