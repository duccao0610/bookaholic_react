import { useContext, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import UserContext from "../context/userContext";
import FriendRequest from "./FriendRequest";

const FriendRequestsBoard = () => {
  const { currentUser, socketRef, setCurrentUser, handleUpdateCurrentUser } =
    useContext(UserContext);
  const isDataLoaded = Boolean(
    currentUser.pendingFriendRequests && currentUser
  );
  const [showBoard, setShowBoard] = useState(false);

  const handleShowFriendRequestsBoard = () => {
    setShowBoard(!showBoard);
  };

  let friendRequestsCount = 0;
  if (isDataLoaded) {
    friendRequestsCount = currentUser.pendingFriendRequests.reduce(
      (acc, curr) => {
        if (curr.receiverUsername === currentUser.username) {
          return acc + 1;
        } else return acc;
      },
      0
    );
  }

  const handleAcceptFriendReq = (senderId, senderUsername) => {
    const update = { ...currentUser };
    const index = update.pendingFriendRequests.findIndex(
      (item) => item.senderUsername === senderUsername
    );

    socketRef.emit(
      "acceptFriendReq",
      senderId,
      currentUser._id,
      update.pendingFriendRequests[index]._id
    );

    update.pendingFriendRequests.splice(index, 1);
    setCurrentUser(update);
  };

  return (
    <div>
      <div
        className='position-relative fs-3 d-inline-flex pointer rounded'
        style={
          showBoard
            ? { backgroundColor: "lightGrey" }
            : { backgroundColor: "inherit" }
        }
        onClick={handleShowFriendRequestsBoard}
      >
        <AiOutlineUsergroupAdd />
        <div
          className='p-1 position-absolute rounded-pill bg-danger d-flex align-items-center justify-content-center'
          style={{
            width: "auto",
            height: "1.2rem",
            left: "60%",
            bottom: "50%",
          }}
        >
          {isDataLoaded ? (
            <span className='text-white' style={{ fontSize: ".8rem" }}>
              {friendRequestsCount}
            </span>
          ) : null}
        </div>
      </div>

      {isDataLoaded ? (
        <div
          className={
            showBoard
              ? "position-absolute start-0 border rounded mt-2 bg-white"
              : "d-none"
          }
        >
          {friendRequestsCount === 0 ? (
            <div className='fst-italic p-3 text-black-50'>
              No pending friend request
            </div>
          ) : (
            currentUser.pendingFriendRequests.map((item, index) => {
              if (item.receiverUsername === currentUser.username) {
                return (
                  <FriendRequest
                    key={index}
                    senderUsername={item.senderUsername}
                    senderId={item.senderId}
                    onAcceptFriendReq={handleAcceptFriendReq}
                  />
                );
              } else return null;
            })
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FriendRequestsBoard;
