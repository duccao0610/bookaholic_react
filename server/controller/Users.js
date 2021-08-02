const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

const getNicknameById = async (req, res) => {
  const user = await User.find(
    { _id: ObjectId(req.params.id) },
    "nickname username"
  );
  if (user) {
    res.json({ user: user, message: true });
  } else {
    res.json({ message: false });
  }
};

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
    return null;
    // throw new Error("User not found");
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

const getBooksOnShelf = async (req, res) => {
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

const deleteBookOnShelf = async (req, res) => {
  const shelves = await User.aggregate([
    {
      $match: { username: req.params.username },
    },
    {
      $project: { shelves: true },
    },
    {
      $unwind: { path: "$shelves" },
    },
  ]);

  const shelfIndex = shelves.findIndex((shelf) => {
    return shelf.shelves._id == req.params.shelfId;
  });

  const pullPath = "shelves." + shelfIndex + ".bookList";

  try {
    await User.updateOne(
      { username: req.params.username },
      {
        $pull: {
          [pullPath]: new ObjectId(req.params.bookId),
        },
      }
    );
    res.json({ msg: "BOOK_ON_SHELF_DELETED" });
  } catch (err) {
    console.log(err);
  }
};

const editShelfName = async (req, _) => {
  try {
    await User.updateOne(
      { username: req.params.username },
      {
        $set: { "shelves.$[item].shelfName": req.body.newShelfName },
      },
      { arrayFilters: [{ "item._id": { $eq: req.params.shelfId } }] }
    );
  } catch (err) {
    console.log(err);
  }
};

const addReview = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.body.userId },
      {
        $push: {
          reviews: {
            rating: req.body.rating,
            content: req.body.content,
            book: req.body.bookId,
            date: new Date(),
          },
        },
      }
    );
    res.json({ message: "ADD_REVIEW_SUCCESS" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getUsersBySearch = async (req, res) => {
  try {
    const regPattern = new RegExp(`${req.params.searchValue}`, "i");
    const users = await User.find(
      {
        nickname: {
          $regex: regPattern,
        },
      },
      "nickname bio username"
    ).limit(10);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUsersBySearch,
  getNicknameById,
  checkUserExistByUsername,
  getUserByUsername,
  editUserProfile,
  findUserByUsername,
  getUserShelves,
  getBooksOnShelf,
  addShelf,
  deleteShelf,
  deleteBookOnShelf,
  editShelfName,
  addReview,
};
