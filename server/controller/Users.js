const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

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

// Find user for loading page
const getUserByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.json(user);
  } else {
    throw new Error("CANNOT_FIND_USER");
  }
};

const getUserShelves = async (req, res) => {
  const userShelves = await User.aggregate([
    {
      $match: {
        username: req.params.username,
      },
    },
    {
      $project: {
        shelves: true,
      },
    },
  ]);

  if (userShelves) {
    res.json(userShelves);
  } else {
    throw new Error("CANNOT_FIND_SHELVES");
  }
};

const getUserBooksOnShelf = async (req, res) => {
  const userBooksOnShelf = await User.aggregate([
    {
      $match: {
        username: req.params.username,
      },
    },
    {
      $project: {
        shelves: true,
      },
    },
    {
      $unwind: {
        path: "$shelves",
      },
    },
    {
      $match: {
        "shelves._id": new ObjectId(req.params.shelfId),
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "shelves.bookList",
        foreignField: "_id",
        as: "bookDetailList",
      },
    },
    {
      $project: {
        bookDetailList: true,
      },
    },
  ]);

  if (userBooksOnShelf) {
    res.json(userBooksOnShelf);
  } else {
    throw new Error("CANNOT_FIND_BOOKS_ON_SHELF");
  }
};

const editUserProfile = async (req, res) => {
  const data = req.body;
  try {
    await User.updateOne(
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
    res.json({ msg: "EDIT_SUCCESS" });
  } catch (err) {
    console.log(err);
  }
};

const addShelf = async (req, res) => {
  try {
    const newShelf = await User.updateOne(
      { username: req.params.username },
      {
        $addToSet: {
          shelves: req.body,
        },
      }
    );
    res.json({ msg: "ADD_SHELF_SUCCESS", newShelf: newShelf });
  } catch (err) {
    console.log(err);
  }
};

const deleteShelf = async (req, res) => {
  try {
    await User.updateOne(
      { username: req.params.username },
      {
        $pull: { shelves: { _id: new ObjectId(req.params.shelfId) } },
      }
    );
    res.json({ msg: "DELETE_SUCCESS" });
  } catch (err) {
    res.json({ msg: err });
  }
};

module.exports = {
  getUserByUsername,
  editUserProfile,
  findUserByUsername,
  getUserShelves,
  getUserBooksOnShelf,
  addShelf,
  deleteShelf,
};
