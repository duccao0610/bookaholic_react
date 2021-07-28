const User = require("../models/User");
const { findUserByUsername } = require("../controller/Users");

//LOGIN
const login = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user.verifyPassword(password)) {
    throw new Error("USERNAME/PASSWORD NOT MATCH");
  }
  const token = user.generateToken();
  return {
    allowAccess: true,
    token: token,
  };
};

//REGISTER
const register = (username, password) => {
  // create new User instance
  const user = new User({
    username: username,
    password: password,
    salt: "",
    nickname: "",
    bio: "",
    address: {},
    isAdmin: false,
  });

  const private = user.generatePassword();
  //update password & salt
  user.password = private.hashedPassword;
  user.salt = private.salt;
  // save to DB
  user.save();
};

module.exports = { login, register };
