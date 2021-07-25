const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  isAdmin: Boolean,
  username: String,
  password: String,
  nickname: String,
  bio: String,
  address: { city: String, district: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shelves: [
    {
      shelfName: String,
      bookList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    },
  ],
  userRate: { downvote: Number, upvote: Number },
  owning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  reviews: [
    {
      content: String,
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
