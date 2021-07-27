const User = require("../models/User.js");
const express = require("express");
const {
  getUserByUsername,
  editUserProfile,
} = require("../controller/Users.js");
const router = express.Router();

router.get("/:username", getUserByUsername);
router.put("/:username/editProfile", editUserProfile);

module.exports = router;
