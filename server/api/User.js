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
  getNicknameById,
  addReview,
} = require("../controller/Users.js");

const router = express.Router();
router.get("/id/:id", getNicknameById);
router.get("/:username", getUserByUsername);
router.post("/addReview", addReview);

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
router.put("/:username/uploadAvatar", uploadAvatar)

module.exports = router;
