import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import Alert from "./Alert";
const AddFriendStatus = ({ nickname, friendStatus, onSendFriendReq }) => {
  const { currentUser } = useContext(UserContext);
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
  const handleSendFriendReq = () => {
    if (currentUser === null) {
      showAlert("friend", "fail");
    } else {
      onSendFriendReq();
    }
  };

  return (
    <div
      id='add-friend-status'
      className='border rounded p-2'
      style={{
        background: "rgba(244, 241, 234,0.3)",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <Alert
        alertClose={alertClose}
        alertVisibility={alertVisibility}
        alertType={alertType}
        alertStatus={alertStatus}
        alertDetail={alertDetail}
      />
      {friendStatus === "noAction" ? (
        <>
          <h5>Do you know {nickname}?</h5>
          <p>You can send {nickname} a friend request.</p>
          <div
            className='btn'
            onClick={handleSendFriendReq}
            style={{ background: "#5A3434", color: "white" }}
          >
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
          <div className=''>
            {/* <div className="btn btn-primary">Accept</div>
            <div className="btn btn-secondary">Decline</div> */}
            You can either accept or decline in the "Friends requests" button
            above
          </div>
        </>
      ) : (
        <h5>You are now friends</h5>
      )}
    </div>
  );
};

export default AddFriendStatus;
