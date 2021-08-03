const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  findUserByUsername,
  checkUserExistByUsername,
} = require("../controller/Users");

//LOGIN
const login = async (username, password) => {
  const user = await findUserByUsername(username);
  if (user === null) {
    return { message: false };
  }
  if (!user.verifyPassword(password)) {
    return { message: false };
    // throw new Error("USERNAME/PASSWORD NOT MATCH");
  }
  const token = user.generateToken();
  const data = jwt.verify(token, "MY_PRIVATE_KEY");

  return {
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      userRate: user.userRate,
      friends: user.friends.length,
    },
    token: token,
    expireTime: data.exp,
  };
};

//REGISTER
const register = async (username, password, nickname) => {
  const existed = await checkUserExistByUsername(username);
  if (!existed) {
    // create new User instance
    const user = new User({
      username: username,
      password: password,
      salt: "",
      nickname: nickname,
      bio: "",
      address: {},
      avatar: "",
      isAdmin: false,
      userRate: {
        upvote: 0,
        downvote: 0,
      },
    });

    const private = user.generatePassword();
    //update password & salt
    user.password = private.hashedPassword;
    user.salt = private.salt;
    // save to DB
    user.save();
    return {
      message: true,
    };
  } else {
    return {
      message: false,
    };
  }
};

module.exports = { login, register };
