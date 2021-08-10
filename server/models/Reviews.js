const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: String,
  rating: Number,
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  date: Date,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
