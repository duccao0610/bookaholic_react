const Review = require("../models/Reviews");
const ObjectId = require("mongoose").Types.ObjectId;

const getReviewByBookId = async (req, res) => {
  const reviews = await Review.aggregate([
    {
      $match: {
        bookId: ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $project: {
        date: 1,
        rating: 1,
        content: 1,
        "userInfo.nickname": 1,
        "userInfo.avatar": 1,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    // {
    //   $limit: 3,
    // },
  ]);
  if (!reviews) {
    res.json({ message: false });
  }
  res.json(reviews);
};

const getRatingsByBookId = async (req, res) => {
  const ratings = await Review.aggregate([
    {
      $match: {
        bookId: ObjectId(req.params.id),
      },
    },
    {
      $group: {
        _id: "$rating",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  if (!ratings) {
    res.json({ message: false });
  }
  res.json(ratings);
};

const getRatingsToCalculate = async (bookId) => {
  const ratings = await Review.aggregate([
    {
      $match: {
        bookId: ObjectId(bookId),
      },
    },
    {
      $group: {
        _id: "$rating",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  return ratings;
};

module.exports = {
  getReviewByBookId,
  getRatingsByBookId,
  getRatingsToCalculate,
};
