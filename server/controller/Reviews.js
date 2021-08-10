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
        "userInfo.userRate": 1,
        "userInfo.username": 1,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 3,
    },
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

const getReviewsByUsername = async (req, res) => {
  const reviews = await Review.aggregate([
    {
      $match: {
        username: req.params.username,
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $project: {
        content: 1,
        rating: 1,
        date: 1,
        bookId: 1,
        "book.title": 1,
        "book.cover": 1,
        "book.authors": 1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  if (!reviews) {
    res.json({ message: false });
  }
  res.json(reviews);
};

const editReview = async (req, res) => {
  try {
    await Review.updateOne(
      {
        _id: req.params.reviewId,
      },
      {
        $set: {
          content: req.body.content,
          rating: req.body.rating,
        },
      }
    );
    res.json({ msg: "EDIT_SUCCESS" });
  } catch (err) {
    console.log(err);
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.deleteOne({
      _id: req.params.reviewId,
    });
    res.json({ message: "DELETE SUCCESS" });
  } catch (err) {
    console.log(err);
  }
};

const checkReviewed = async (req, res) => {
  try {
    const isReviewed = await Review.find({
      username: req.params.username,
      bookId: ObjectId(req.params.bookId),
    });
    if (isReviewed.length > 0) {
      res.json({ msg: true });
    } else {
      res.json({ msg: false });
    }
  } catch (err) {
    console.log(err);
  }
};

const loadMoreReviewsById = async (req, res) => {
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
        "userInfo.userRate": 1,
        "userInfo.username": 1,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $skip: Number(req.params.skip),
    },
    {
      $limit: 3,
    },
  ]);
  if (!reviews) {
    res.json({ message: false });
  }
  res.json(reviews);
};

module.exports = {
  getReviewByBookId,
  getRatingsByBookId,
  getRatingsToCalculate,
  getReviewsByUsername,
  editReview,
  deleteReview,
  checkReviewed,
  loadMoreReviewsById,
};
