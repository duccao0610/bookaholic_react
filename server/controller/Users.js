const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

const getRecapInfoById = async (req, res) => {
  const user = await User.find(
    { _id: ObjectId(req.params.id) },
    "nickname username userRate friends avatar owning votedUsersList pendingFriendRequests"
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

// Get user's shelves
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

// Get all books from a shelf
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

// Edit user's profile (nickname, bio, address)
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

// Upload avatar
const uploadAvatar = async (req, res) => {
  await User.updateOne(
    { username: req.params.username },
    {
      $set: { avatar: req.body.base64ImgSrc },
    }
  );
  console.log(req.body.base64ImgSrc);
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

// Vote an user
const voteUser = async (req, res) => {
  const {
    votedUser,
    currentUser,
    upvoteCount,
    downvoteCount,
    prevVoteStatus,
    voteStatus,
  } = req.body;
  try {
    // Update userRate field of the rated user
    await User.updateOne(
      { username: votedUser },
      {
        $set: {
          userRate: {
            upvote: upvoteCount,
            downvote: downvoteCount,
          },
        },
      }
    );

    // Update votedUsersList field of the currentUser
    const getCurrentUser = await User.findOne(
      { username: currentUser },
      { votedUsersList: 1, _id: 0 }
    );
    let isUpvote = null;
    if (voteStatus === "upvote") isUpvote = true;
    if (voteStatus === "downvote") isUpvote = false;

    if (prevVoteStatus !== null) {
      const itemIndexToUpdate = getCurrentUser.votedUsersList.findIndex(
        (item) => item.username === votedUser
      );
      console.log("item index: " + itemIndexToUpdate);
      if (itemIndexToUpdate === -1) {
        await User.updateOne(
          { username: currentUser },
          {
            $push: {
              votedUsersList: { username: votedUser, isUpvote: isUpvote },
            },
          }
        );
      } else if (itemIndexToUpdate > -1) {
        if (isUpvote === null) {
          await User.updateOne(
            { username: currentUser },
            {
              $pull: { votedUsersList: { username: votedUser } },
            }
          );
        } else {
          await User.updateOne(
            { username: currentUser },
            {
              $set: {
                [`votedUsersList.${itemIndexToUpdate}.isUpvote`]: isUpvote,
              },
            }
          );
        }
      }
    }

    res.json({ msg: "UPDATE_VOTE_SUCCESS" });

    console.log(getCurrentUser);
  } catch (err) {
    throw new Error(err);
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
      "nickname bio username avatar"
    ).limit(10);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: {
          "userRate.upvote": { $gt: 0 },
        },
      },
      {
        $sort: {
          "userRate.upvote": -1,
        },
      },
      {
        $project: {
          username: 1,
          nickname: 1,
          userRate: 1,
          avatar: 1,
        },
      },
      {
        $limit: Number(req.params.top),
      },
    ]);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    await User.updateMany(
      {
        username: { $in: [req.body.sender, req.body.receiver] }
      },
      {
        $push: {
          pendingFriendRequests: req.body
        }
      }
    );
    res.json({ request: req.body });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getTopUsers,
  getUsersBySearch,
  getRecapInfoById,
  checkUserExistByUsername,
  getUserByUsername,
  editUserProfile,
  uploadAvatar,
  findUserByUsername,
  getUserShelves,
  getBooksOnShelf,
  addShelf,
  deleteShelf,
  deleteBookOnShelf,
  editShelfName,
  voteUser,
};
