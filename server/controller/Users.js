const User = require("../models/User");
// const ObjectId = require("mongoose").Types.ObjectId;
//check user existed or not
const checkUserExistByUsername = async (username) => {
  const users = await User.find({
    username: username,
  });
  if (users.length >= 1) {
    return true;
  } else {
    return false;
  }
};
//find user for login-service
const findUserByUsername = async (username) => {
  const user = await User.findOne({
    username: username,
  }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const getUserByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.json(user);
  } else {
    throw new Error("CANNOT_FIND_USER");
  }
};

const editUserProfile = async (req, res) => {
  const data = req.body;
  const user = await User.updateOne(
    {
      username: req.params.username,
    },
    {
      $set: {
        nickname: data.nickname,
        bio: data.bio,
      },
    }
  );

  res.json(user);
};

module.exports = {
  checkUserExistByUsername,
  getUserByUsername,
  editUserProfile,
  findUserByUsername,
};
