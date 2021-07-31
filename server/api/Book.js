const express = require("express");
const {
  getBooksTrending,
  getBookDetail,
  getBooksBySearch,
} = require("../controller/Books.js");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.get("/", authentication, getBooksTrending);
router.get("/:id", getBookDetail);
router.get("/search/:searchValue", getBooksBySearch);

module.exports = router;
