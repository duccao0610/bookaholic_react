const User = require("../models/User.js");
const express = require("express");
const {
  getUserByUsername,
  editUserProfile,
  getUserShelves,
  getUserBooksOnShelf,
  addShelf,
  deleteShelf,
} = require("../controller/Users.js");

const router = express.Router();

router.get("/:username", getUserByUsername);

router.get("/:username/shelves", getUserShelves);
router.get("/:username/shelves/:shelfId", getUserBooksOnShelf);
router.put("/:username/shelves/addShelf", addShelf);
router.put("/:username/shelves/:shelfId/deleteShelf", deleteShelf);

router.put("/:username/editProfile", editUserProfile);

module.exports = router;
