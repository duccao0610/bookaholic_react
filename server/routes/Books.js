const express = require("express");
const {
  getBooksTrending,
  getBookDetail,
  getBooksBySearch,
} = require("../controller/Books.js");

const router = express.Router();

router.get("/", getBooksTrending);
router.get("/:id", getBookDetail);
router.get("/search/:searchValue", getBooksBySearch);

module.exports = router;
