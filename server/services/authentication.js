const User = require("../models/User");
const {
  findUserByUsername,
  checkUserExistByUsername,
} = require("../controller/Users");

//LOGIN
const login = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user.verifyPassword(password)) {
    return { message: false };
    // throw new Error("USERNAME/PASSWORD NOT MATCH");
  }
  const token = user.generateToken();
  return {
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
    },
    token: token,
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
