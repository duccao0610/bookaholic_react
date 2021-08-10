const AddFriendStatus = ({ nickname, friendStatus, onSendFriendReq }) => {
  const handleSendFriendReq = () => {
    onSendFriendReq();
  };

  return (
    <div
      id='add-friend-status'
      className='border rounded p-2'
      style={{
        background: "rgba(244, 241, 234,0.3)",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}>
      {friendStatus === "noAction" ? (
        <>
          <h5>Do you know {nickname}?</h5>
          <p>You can send {nickname} a friend request.</p>
          <div className='btn btn-primary' onClick={handleSendFriendReq}>
            Add friend
          </div>
        </>
      ) : friendStatus === "reqSent" ? (
        <>
          <h5>You sent a friend request</h5>
          <p>Waiting for {nickname}'s response</p>
          <div className='btn btn-secondary disabled'>Request sent</div>
        </>
      ) : friendStatus === "reqReceived" ? (
        <>
          <h5>Pending</h5>
          <p>{nickname} sent you a friend request</p>
          <div className='btn-group'>
            <div className='btn btn-primary'>Accept</div>
            <div className='btn btn-secondary'>Decline</div>
          </div>
        </>
      ) : (
        <h5>You are now friends</h5>
      )}
    </div>
  );
};

export default AddFriendStatus;
