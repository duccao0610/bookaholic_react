import { Link } from "react-router-dom";

const FriendRequest = ({ senderId, onAcceptFriendReq, senderUsername }) => {
  const handleAcceptFriendReq = () => {
    onAcceptFriendReq(senderId, senderUsername);
  };

  return (
    <div className='container border-bottom py-2'>
      <div>
        <Link to={`/user/${senderUsername}`} className='fw-bold'>
          {senderUsername}
        </Link>
        <span>sent you a friend request</span>
      </div>
      <div className='btn-group'>
        <div className='btn btn-sm btn-primary' onClick={handleAcceptFriendReq}>
          Accept
        </div>
        <div className='btn btn-sm btn-secondary'>Decline</div>
      </div>
    </div>
  );
};

export default FriendRequest;
