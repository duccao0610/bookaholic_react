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
  sendFriendReq,
  getFeedsById,
  toggleOwning,
  addBookToShelves,
} = require("../controller/Users.js");

const authentication = require("../middlewares/authentication");

const router = express.Router();
router.get("/id/:id", getRecapInfoById);
router.get("/:username", getUserByUsername);
router.get("/search/:searchValue", getUsersBySearch);
router.get("/ranking/:top", getTopUsers);
router.get("/feeds/:id/skip/:skip", authentication, getFeedsById);

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
router.put("/sendFriendReq", sendFriendReq);
router.put("/:userId/owning/:bookId/:isAdd", toggleOwning);
router.put("/:username/addBookToShelves", addBookToShelves);

module.exports = router;
