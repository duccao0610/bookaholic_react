const express = require("express");
const reviewServices = require("../services/review");
const router = express.Router();
const {
  getReviewByBookId,
  getRatingsByBookId,
} = require("../controller/Reviews");

router.post("/addReview", async (req, res) => {
  const message = reviewServices.addReview(
    req.body.content,
    req.body.rating,
    req.body.userId,
    req.body.bookId
  );
  res.json(message);
});

router.post("/calculateAverage", async (req, res) => {
  const message = reviewServices.calculateAverage(req.body.bookId);
  res.json(message);
});

router.get("/bookId/:id", getReviewByBookId);
router.get("/ratings/:id", getRatingsByBookId);
module.exports = router;
