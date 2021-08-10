const User = require("../models/User");

const getReceiverSocketId = async (receiverUsername) => {
  const isReceiverOnline = await User.findOne({
    $and: [{ username: receiverUsername }, { "onlineStatus.isOnline": true }],
  });
  if (isReceiverOnline) {
    return isReceiverOnline.onlineStatus.socketId;
  }
};

const setOnline = async (username, socketId) => {
  await User.updateOne(
    { username: username },
    {
      $set: { onlineStatus: { isOnline: true, socketId: socketId } },
    }
  );
};

const setOffline = async (username) => {
  await User.updateOne(
    { username: username },
    {
      $set: { "onlineStatus.isOnline": false },
    }
  );
};

module.exports = { getReceiverSocketId, setOnline, setOffline };
