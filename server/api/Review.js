const express = require("express");
const reviewServices = require("../services/review");
const router = express.Router();
const {
  getReviewByBookId,
  getRatingsByBookId,
  getReviewsByUsername,
  editReview,
  deleteReview,
  checkReviewed,
  loadMoreReviewsById,
} = require("../controller/Reviews");

router.post("/addReview", async (req, res) => {
  const message = reviewServices.addReview(
    req.body.content,
    req.body.rating,
    req.body.userId,
    req.body.bookId,
    req.body.username
  );
  res.json(message);
});

router.post("/calculateAverage", async (req, res) => {
  const message = reviewServices.calculateAverage(req.body.bookId);
  res.json(message);
});

router.get("/bookId/:id", getReviewByBookId);
router.get("/bookId/:id/skip/:skip", loadMoreReviewsById);
router.get("/:username", getReviewsByUsername);
router.get("/ratings/:id", getRatingsByBookId);
router.put("/:reviewId/editReview", editReview);
router.delete("/:reviewId/deleteReview", deleteReview);
router.get("/isReviewed/:username/:bookId", checkReviewed);
module.exports = router;
