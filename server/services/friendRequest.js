const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

const updatePendingFriendReq = async (
  senderUsername,
  receiverUsername,
  senderId
) => {
  await User.updateMany(
    {
      username: { $in: [senderUsername, receiverUsername] },
    },
    {
      $push: {
        pendingFriendRequests: {
          senderUsername: senderUsername,
          receiverUsername: receiverUsername,
          senderId: senderId,
        },
      },
    }
  );
};

const acceptFriendReq = async (senderId, receiverId, requestId) => {
  await User.updateOne(
    { _id: senderId },
    {
      $push: {
        friends: new ObjectId(receiverId),
      },
      $pull: {
        pendingFriendRequests: { _id: requestId },
      },
    }
  );
  await User.updateOne(
    { _id: receiverId },
    {
      $push: {
        friends: new ObjectId(senderId),
      },
      $pull: {
        pendingFriendRequests: { _id: requestId },
      },
    }
  );
};

const declineFriendReq = async (senderUsername, receiverUsername) => {
  await User.updateMany(
    { username: { $in: [senderUsername, receiverUsername] } },
    {
      $pull: {
        pendingFriendRequests: {
          senderUsername: senderUsername,
          receiverUsername: receiverUsername,
        },
      },
    }
  );
};

module.exports = { updatePendingFriendReq, acceptFriendReq, declineFriendReq };
