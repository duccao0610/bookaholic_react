const express = require("express");
const {
  getBooksByCategory,
  getOtherCategories,
  getMoreBooksByCategory,
} = require("../controller/Books.js");

const router = express.Router();

router.get("/:category", getBooksByCategory, getOtherCategories);
router.get("/:category/skip/:skip", getMoreBooksByCategory);
module.exports = router;
