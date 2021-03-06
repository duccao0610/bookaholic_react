const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//Create mongoose Schema
const userSchema = mongoose.Schema({
  isAdmin: Boolean,
  username: String,
  password: String,
  nickname: { type: String, maxLength: 10 },
  bio: String,
  address: { city: String, district: String },
  avatar: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shelves: [
    {
      shelfName: String,
      bookList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    },
  ],
  userRate: { downvote: Number, upvote: Number },
  votedUsersList: [{ username: String, isUpvote: Boolean }],
  owning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  salt: String,
  pendingFriendRequests: [
    { senderUsername: String, receiverUsername: String, senderId: String },
  ],
  onlineStatus: { isOnline: Boolean, socketId: String },
});

//Create class with custom methods
class UserClass {
  generateToken() {
    const token = jwt.sign(
      {
        id: this._id,
        username: this.username,
        nickname: this.nickname,
      },
      "MY_PRIVATE_KEY",
      {
        expiresIn: 3600,
      }
    );
    return token;
  }

  generatePassword() {
    const salt = crypto.randomBytes(128).toString("base64");
    const hashedPassword = crypto.pbkdf2Sync(
      this.password,
      salt,
      10000,
      256,
      "sha512"
    );
    return {
      salt: salt,
      hashedPassword: hashedPassword.toString("hex"),
    };
  }

  verifyPassword(rawPassword) {
    const hashedPassword = crypto.pbkdf2Sync(
      rawPassword,
      this.salt,
      10000,
      256,
      "sha512"
    );
    return hashedPassword.toString("hex") === this.password;
  }
}

//load class to schema
userSchema.loadClass(UserClass);

const User = mongoose.model("User", userSchema);

module.exports = User;
