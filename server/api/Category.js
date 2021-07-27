const express = require("express");
const {
  getBooksByCategory,
  getOtherCategories,
} = require("../controller/Books.js");

const router = express.Router();

router.get("/:category", getBooksByCategory, getOtherCategories);

module.exports = router;
