const Review = require("../models/Reviews");
const { getRatingsToCalculate } = require("../controller/Reviews");
const { updateAverageRatingById } = require("../controller/Books");
const addReview = async (content, rating, userId, bookId, username) => {
  const review = new Review({
    content: content,
    rating: rating,
    userId: userId,
    bookId: bookId,
    username: username,
    date: new Date(),
  });
  review.save();
  return {
    message: true,
  };
};

const calculateAverage = async (bookId) => {
  const ratings = await getRatingsToCalculate(bookId);
  const total = ratings.reduce((total, num) => {
    return total + num.count;
  }, 0);
  const sum = ratings.reduce((total, num) => {
    return total + num.count * num._id;
  }, 0);
  const average = (sum / total).toFixed(1);

  await updateAverageRatingById(bookId, average);

  return {
    message: true,
  };
};

module.exports = { addReview, calculateAverage };
