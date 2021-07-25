const User = require("../models/User");
// const ObjectId = require("mongoose").Types.ObjectId;

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

module.exports = { getUserByUsername, editUserProfile };
