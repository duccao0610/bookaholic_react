const User = require("../models/User.js");
const express = require("express");
const {
  getUserByUsername,
  editUserProfile,
  uploadAvatar,
  getUserShelves,
  getBooksOnShelf,
  addShelf,
  deleteShelf,
  deleteBookOnShelf,
  editShelfName,
  getRecapInfoById,
  getUsersBySearch,
  getTopUsers,
  voteUser,
} = require("../controller/Users.js");

const router = express.Router();
router.get("/id/:id", getRecapInfoById);
router.get("/:username", getUserByUsername);
router.get("/search/:searchValue", getUsersBySearch);
router.get("/ranking/:top", getTopUsers);

router.get("/:username/shelves", getUserShelves);
router.get("/:username/shelves/:shelfId", getBooksOnShelf);
router.put("/:username/shelves/addShelf", addShelf);
router.put("/:username/shelves/:shelfId/deleteShelf", deleteShelf);
router.put(
  "/:username/shelves/:shelfId/deleteBook/book=:bookId",
  deleteBookOnShelf
);
router.put("/:username/shelves/:shelfId/editShelfName", editShelfName);

router.put("/:username/editProfile", editUserProfile);
router.put("/:username/uploadAvatar", uploadAvatar);
router.put("/voteUser", voteUser);

module.exports = router;
