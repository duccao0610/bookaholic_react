const express = require("express");
const { getBookByCategory } = require("../controller/Books.js");

const router = express.Router();

router.get("/:category", getBookByCategory);

module.exports = router;
