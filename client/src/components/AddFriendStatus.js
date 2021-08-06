import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../context/userContext';

const AddFriendStatus = ({ nickname }) => {
  const { currentUser, socketRef, handleUpdateCurrentUser } = useContext(UserContext)
  console.log("sender", currentUser.username);
  const params = useParams();

  const [addFriendBtn, setAddFriendBtn] = useState('Add friend');

  const handleAddFriend = () => {
    if (socketRef && currentUser) {
      fetch("http://localhost:5000/user/sendFriendRequest", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: currentUser.username,
          receiver: params.username
        })
      }).then(() => { alert("Request sent!") })
        .then(() => {
          setAddFriendBtn('Waiting for response');
          socketRef.emit("sendFriendRequest", { senderUsername: currentUser.username, receiverUsername: params.username })
        })
    } else {
      alert("Please wait a moment!");
    }
  }

  return (
    <div
      id='add-friend-status'
      className='border rounded p-2'
      style={{
        background: "rgba(244, 241, 234,0.3)",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
    >
      <h5>Do you know {nickname}?</h5>
      <p>You can send {nickname} a friend request.</p>
      <div
        className={addFriendBtn === 'Add friend' ? 'btn btn-primary' : 'btn btn-secondary disabled'}
        onClick={handleAddFriend}>{addFriendBtn}</div>
    </div>
  )
}

export default AddFriendStatus
